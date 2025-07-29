import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    reportCount: Number,
    role: { type: String, default: 'user' },

     // Organizer-only fields
    nationalId: String,
    isApproved: Boolean,
    pickupCount: Number,
});

const User = mongoose.model("User", userSchema);
export default User;