import express from 'express';
import { scheduleNotification } from '../controllers/sendController.js';


const router = express.Router();

// router.get('/:email/:course/:start', sendEmail);
router.get('/', scheduleNotification);


export default router;