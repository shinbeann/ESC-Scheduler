// routes/scheduler.js
import express from 'express';
import { sendQRCode } from '../models/scheduler.js'; 

const router = express.Router();

router.get('/test-scheduler', async (req, res) => {
    try {
        await sendQRCode();
        res.status(200).send('QR codes sent successfully');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

export default router;
