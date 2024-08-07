// models/QRCode.js
// generate QR Code
import QRCode from 'qrcode';

export async function generateQRCode(sessionId, filePath) {
    try {
        const staticMessage = "attendance taken"; // Static message for QR code
        await QRCode.toFile(filePath, staticMessage, {
            color: {
                dark: '#000000', // Black dots
                light: '#0000'   // Transparent background
            }
        });
        console.log('QR code generated successfully');
    } catch (err) {
        console.error('Failed to generate QR code', err);
    }
}
