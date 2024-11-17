"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Skintone() {
    const [file, setFile] = useState(null);
    const [skinToneData, setSkinToneData] = useState(null);
    const [error, setError] = useState(null);
    const [filename, setFileName] = useState(null);
    const [imgName, setImgName] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            var img = data.filename;
            setFileName(img);

            const resSkin = await fetch('/api/skintone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: img }), // Send filename or any necessary info 
            });

            if (!resSkin.ok) throw new Error('Skin tone classification failed');

            const skinData = await resSkin.json();

            setSkinToneData(skinData);
            const fileParts = img.split('.');
            setImgName(`${fileParts[0]}-1.${fileParts[1]}`);
            
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <main>
            
            <section className="picture-home bg-[url('https://i.postimg.cc/zXqt5V6S/IMG-0703.jpg')]">
                <div className="h-2/6 flex">
                    <div className="w-2/5 flex justify-center items-center text-white text-4xl">
                        <h1>TellTone</h1>
                    </div>
                    <ul className="w-full gap-8 flex justify-center items-center text-white">
                        <Link href="/">Home</Link>
                        <Link href="/Skintone">Skin tone</Link>
                        <Link href="/Personalcolor">Personal color</Link>
                        <Link href="/Makeuptutorials">Makeup tutorials</Link>
                    </ul>
                </div>
                
                <div className="h-2/6">
                    <div className="w-full h-4/5 flex justify-center items-center text-white text-4xl">
                        <h1>SKIN TONE ANALYSIS</h1>
                    </div>
                </div>
            </section>

            <section className="h-auto grid place-items-center">
                <div className="h-2/6 flex justify-center">
                    <div className="pl-5">
                        <h1 className="text-center text-2xl font-semibold">คำแนะนำสำหรับการอัพโหลดรูปภาพ:</h1>
                        <br />
                        <div className="text-lg">
                            <li>รูปควรที่จะเป็นหน้าสด ไม่ใช้รุปที่แต่งหน้าแล้วเพื่อนที่จะได้คำนวนสีออกมาได้ถูกต้อง</li>
                            <br />
                            <li>แสงควรที่จะสว่าง ไม่ทำให้เกิดเงาบนใบหน้า เพื่อให้สีออกมาตรงมากที่สุด</li>
                            <br />
                            <li>แนะนำให้เป็นรูปที่เห็นหน้าชัดเจน หน้าตรง ไม่เล็กหรือไกลจนเกินไป</li>
                            <br />
                            <li>พื้นหลังต้องไม่ส่งผลกระทบต่อแสงที่ใบหน้า</li>
                        </div>
                        <br /><br />
                    </div>

                    <div className="mt-10 text-center">
                        <img className="w-40 ml-12" src="https://i.postimg.cc/qvCf9N9B/image.png" alt="ตัวอย่างรูปภาพ" />
                        <p className="ml-12 mt-2">ตัวอย่างรูปภาพ</p>
                    </div>
                </div>

                <br /><br /><br /><br />

                <div>
                    <h1>Upload an Image</h1>
                    <br /><br /><br /><br />
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </form>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {skinToneData && (
                        <div>
                        {/* <h2>Skin Tone Result:</h2>
                          <p>{JSON.stringify(skinToneData)}</p> {/* Display the skin tone data /} */}

                            {/* Display the processed image */}
                            <img src={`/output/debug/color/faces_1/${imgName}`} alt="Processed Skin Tone Result" />
                        </div>
                    )}
                </div>
            </section>
        </main>
    );


}

export default Skintone;
