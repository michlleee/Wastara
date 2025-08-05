import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { upload } from "../config/cloudinary.js";

const saltRounds = 10;
const router = express.Router();

//handle user signup
router.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User exists already" });
    }
    //user doesnt exist
    //hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      authType: "local",
      role,
    });
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        console.error("Login error after signup:", err);
        return res.status(500).json({ message: "Login after signup failed" });
      }

      res.status(200).json({
        message: "User created and logged in",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          authType: newUser.authType,
        },
      });
    });
    console.log(newUser);
    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//handle organizer signup
router.post("/organizer", upload.single("ktpImage"), async (req, res) => {
  const { name, email, password, role, phone, organizationName } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User exists already" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      authType: "local",
      role,
      nationalId: req.file?.path,
      isApproved: false,
      pickupCount: 0,
      phone: phone,
      organizationName: organizationName,
    });
    await newUser.save();
    req.login(newUser, (err) => {
      if (err) {
        console.error("Login error after organizer signup:", err);
        return res.status(500).json({ message: "Login after signup failed" });
      }

      res.status(200).json({
        message: "Organizer created and logged in",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          authType: newUser.authType,
        },
      });
    });
    console.log(newUser);
    res.status(200).json({ message: "Organizer created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//handle organizer signup via google (second step completion)
router.patch("/organizer/:id", upload.single("ktpImage"), async (req, res) => {
  try {
    const updates = {
      role: "organizer",
      nationalId: req.file?.path,
      isApproved: false,
      pickupCount: 0,
      organizationName: req.body.organizationName,
      phone: req.body.whatsappNumber,
    };
    await User.findByIdAndUpdate(req.params.id, updates);
    res.status(200).json({ message: "Profile completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

//handle user&organizer local login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login route hit");

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if account was created using Google OAuth
    if (user.authType === "google") {
      return res.status(400).json({ message: "Please login using Google" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          authType: user.authType,
        },
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//testing --> get all users
router.post("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(404).json({ message: "Server error" });
  }
});

export default router;
