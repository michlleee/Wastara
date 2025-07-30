import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {upload} from "../config/cloudinary.js"

const saltRounds = 10;
const router = express.Router();

//handle user signup
router.post("/users", async (req, res) =>{
    const {name, email, password, role} = req.body;
    try {
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: "User exists already"});
        }
        //user doesnt exist
        //hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({name, email, password: hashedPassword, authType: "local",role});
        await newUser.save();
        console.log(newUser);
        res.status(200).json({message: "User created"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

//handle organizer signup
router.post("/organizer", upload.single("ktpImage") ,async (req, res)=>{
    const {name, email, password, role} = req.body;
    try {
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: "User exists already"});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({name, email, password: hashedPassword, authType: "local", role, nationalId: req.file?.path, isApproved: false, pickupCount: 0});
        await newUser.save();
        console.log(newUser);
        res.status(200).json({message: "Organizer created"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
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
    };
    await User.findByIdAndUpdate(req.params.id, updates);
    res.status(200).json({ message: "Profile completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});


//handle user&organizer login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

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

    // Return basic info
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//testing --> get all users
router.post("/", async (req, res) =>{
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        res.status(404).json({message: "Server error"});
    }
});

export default router;