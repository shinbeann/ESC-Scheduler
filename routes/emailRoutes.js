import express from 'express';
import {sendEmail, sendEmailWithQRCode} from '../controllers/emailController.js';


const router = express.Router();

// router.get('/:email/:course/:start', sendEmail);
router.post('/sendQRCode', sendEmailWithQRCode);


export default router;