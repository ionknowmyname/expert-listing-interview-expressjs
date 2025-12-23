
import express from "express";
import Bucket from "../models/bucket.model.js";
import Property from "../models/property.model.js";
import { normalize } from "../utils/index.js";

export class PropertyService {
  async createProperty(requestPayload) {
    const { location_name, lat, lng } = requestPayload;
    const normalized = normalize(location_name);

    let bucket = await Bucket.findOne({
      center: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 1000,
        },
      },
    });

    if (!bucket) {
      bucket = await Bucket.create({
        center: { type: "Point", coordinates: [lng, lat] },
        normalizedNames: [normalized],
      });
    } else if (!bucket.normalizedNames.includes(normalized)) {
      bucket.normalizedNames.push(normalized);
      await bucket.save();
    }

    const property = await Property.create({
      title: requestPayload.title,
      locationName: location_name,
      price: requestPayload.price,
      bedrooms: requestPayload.bedrooms,
      bathrooms: requestPayload.bathrooms,
      location: { type: "Point", coordinates: [lng, lat] },
      bucketId: bucket._id,
    });

    return property;
  }

  async searchProperties(requestQuery) {
    const normalized = normalize(requestQuery.location);

    const buckets = await Bucket.find({
      normalizedNames: { $regex: normalized, $options: "i" },
    });

    const properties = await Property.find({
      bucketId: { $in: buckets.map((b) => b._id) },
    });

    return properties;
  }
}