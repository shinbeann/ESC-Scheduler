import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  require: ['esm'],
  extension: ['js'],
  spec: ['test/**/*.test.js'], // Adjust the path if needed
  recursive: true
};
