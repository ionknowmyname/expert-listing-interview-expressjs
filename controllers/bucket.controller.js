import { BucketService } from "../services/bucket.service.js";

export class BucketController {
  constructor(bucketService) {
    // this.bucketService = new BucketService();
    this.bucketService = bucketService;

    this.getBucketStats = this.getBucketStats.bind(this);

  }

  getBucketStats = async (_, res) => {
    try {
      const bucketStats = await this.bucketService.getBucketStats();
      res.status(200).json(bucketStats);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  };
}