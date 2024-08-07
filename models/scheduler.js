import cron from 'node-cron';
import { sendEmailWithQRCode } from '../controllers/attendanceController.js'; // Adjust the path as needed
import { pool } from '../controllers/db.js'; // Make sure your database pool is correctly set up

// Function to get training sessions starting the next day and send QR codes
async function sendQRCodeForUpcomingSessions() {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        // Query to get training sessions starting tomorrow
        const [sessions] = await pool.query(
            'SELECT trainerEmail, formUrl FROM TrainingSessions WHERE startDate = ?',
            [formattedDate]
        );

        // Send QR code emails for each session
        for (const session of sessions) {
            await sendEmailWithQRCode({
                body: {
                    // sessionId: session.sessionId,
                    trainerEmail: session.trainerEmail,
                    formUrl: session.formUrl
                }
            });
        }
    } catch (error) {
        console.error('Error sending QR codes for upcoming sessions:', error);
    }
}

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running daily job at midnight');
    sendQRCodeForUpcomingSessions();
});
