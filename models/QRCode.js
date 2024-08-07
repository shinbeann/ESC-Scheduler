// models/QRCode.js
// generate QR Code
import QRCode from 'qrcode';

export async function generateQRCode(sessionId, filePath) {
    try {
        await QRCode.toFile(filePath, data.toString(), {
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
