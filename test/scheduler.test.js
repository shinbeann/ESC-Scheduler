import { sendQRCode } from '../models/scheduler.js'; // Adjust the path as necessary
import nodemailer from 'nodemailer';
import nodemailerMock from 'nodemailer-mock';
import nock from 'nock';

// Mock the external API endpoint
const mockApiUrl = 'http://localhost:3000';
const mockEndpoint = '/sendQRCode';

// Mock the nodemailer module
jest.mock('nodemailer', () => {
    return nodemailerMock;
});

describe('sendQRCode', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        nock.cleanAll(); // Clean up after each test
    });

    it('should send QR codes for sessions starting tomorrow', async () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];

        // Mock the API response
        nock(mockApiUrl)
            .post(mockEndpoint)
            .reply(200, {
                sessionId: 1,
                trainerEmail: 'trainer@example.com',
                formUrl: 'http://example.com/form'
            });

        // Call the function to send QR codes
        await sendQRCode();

        // Check if the email was sent
        const sentEmails = nodemailerMock.mock.getSentMail();
        expect(sentEmails.length).toBe(1);

        // Verify the content of the sent email
        const email = sentEmails[0];
        expect(email.to).toBe('trainer@example.com');
        expect(email.subject).toBe('Training Session QR Code');
        expect(email.text).toContain('Scan this QR code to take attendance for the training session.');
        expect(email.attachments).toHaveLength(1);
        expect(email.attachments[0].filename).toBe('qr_code.png');
    });

    it('should handle errors gracefully', async () => {
        nock(mockApiUrl)
            .post(mockEndpoint)
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
