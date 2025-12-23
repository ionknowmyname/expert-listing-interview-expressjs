import mongoose from "mongoose";

const BucketSchema = new mongoose.Schema({
  center: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  normalizedNames: [String],
  radiusMeters: { type: Number, default: 1000 },
});

BucketSchema.index({ center: "2dsphere" });
BucketSchema.index({ normalizedNames: "text" });

const Bucket = mongoose.model("Bucket", BucketSchema);

export default Bucket;
