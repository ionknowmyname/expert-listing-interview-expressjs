import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: String,
  locationName: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: [Number],
  },
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  bucketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bucket",
  },
});

PropertySchema.index({ location: "2dsphere" });
PropertySchema.index({ bucketId: 1 });

const Property = mongoose.model("Property", PropertySchema);

export default Property;
