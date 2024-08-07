import cron from 'node-cron';
import { sendEmailWithQRCode } from '../controllers/emailController.js';
// import { pool } from '../controllers/db.js';

// Function to get training sessions starting the next day and send QR codes
export async function sendQRCode() { // Ensure this function is exported
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        // Query to get training sessions starting tomorrow
        const [sessions] = await pool.query(
            'SELECT sessionId, trainerEmail, formUrl FROM TrainingSessions WHERE startDate = ?',
            [formattedDate]
        );

        // Send QR code emails for each session
        for (const session of sessions) {
            await sendEmailWithQRCode({
                body: {
                    sessionId: session.sessionId,
                    trainerEmail: session.trainerEmail,
                    formUrl: session.formUrl
                }
            });
        }
    } catch (error) {
        console.error('Error sending QR codes for upcoming sessions:', error);
    }
}

// Schedule task to run at 8am SGT
cron.schedule('0 8 * * *', sendQRCode, {
    timezone: 'Asia/Singapore'
});
