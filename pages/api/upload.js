// pages/api/upload.js
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js's default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public', 'images');

export default async (req, res) => {
    const form = new IncomingForm();

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir; // Set the upload directory

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error in parsing the file' });
        }

        const file = files.file[0]; // first file
        const oldPath = file.filepath; // Use filepath from the file object
        const newPath = path.join(uploadDir, file.originalFilename);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error in moving the file' });
            }

            res.status(200).json({ message: 'File uploaded successfully', filename: file.originalFilename });
        });
    });
};