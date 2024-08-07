import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/scheduler.js';
import emailRoutes from './routes/emailRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import { connectToDatabase, cleanup } from './controllers/db.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Express App containing API calls for Twilio, SMTP, and QR Code generation');
});
app.use('/email', emailRoutes);
app.use('/whatsapp', whatsappRoutes);
app.use('/attendance', attendanceRoutes);

// Start the server
app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.error('Server failed to start', err);
    }
});

process.on('SIGINT', async () => {
    try {
        await cleanup();
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
});
