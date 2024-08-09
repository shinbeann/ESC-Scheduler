import QRCode from 'qrcode';

// Function to generate a QR code and save it to a file
export async function generateQRCode(data, filePath) {
    try {
        await QRCode.toFile(filePath, data);
        console.log('QR code generated and saved to file');
    } catch (error) {
        console.error('Failed to generate QR code:', error);
        throw error;
    }
}

// Function to decode a QR code from a file and verify its content
export async function verifyQRCode(filePath, expectedText) {
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
