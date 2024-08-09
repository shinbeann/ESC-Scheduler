import cron from 'node-cron';
import axios from 'axios'; // axios for HTTP requests

const TRAINER_ENDPOINT_URL = 'http://localhost:8080/trainer';
const EMAIL_SEND_ENDPOINT_URL = 'http://localhost:8002/email/sendQRCode';

// Function to send QR code emails for training sessions starting tomorrow
export async function sendQRCode() {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];

        // Fetch training sessions starting tomorrow from the database
        const response = await axios.get(`${TRAINER_ENDPOINT_URL}?startDate=${formattedDate}`);
        const sessions = response.data;

        // Send QR code emails for each session
        for (const session of sessions) {
            await axios.post(EMAIL_SEND_ENDPOINT_URL, {
                trainerEmail: session.trainerEmail,
                request_id: session.request_id,
            });
        }

    } catch (error) {
        console.error('Error sending QR codes for upcoming sessions:', error);
    }
}

// Schedule the task to run daily at 8 AM SGT
cron.schedule('0 8 * * *', sendQRCode, {
    timezone: 'Asia/Singapore',
});
