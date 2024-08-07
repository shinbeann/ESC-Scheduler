// controllers/emailController.js
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateQRCode } from '../models/QRCode.js';

// edit changes

export async function sendEmail(req, res) {
    const { email, course, start } = req.params;
    const toEmail = email; // Recipient email

    // Ensure sessionId is an integer
    if (typeof sessionId !== 'number' || isNaN(sessionId)) {
        return res.status(400).send('Invalid sessionId. It should be an integer.');
    }

    // Get environment variables
    const smtpServer = process.env.SMTP_SERVER;
    const smtpPort = process.env.SMTP_PORT;
    const username = process.env.SMTP_USER;
    const password = process.env.SMTP_PASS;
    const fromEmail = process.env.EMAIL_SENDER;

    // Create a transporter object using the SMTP server details
    const transporter = nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: false, // Set to true if using port 465
        auth: {
            user: username,
            pass: password
        }
    });

    // Define the email options
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: 'Hello from Node.js SES SMTP',
        text: `This is a reminder from TSH to complete your course ${ course } starting from ${ start }`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to the SES simulator');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send(`Failed to send email: ${error.message}`);
    }
}

export async function sendEmailWithQRCode(req, res) {
    const { sessionId, trainerEmail, formUrl } = req.body;

    // Ensure sessionId is an integer
    if (typeof sessionId !== 'number') {
        return res.status(400).send('Invalid sessionId. It should be an integer.');
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '..', 'qr_code.png');

    try {
        await generateQRCode(`${formUrl}?sessionId=${sessionId}`, filePath);

        // Get environment variables
        const smtpServer = process.env.SMTP_SERVER;
        const smtpPort = process.env.SMTP_PORT;
        const username = process.env.SMTP_USER;
        const password = process.env.SMTP_PASS;
        const fromEmail = process.env.EMAIL_SENDER;

        // Create a transporter object using the SMTP server details
        const transporter = nodemailer.createTransport({
            host: smtpServer,
            port: smtpPort,
            secure: false,
            auth: {
                user: username,
                pass: password
            }
        });

        // Define the email options
        const mailOptions = {
            from: fromEmail,
            to: trainerEmail,
            subject: 'Training Session QR Code',
            text: 'Scan this QR code to take attendance for the training session.',
            attachments: [
                {
                    filename: 'qr_code.png',
                    path: filePath
                }
            ]
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send(`Failed to send email: ${error.message}`);
    }
}
