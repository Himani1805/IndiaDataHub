import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Service to handle file system operations
 * @param {string} fileName - Name of the JSON file in the data folder
 */
export const fetchJsonData = async (fileName) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', fileName);
    const rawData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    throw new Error('Data source not found or corrupted');
  }
};