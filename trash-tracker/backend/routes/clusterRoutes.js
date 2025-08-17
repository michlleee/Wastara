// routes/clusterRoutes.js
import express from "express";
import Report from "../models/Report.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import haversine from "haversine-distance";
import Cluster from "../models/Cluster.js";

const MAX_DISTANCE_METERS = 500;

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PY_DIR = path.join(__dirname, "..", "python");
const SCRIPT = path.join(PY_DIR, "report_cluster.py");
const PYTHON_BIN = process.env.PYTHON_BIN || "python3";

const HARD_MAX_KM = 10;

function runRank(inputPayload) {
  return new Promise((resolve, reject) => {
    const py = spawn(PYTHON_BIN, [SCRIPT], { cwd: PY_DIR });
    let out = "";
    let err = "";
    py.stdout.on("data", (d) => (out += d.toString()));
    py.stderr.on("data", (d) => (err += d.toString()));
    py.on("close", (code) => {
      if (code !== 0) return reject(new Error(err || `Python exit ${code}`));
      try {
        resolve(JSON.parse(out));
      } catch {
        reject(new Error("Invalid JSON from Python"));
      }
    });
    py.stdin.write(JSON.stringify(inputPayload));
    py.stdin.end();
  });
}

function isValidCoordinate(coord) {
  return coord !== null && coord !== undefined && Number.isFinite(coord);
}

function filterValidReports(reports) {
  return reports.filter((report) => {
    if (
      !report.location ||
      !report.location.coordinates ||
      !Array.isArray(report.location.coordinates)
    ) {
      console.warn(`Report ${report._id} missing location data`);
      return false;
    }

    const [lng, lat] = report.location.coordinates;
    if (!isValidCoordinate(lat) || !isValidCoordinate(lng)) {
      console.warn(
        `Report ${report._id} has invalid coordinates: lat=${lat}, lng=${lng}`
      );
      return false;
    }

    return true;
  });
}

router.post(
  "/find",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "Not authenticated" });
  },
  async (req, res) => {
    try {
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

      const { lat, lng, radiusKm, k } = req.body;

      // Enhanced validation
      if (!isValidCoordinate(lat) || !isValidCoordinate(lng)) {
        return res
          .status(400)
          .json({ error: "lat and lng are required valid numbers" });
      }

      if (!isValidCoordinate(radiusKm) || !isValidCoordinate(k)) {
        return res
          .status(400)
          .json({ error: "radiusKm and k must be valid numbers" });
      }

      const topK = clamp(Number(k), 1, 50);
      const workingRadiusKm = clamp(Number(radiusKm), 1, 20);

      const organizerId = req.user._id;
      const currentLoc = { latitude: lat, longitude: lng };

      //Check unfinished reports for this organizer
      const unfinishedReports = await Report.find({
        assignedOrganizerId: organizerId,
        status: "in-progress",
      }).lean();

      // Filter out reports with invalid coordinates
      const validUnfinishedReports = filterValidReports(unfinishedReports);

      if (validUnfinishedReports.length > 0) {
        const anyLoc = validUnfinishedReports[0].location.coordinates;
        const lastLoc = { latitude: anyLoc[1], longitude: anyLoc[0] };
        const distance = haversine(currentLoc, lastLoc);

        const remainingSlots = Math.max(
          0,
          topK - validUnfinishedReports.length
        );
        if (distance <= MAX_DISTANCE_METERS) {
          let selectedReports = [...validUnfinishedReports];
          //Still nearby → merge unfinished with any new unassigned in the area

          if (remainingSlots > 0) {
            const nearbyNewReports = await Report.find({
              assignedOrganizerId: { $exists: false },
              status: "pending",
              location: {
                $geoWithin: {
                  $centerSphere: [[lng, lat], workingRadiusKm / 6378.1],
                },
              },
            }).lean();
            const validNearbyNewReports = filterValidReports(nearbyNewReports);
            selectedReports = [
              ...validUnfinishedReports,
              ...validNearbyNewReports,
            ];
          }

          if (selectedReports.length > 0) {
            // Let AI pick the best cluster from combined
            const payload = {
              organizer: { lat: Number(lat), lng: Number(lng) },
              radius_km: Number(workingRadiusKm),
              top_k: Number(topK),
              reports: selectedReports.map((r) => ({
                _id: r._id.toString(),
                lat: Number(r.location.coordinates[1]),
                lng: Number(r.location.coordinates[0]),
                description: r.placeDescription || "",
                createdAt: r.createdAt ? r.createdAt.toISOString() : null,
              })),
            };

            const result = await runRank(payload);
            console.log(
              "Nearby unfinished + new reports assigned via AI:",
              result
            );
            const idsToAssign = result.selected_reports.map((r) => r._id);
            const gmapsUrl = result.google_maps_url;

            //update for reports that are now excluded/unassigned
            const currentAssignedReports = await Report.find({
              assignedOrganizerId: organizerId,
              status: { $in: ["in-progress"] },
            }).lean();

            const currentAssignedIds = currentAssignedReports.map((r) =>
              r._id.toString()
            );

            const toUnassign = currentAssignedIds.filter(
              (id) => !idsToAssign.includes(id)
            );

            if (toUnassign.length > 0) {
              await Report.updateMany(
                { _id: { $in: toUnassign } },
                {
                  $unset: { assignedOrganizerId: "" },
                  $set: { status: "pending" },
                }
              );
              console.log(`Unassigned ${toUnassign.length} old reports`);
            }

            await Report.updateMany(
              { _id: { $in: idsToAssign } },
              {
                $set: {
                  assignedOrganizerId: organizerId,
                  status: "in-progress",
                },
              }
            );

            await Cluster.updateOne(
              { organizerId, isActive: true },
              {
                $set: { gmapsUrl: gmapsUrl, reportIds: idsToAssign },
              }
            );

            return res.json({
              message: "Nearby unfinished + new reports assigned via AI",
              assigned_count: idsToAssign.length,
              organizerId,
              selected_reports: result.selected_reports,
            });
          }
        } else {
          // Moved far away → unassign old unfinished
          const oldUnfinishedIds = validUnfinishedReports.map((r) => r._id);
          await Report.updateMany(
            {
              _id: { $in: oldUnfinishedIds },
              status: { $in: ["in-progress"] },
            },
            {
              $unset: { assignedOrganizerId: "" },
              $set: { status: "pending" },
            }
          );

          await Cluster.updateOne(
            { organizerId, isActive: true },
            { $pull: { reportIds: { $in: oldUnfinishedIds } } }
          );

          // Find new nearby reports
          const nearbyReports = await Report.find({
            status: "pending",
            assignedOrganizerId: { $exists: false },
            location: {
              $geoWithin: {
                $centerSphere: [[lng, lat], HARD_MAX_KM / 6378.1],
              },
            },
          }).lean();

          const validNearbyReports = filterValidReports(nearbyReports);

          if (validNearbyReports.length) {
            const payload = {
              organizer: { lat: Number(lat), lng: Number(lng) },
              radius_km: Number(workingRadiusKm),
              top_k: Number(topK),
              reports: validNearbyReports.map((r) => ({
                _id: r._id.toString(),
                lat: Number(r.location.coordinates[1]),
                lng: Number(r.location.coordinates[0]),
                description: r.placeDescription || "",
                createdAt: r.createdAt ? r.createdAt.toISOString() : null,
              })),
            };

            const result = await runRank(payload);
            const idsToAssign = result.selected_reports.map((r) => r._id);
            const gmapsUrl = result.google_maps_url;

            await Report.updateMany(
              { _id: { $in: idsToAssign } },
              {
                $set: {
                  assignedOrganizerId: organizerId,
                  status: "in-progress",
                },
              }
            );

            const cluster = await Cluster.findOne({
              organizerId,
              isActive: true,
            });

            if (cluster) {
              await Cluster.updateOne(
                { _id: cluster._id },
                {
                  $push: { reportIds: { $each: idsToAssign } },
                  $set: { gmapsUrl },
                }
              );
            } else {
              await Cluster.create({
                organizerId,
                reportIds: idsToAssign,
                gmapsUrl,
                isActive: true,
              });
            }

            return res.json({
              message: "Organizer moved but got new nearby reports assigned",
              unassigned_count: oldUnfinishedIds.length,
              assigned_count: idsToAssign.length,
              assigned_reports: idsToAssign,
              gmapsUrl,
            });
          }

          return res.json({
            message:
              "Old unfinished reports unassigned due to organizer moving away, no new reports nearby",
            unassigned_count: oldUnfinishedIds.length,
            assigned_count: 0,
            assigned_reports: [],
          });
        }
      }

      const reports = await Report.find({
        status: "pending",
        assignedOrganizerId: { $exists: false },
        location: {
          $geoWithin: {
            $centerSphere: [[lng, lat], HARD_MAX_KM / 6378.1],
          },
        },
      }).lean();

      // Filter out reports with invalid coordinates
      const validReports = filterValidReports(reports);

      if (!validReports.length) {
        return res.json({
          count_in_radius: 0,
          selected_count: 0,
          selected_reports: [],
          google_maps_url: "",
        });
      }

      const payload = {
        organizer: { lat: Number(lat), lng: Number(lng) },
        radius_km: Number(workingRadiusKm),
        top_k: Number(topK),
        reports: validReports.map((r) => ({
          _id: r._id.toString(),
          lat: Number(r.location.coordinates[1]),
          lng: Number(r.location.coordinates[0]),
          description: r.placeDescription || "",
          createdAt: r.createdAt ? r.createdAt.toISOString() : null,
        })),
      };

      // console.log(
      //   "Payload being sent to Python:",
      //   JSON.stringify(payload, null, 2)
      // );

      const rankingResult = await runRank(payload);
      console.log("Ranked result from AI:", rankingResult);

      const idsToAssign = rankingResult.selected_reports.map((r) => r._id);
      const gmapsUrl = rankingResult.google_maps_url;

      await Report.updateMany(
        { _id: { $in: idsToAssign } },
        { $set: { assignedOrganizerId: organizerId, status: "in-progress" } }
      );

      let existingCluster = await Cluster.findOne({
        organizerId,
        isActive: true,
      });

      if (existingCluster) {
        const updatedReportIds = [
          ...new Set([
            ...existingCluster.reportIds,
            ...idsToAssign.map((id) => id.toString()),
          ]),
        ];

        await Cluster.updateOne(
          { _id: existingCluster._id },
          {
            $set: {
              reportIds: updatedReportIds,
              gmapsUrl,
            },
          }
        );

        return res.status(200).json({
          message: "Cluster updated with new reports",
          assigned_count: idsToAssign.length,
          organizerId,
        });
      } else {
        await Cluster.create({
          organizerId,
          reportIds: idsToAssign.map((id) => id.toString()),
          gmapsUrl: gmapsUrl,
          isActive: true,
        });

        return res.status(200).json({
          message: "New cluster assigned via AI",
          assigned_count: idsToAssign.length,
          organizerId,
        });
      }
    } catch (e) {
      console.error("Urgent ranking error:", e);
      return res.status(500).json({ error: e.message });
    }
  }
);

export default router;