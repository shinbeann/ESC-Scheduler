import express from 'express';
import sendWhatsapp from '../controllers/whatsappController.js';


const router = express.Router();

// router.get('/:number/:msg', sendWhatsapp);
router.get('/whatsapp', sendWhatsapp);

export default router;