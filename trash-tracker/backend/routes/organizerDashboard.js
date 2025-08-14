import express from "express";
import Report from "../models/Report.js";
import Cluster from "../models/Cluster.js";
import User from "../models/User.js";
import { ensureAuthenticated, authorizeRole } from "../middleware/Auth.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Not authorized" });
}

router.get(
  "/reports",
  isLoggedIn,
  ensureAuthenticated,
  authorizeRole("organizer"),
  async (req, res) => {
    const orgId = req.user._id;

    try {
      const reports = await Report.find({ assignedOrganizerId: orgId });
      const cluster = await Cluster.findOne({ organizerId: orgId });

      res.status(200).json({
        report: reports,
        cluster: cluster
          ? {
              id: cluster._id,
              gmapsUrl: cluster.gmapsUrl,
              reportIds: cluster.reportIds,
            }
          : null,
        message:
          reports.length > 0
            ? "Existing reports retrieved"
            : "No existing reports assigned",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error in retrieving current assigned reports",
        error: error.message,
      });
    }
  }
);

router.post("/cancel", isLoggedIn, async (req, res) => {
  const reportId = req.body.reportId;

  try {
    await Cluster.updateMany(
      { reportIds: reportId },
      { $pull: { reportIds: reportId } }
    );

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      {
        $unset: { assignedOrganizerId: "" },
        $set: { status: "pending" },
      },
      { new: true }
    );

    const cluster = await Cluster.findOne({
      reportIds: { $ne: [] },
      isActive: true,
    });
    if (cluster) {
      const reports = await Report.find({ _id: { $in: cluster.reportIds } });

      const coords = reports
        .map((r) => `${r.location.coordinates[1]},${r.location.coordinates[0]}`)
        .join("/");
      const gmapsUrl = `https://www.google.com/maps/dir/${coords}`;

      cluster.gmapsUrl = gmapsUrl;
      await cluster.save();

      res.json({
        success: true,
        report: updatedReport,
        cluster: {
          id: cluster._id,
          gmapsUrl: cluster.gmapsUrl,
          reportIds: cluster.reportIds,
        },
        message: "Report canceled and maps updated",
      });
    } else {
      res.json({
        success: true,
        report: updatedReport,
        cluster: null,
        message: "Report canceled. No active clusters remaining.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/finish", isLoggedIn, async (req, res) => {
  const orgId = req.user._id;
  const { reportId, userId } = req.body;

  try {
    const cluster = await Cluster.findOne({ organizerId: orgId });
    if (!cluster) {
      return res.status(404).json({ message: "Cluster not found" });
    }

    const report = await Report.findByIdAndDelete(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    cluster.reportIds = Array.isArray(cluster.reportIds)
      ? cluster.reportIds
      : [];

    cluster.reportIds = cluster.reportIds.filter(
      (id) => id.toString() !== reportId
    );

    if (cluster.reportIds.length > 0) {
      const reports = await Report.find({ _id: { $in: cluster.reportIds } });
      const coords = reports
        .map((r) => {
          if (
            r.location &&
            Array.isArray(r.location.coordinates) &&
            r.location.coordinates.length === 2
          ) {
            return `${r.location.coordinates[1]},${r.location.coordinates[0]}`;
          }
          return null;
        })
        .filter(Boolean)
        .join("/");

      cluster.gmapsUrl = coords
        ? `https://www.google.com/maps/dir/${coords}`
        : "";
    } else {
      cluster.gmapsUrl = "";
    }
    await cluster.save();

    await User.findByIdAndUpdate(orgId, { $inc: { pickupCount: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { reportCount: 1 } });

    res.status(200).json({
      message:
        cluster.reportIds.length > 0
          ? "Report finished successfully"
          : "Report finished successfully — all reports completed in this cluster",
      success: true,
      cluster: {
        id: cluster._id,
        gmapsUrl: cluster.gmapsUrl,
        reportIds: cluster.reportIds,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finishing report",
      error: error.message,
      success: false,
    });
  }
});

export default router;
