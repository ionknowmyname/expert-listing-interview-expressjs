import { Router } from 'express';
import { BucketController } from '../controllers/bucket.controller.js';
import { BucketService } from '../services/bucket.service.js';

const bucketRouter = Router();

const bucketService = new BucketService();
const bucketController = new BucketController(bucketService);

bucketRouter.get("/", bucketController.getBucketStats);


export default bucketRouter;