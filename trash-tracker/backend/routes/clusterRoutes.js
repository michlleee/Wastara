// routes/clusterRoutes.js
import express from "express";
import Report from "../models/Report.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PY_DIR = path.join(__dirname, "..", "python");
const SCRIPT = path.join(PY_DIR, "report_cluster.py");
const PYTHON_BIN =
  process.env.PYTHON_BIN ||
  (process.platform === "win32"
    ? path.join(PY_DIR, ".venv", "Scripts", "python.exe")
    : path.join(PY_DIR, ".venv", "bin", "python"));

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

router.post("/find", async (req, res) => {
  try {
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const { lat, lng } = req.body;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ error: "lat and lng are required numbers" });
    }

    const topK = clamp(Number(req.body.top_k ?? req.body.k ?? 10), 1, 50);
    const workingRadiusKm = clamp(
      Number(req.body.radius_km ?? req.body.radiusKm ?? HARD_MAX_KM),
      2,
      HARD_MAX_KM
    );

    const reports = await Report.find({
      status: { $in: ["pending", "in_progress"] },
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], HARD_MAX_KM / 6378.1],
        },
      },
    }).lean();

    if (!reports.length) {
      return res.json({
        count_in_radius: 0,
        selected_count: 0,
        selected_reports: [],
        google_maps_url: "",
      });
    }

    // Build payload for Python
    const payload = {
      organizer: { lat, lng },
      radius_km: workingRadiusKm, // organizer's chosen working radius (2–10)
      top_k: topK,
      reports: reports.map((r) => ({
        _id: r._id.toString(),
        lat: r.location.coordinates[1],
        lng: r.location.coordinates[0],
        description: r.placeDescription || "",
        createdAt: r.createdAt ? r.createdAt.toISOString() : null,
      })),
    };

    const result = await runRank(payload);
    return res.json(result);
  } catch (e) {
    console.error("Urgent ranking error:", e);
    return res.status(500).json({ error: e.message });
  }
});

export default router;