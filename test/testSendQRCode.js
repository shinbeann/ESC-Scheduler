// Temporary route for testing 
import express from 'express';
import { sendQRCode } from '../models/scheduler.js';
const app = express();

app.get('/test-sendQRCode', async (req, res) => {
    try {
        await sendQRCode();
        res.send('sendQRCode function executed successfully');
    } catch (error) {
        res.status(500).send('Error executing sendQRCode function');
    }
});

// Start the server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
