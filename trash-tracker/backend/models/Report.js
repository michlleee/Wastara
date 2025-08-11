import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trashDescription: {
    type: String,
  },
  placeDescription: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  assignedOrganizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  trashImage: String,
});

reportSchema.index({ location: "2dsphere" });
reportSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
