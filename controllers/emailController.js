// controllers/emailController.js
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateQRCode } from '../models/QRCode.js';

export async function sendEmail(email, staff_name, course, date, hour, minute, location) {
    const toEmail = email; // Recipient email

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
        subject: 'Reminder to complete course',
        text: `Dear ${ staff_name }, this is a reminder from TSH to complete your course ${ course } at the start date ${date} at ${hour}:${minute}. The location is at ${location}.`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

export async function sendEmailWithQRCode(req, res) {
    const { trainerEmail, request_id  } = req.body;

    // Validate input
    if (!trainerEmail || !request_id) {
        return res.status(400).send('Missing required fields: trainerEmail and request_id.');
    }

    console.log(`Received request to send QR code to: ${trainerEmail}`);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '..', 'qr_code.png');

    const qrContent = '1';

    try {
        await generateQRCode(qrContent, filePath);

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
