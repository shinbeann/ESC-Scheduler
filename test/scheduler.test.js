import { sendQRCode } from '../models/scheduler.js'; // Adjust the path as necessary
import nodemailer from 'nodemailer';
import nodemailerMock from 'nodemailer-mock';
import nock from 'nock';
import { jest } from '@jest/globals';

// Mock nodemailer
jest.mock('nodemailer', () => nodemailerMock);

describe('Scheduler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        nock.cleanAll(); // Clean up after each test
    });

    it('should send QR codes 1 minute before the start of the training', async () => {
        const now = new Date();
        const targetDate = new Date(now.getTime() + 1 * 60 * 1000); // 1 minute later
        const formattedDate = targetDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        // Mock the API endpoint
        nock('http://localhost:3000')
            .get('/scheduler/test-scheduler')
            .reply(200, {
                sessionId: 1,
                trainerEmail: 'gayshinlee@gmail.com',
                formUrl: 'http://example.com/form',
                startDate: formattedDate
            });

        // Call the function to send QR codes
        await sendQRCode();

        // Check if the email was sent
        const sentEmails = nodemailerMock.mock.getSentMail();
        expect(sentEmails.length).toBe(1);

        // Verify the content of the sent email
        const email = sentEmails[0];
        expect(email.to).toBe('gayshinlee@gmail.com');
        expect(email.subject).toBe('Training Session QR Code');
        expect(email.text).toContain('Scan this QR code to take attendance for the training session.');
        expect(email.attachments).toHaveLength(1);
        expect(email.attachments[0].filename).toBe('qr_code.png');
    });

    it('should handle errors gracefully', async () => {
        // Mocking an error scenario
        nock('http://localhost:3000')
            .get('/scheduler/test-scheduler')
            .reply(500, 'Internal Server Error');

        // Call the function to ensure it handles errors
        await expect(sendQRCode()).resolves.not.toThrow();

        // Check if the error is logged to the console
        expect(console.error).toHaveBeenCalledWith(
            'Error sending QR codes for upcoming sessions:',
            expect.any(Error)
        );
    });
});
