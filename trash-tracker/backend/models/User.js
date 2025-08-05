import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  reportCount: Number,
  authType: { type: String, enum: ["local", "google"], required: true },
  role: { type: String, enum: ["user", "organizer"] },

  // Organizer-only fields
  organizationName: String,
  phone: Number,
  nationalId: String,
  isApproved: Boolean,
  pickupCount: Number,
});

const User = mongoose.model("User", userSchema);
export default User;
