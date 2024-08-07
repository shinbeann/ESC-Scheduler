import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/scheduler.js';
import emailRoutes from './routes/emailRoutes.js';
//import attendanceRoutes from './routes/attendanceRoutes.js';
import schedulerRoutes from './routes/scheduler.js';
//import { connectToDatabase, cleanup } from './controllers/db.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;

// Routes
app.get('/', (req, res) => {
    res.send('Express App containing API calls for Twilio, SMTP, and QR Code generation');
});
app.use('/email', emailRoutes);
//app.use('/attendance', attendanceRoutes);
app.use('/scheduler', schedulerRoutes);
app.use('/notification', notificationRoutes);

// Start the server
app.listen(PORT, async () => {
    try {
        // await connectToDatabase();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.error('Server failed to start', err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
