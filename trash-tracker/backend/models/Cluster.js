import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  gmapsUrl: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

clusterSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Cluster = mongoose.model("Cluster", clusterSchema);
export default Cluster;
