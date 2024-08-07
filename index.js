import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/scheduler.js';
import emailRoutes from './routes/emailRoutes.js';
//import attendanceRoutes from './routes/attendanceRoutes.js';
import schedulerRoutes from './routes/scheduler.js';
//import { connectToDatabase, cleanup } from './controllers/db.js';
import notificationRoutes from './routes/notificationRoutes.js';
import axios from 'axios';
import cron from 'node-cron';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;


app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Express App containing API calls for Twilio, SMTP, and QR Code generation');
});
app.use('/email', emailRoutes);
//app.use('/attendance', attendanceRoutes);
app.use('/scheduler', schedulerRoutes);
app.use('/notification', notificationRoutes);

// Schedule a cron job to run daily at 12.20 PM
cron.schedule('12 20 * * *', () => {
    console.log('Sending scheduled notifications at 12:20');
    axios.get(`http://localhost:8002/notification`)
      .then(response => {
        console.log('Send route triggered:', response.data);
      })
      .catch(error => {
        console.error('Error triggering send route:', error);
      });
  }, {
    timezone: "Asia/Singapore"
  });

// Start the server
app.listen(PORT, async () => {
    try {
        // await connectToDatabase();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.error('Server failed to start', err);
    }
});

