import { generateQRCode, verifyQRCode } from '../models/QRCode.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Jimp from 'jimp';
import qrcodeReader from 'qrcode-reader';
import assert from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'test_qr_code.png');
const qrContent = 'attendance taken!';

describe('QR Code Generation and Verification', function () {
    it('should generate a QR code and verify its content', async function () {
        // Generate the QR code
        await generateQRCode(qrContent, filePath);

        // Verify the QR code
        await verifyQRCode(filePath, qrContent);

        // Clean up
        fs.unlinkSync(filePath);
    });
});

// Function to decode a QR code from a file and verify its content
async function verifyQRCode(filePath, expectedText) {
    try {
        const image = await Jimp.read(filePath);
        const qr = new qrcodeReader();
        return new Promise((resolve, reject) => {
            qr.callback = (err, value) => {
                if (err) {
                    return reject(err);
                }
                if (value.result !== expectedText) {
                    return reject(new Error(`QR code content mismatch: expected "${expectedText}", got "${value.result}"`));
                }
                resolve();
            };
            qr.decode(image.bitmap);
        });
    } catch (error) {
        throw error;
    }
}
