import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: { type: String, default: 'user' }
});

const User = mongoose.model("User", userSchema);
export default User;