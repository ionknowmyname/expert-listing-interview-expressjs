import { Router } from 'express';
import propertyRouter from './property.route.js';
import bucketRouter from './bucket.route.js';


const router = Router();

router.use("/bucket", bucketRouter);
router.use("/property", propertyRouter);

export default router;