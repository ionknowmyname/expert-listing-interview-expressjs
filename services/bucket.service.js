import express from "express";
import Bucket from "../models/bucket.model.js";
import Property from "../models/property.model.js";

export class BucketService {
  async getBucketStats() {
    const buckets = await Bucket.countDocuments();
    const perBucket = await Property.aggregate([
      { $group: { _id: "$bucketId", count: { $sum: 1 } } },
    ]);

    return { totalBuckets: buckets, propertiesPerBucket: perBucket };
  }
}
