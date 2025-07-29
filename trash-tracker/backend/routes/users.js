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

        const newUser = new User({name, email, password: hashedPassword, role});
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

        const newUser = new User({name, email, password: hashedPassword, role, nationalId: req.file?.path, isApproved: false, pickupCount: 0});
        await newUser.save();
        console.log(newUser);
        res.status(200).json({message: "Organizer created"});
    } catch (error) {
        console.log(error);
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