import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Not authorized" });
}

router.get("/reports", isLoggedIn, async (req, res) => {
  const orgId = req.user._id;

  try {
    const result = await Report.find({ assignedOrganizerId: orgId });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No existing reports assigned" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error in retrieving current assigned reports",
        error: error.message,
      });
  }
});

export default router;
