// generate QR Code
import QRCode from 'qrcode';

export async function generateQRCode(sessionId, filePath) {
    try {
        await QRCode.toFile(filePath, sessionId);
        console.log('QR code generated successfully');
    } catch (err) {
        console.error('Failed to generate QR code', err);
    }
}
