import express from "express";
import User from "../models/User.js";
const router = express.Router();

//handle user signup
router.post("/signup", async (req, res) =>{
    const {name, email, password, role} = req.body;
    try {
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: "User exists already"});
        }
        //user doesnt exist
        const newUser = User({name, email, password, role});
        await newUser.save();
        console.log(newUser);
        res.status(200).json({message: "User created"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});


//handle user login

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