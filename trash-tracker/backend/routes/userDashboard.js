import express from "express";
import Report from "../models/Report.js";
import { reportUpload } from "../config/cloudinary.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Not authorized" });
}

router.get("/reports", isLoggedIn, async (req, res) => {
  try {
    const result = await Report.find({ userId: req.user._id });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No reports made" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in retrieving reports", error: error.message });
  }
});

router.post(
  "/create",
  isLoggedIn,
  reportUpload.single("trashImage"),
  async (req, res) => {
    const { trashDescription, placeDescription, status, createdAt, updatedAt } =
      req.body;
    const location = JSON.parse(req.body.location);
    const user = req.user;
    try {
      const newReport = new Report({
        userId: user._id,
        trashDescription: trashDescription,
        placeDescription: placeDescription,
        trashImage: req.file?.path,
        status: status,
        location: location,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
      });
      await newReport.save();

      console.log(newReport);
      res.status(201).json({ message: "New report created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/reports/nearby", async (req, res) => {
  try {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const radiusInKm = parseFloat(req.query.radius) || 5;
    const EARTH_RADIUS_KM = 6378.1;
    if (isNaN(lng) || isNaN(lat)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing longitude/latitude" });
    }

    const reports = await Report.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radiusInKm / EARTH_RADIUS_KM],
        },
      },
    });

    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
