import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check for image filename in the request body
    const { filename } = req.body;
    if (!filename) {
        return res.status(400).json({ error: 'Image filename is required' });
    }

    // Generate the absolute path of the image file
    const absoluteImagePath = path.join(process.cwd(), 'public', 'images', filename);

    // Set the command to be executed
    const command = `stone -i ${absoluteImagePath} -t color --debug -o ${path.join(process.cwd(), 'public', 'output')}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Error executing command', details: error.message });
        }

        // ตรวจสอบว่า stderr มีข้อมูลที่ไม่ใช่ข้อผิดพลาด (ข้อความสถานะ)
        if (stderr) {
            console.log(`stderr: ${stderr}`); // คุณสามารถเก็บข้อความนี้ใน log เพื่อดูการประมวลผล
            // ไม่ถือว่าเป็น error ในกรณีนี้
        }

        // เมื่อทุกอย่างสำเร็จ ให้ส่งผลลัพธ์ stdout กลับไปที่ Client
        console.log(`stdout: ${stdout}`);
        return res.status(200).json({ message: 'Command executed successfully' });
    });
}
