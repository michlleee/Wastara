import express from "express";
import User from "../models/User.js";
import Report from "../models/Report.js";
import { upload } from "../config/cloudinary.js";

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

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    res.status(200).json({ message: "create new report" });
  } catch (error) {}
});

export default router;
