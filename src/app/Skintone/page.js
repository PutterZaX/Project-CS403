"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Prompt, Nunito } from 'next/font/google';
const prompt = Prompt({ subsets: ['thai'], weight: ['400', '700'], variable: '--font-prompt' });
const nunito = Nunito({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-nunito' });


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
        <main className={`${prompt.variable} ${nunito.variable} font-sans`} >

            <section className="picture-home bg-[url('https://i.postimg.cc/zXqt5V6S/IMG-0703.jpg')]">
                <div className="h-2/6 flex">
                    <div className="w-2/5 flex justify-center items-center text-white text-4xl">
                        <h1>TellTone</h1>
                    </div>
                    <ul className="w-full gap-8 flex justify-center items-center text-white">
                        <Link href="/">Home</Link>
                        <Link href="/Skintone">Skin tone</Link>
                        <Link href="/Undertone">Undertone</Link>
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

                <br /><br /><br /><br /><br /><br /><br />

                <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
                    <h1 style={{ color: '#333', marginBottom: '20px' }}>Upload an Image</h1>

                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'inline-block', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
                        >
                            Upload
                        </button>
                    </form>

                    {error && (
                        <p style={{ color: 'red', marginTop: '15px', fontSize: '14px' }}>
                            {error}
                        </p>
                    )}

                    {skinToneData && (
                        <div style={{ marginTop: '20px' }}>
                            <h2 style={{ color: '#333', fontSize: '18px' }}>Skin Tone Result:</h2>
                            <img
                                src={`/output/debug/color/faces_1/${imgName}`}
                                alt="Processed Skin Tone Result"
                                style={{ marginTop: '10px', borderRadius: '8px', maxWidth: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>
                    )}
                </div>


                <br /><br /><br /><br /><br />

                <h1 className="text-center text-2xl font-semibold">รหัสสีและชื่อในภาษาอังกฤษ-ไทย:</h1>

                <br /><br />

                <div className="grid grid-cols-4 gap-12 text-center items-center justify-items-center">
                    <h1 className="text-2l font-semibold">Color code</h1>
                    <h1 className="text-2l font-semibold">English name</h1>
                    <h1 className="text-2l font-semibold">Thai name</h1>
                    <h1 className="text-2l font-semibold">Color block</h1>

                    <h1>#373028</h1>
                    <h1>Dark Olive</h1>
                    <h1>เขียวมะกอกเข้ม</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#373028' }}></div>

                    <h1>#422811</h1>
                    <h1>Dark Brown</h1>
                    <h1>น้ำตาลเข้ม</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#422811' }}></div>

                    <h1>#513b2e</h1>
                    <h1>Walnut Brown</h1>
                    <h1>น้ำตาลวอลนัท</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#513b2e' }}></div>

                    <h1>#6f503c</h1>
                    <h1>Coffee Brown</h1>
                    <h1>สีน้ำตาลกาแฟ</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#6f503c' }}></div>

                    <h1>#81654f</h1>
                    <h1>Chestnut</h1>
                    <h1>น้ำตาลเกาลัด</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#81654f' }}></div>

                    <h1>#9d7a54</h1>
                    <h1>Tawny</h1>
                    <h1>น้ำตาลทอง</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#9d7a54' }}></div>

                    <h1>#bea07e</h1>
                    <h1>Beige Tan</h1>
                    <h1>สีเบจอมน้ำตาล</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#bea07e' }}></div>

                    <h1>#e5c8a6</h1>
                    <h1>Sand Beige</h1>
                    <h1>สีเบจทราย</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#e5c8a6' }}></div>

                    <h1>#e7c1b8</h1>
                    <h1>Peach Pink</h1>
                    <h1>ชมพูพีช</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#e7c1b8' }}></div>

                    <h1>#f3dad6</h1>
                    <h1>Soft Pink</h1>
                    <h1>ชมพูนุ่มนวล</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#f3dad6' }}></div>

                    <h1>#fbf2f3</h1>
                    <h1>Misty Rose</h1>
                    <h1>ชมพูหมอก</h1>
                    <div className="w-10 h-10 border border-black" style={{ backgroundColor: '#fbf2f3' }}></div>

                </div>

                <br /><br /><br /><br /><br />

                <h1 className="text-center text-2xl font-semibold">แนะนำรองพื้นที่ใกล้เคียงกับสีที่คุณให้มาจาก </h1>
                <h1 className="text-center text-2xl font-semibold">Maybelline’s Fit Me และ SuperStay Foundation ranges ตาม undertones</h1>
                <br /><br />
                <div className="text-lg">
                    <h1>1. สีอ่อนโทนกลางถึงอบอุ่น เช่น สีที่ใกล้กับ "#bea07e" หรือ "#e5c8a6":</h1>
                    <li>Fit Me: เฉด Classic Ivory (120) สำหรับโทนกลางเย็น หรือ Buff Beige (130) สำหรับกลางอบอุ่น​</li>
                    <div class="flex gap-20 justify-center items-center space-x-4">
                        <img class="w-40 ml-12" src="https://medias.watsons.co.th/publishing/WTCTH-271496-swatch-zoom.jpg?version=1718737816" />
                        <img class="w-40 ml-12" src="https://medias.watsons.co.th/publishing/WTCTH-271504-side-zoom.jpg?version=1718737804" />
                    </div>
                    <li>SuperStay: เฉด Light Beige (118) หรือ Warm Nude (128)</li>
                    <div class="flex gap-20 justify-center items-center space-x-4">
                        <img class="w-40 ml-12" src="https://acdn.mitiendanube.com/stores/004/266/326/products/86315-362ca9fd8daf01225317149370344904-1024-1024.png" />
                        <img class="w-40 ml-12" src="https://shaheenchemistrwp.com/cdn/shop/files/Untitleddesign_40_9580df46-e24d-4756-ab56-692a852078ea.png?v=1723205073" />
                    </div>
                    <br /><br />

                    <h1>2. สีปานกลางโทนอบอุ่น เช่น สีที่ใกล้เคียงกับ "#81654f" และ "#9d7a54":</h1>
                    <li>Fit Me: เฉด Natural Beige (220) สำหรับกลางโทนอุ่น และ Sun Beige (310) สำหรับโทนอุ่นเข้มขึ้นเล็กน้อย​​</li>
                    <div class="flex gap-20 justify-center items-center space-x-4">
                        <img class="w-40 ml-12" src="https://medias.watsons.co.th/publishing/WTCTH-BP_271498-front-zoom.jpg" />
                        <img class="w-40 ml-12" src="https://skinplusbd.com/public/uploads/all/s8Ur1NDbTl0ejBncpN4oD8oVcNLV7pw4WHLUWkWl.png" />
                    </div>
                    <li>SuperStay: เฉด Natural Beige (220) หรือ Golden (312)​</li>
                    <div class="flex gap-20 justify-center items-center space-x-4">
                        <img class="w-40 ml-12" src="https://www.gosupps.com/media/catalog/product/cache/25/small_image/1500x1650/9df78eab33525d08d6e5fb8d27136e95/6/1/61wsbCTjzAL.jpg" />
                        <img class="w-40 ml-12" src="https://m.media-amazon.com/images/I/41FRgz2pR0L.jpg" />
                    </div>
                    <br /><br />

                    <h1>3. สีเข้มโทนอุ่น เช่น สีที่ใกล้กับ "#6f503c" หรือ "#513b2e":</h1>
                    <li>Fit Me: เฉด Golden Caramel (332) และ Cappuccino (340) เหมาะสำหรับโทนผิวเข้มโทนอุ่น​​</li>
                    <div class="flex gap-20 justify-center items-center space-x-4">
                        <img class="w-40 ml-12" src="https://img.lazcdn.com/g/p/3924e484da4a572bdb15fa1564a226a9.jpg_720x720q80.jpg" />
                        <img class="w-40 ml-12" src="https://img.tatacliq.com/images/i18//1316Wx1468H/MP000000018560791_1316Wx1468H_202406251150561.jpeg" />
                    </div>
                    <li>SuperStay: เฉด Golden Caramel (332) หรือ Cappuccino (340)</li>
                    <div class="flex gap-20 justify-center items-center space-x-4">
                        <img class="w-40 ml-12" src="https://i5.walmartimages.com/seo/Maybelline-Super-Stay-Liquid-Foundation-Makeup-Full-Coverage-332-Golden-Caramel-1-fl-oz_686ef3c2-aa28-429c-a2cf-1360359aeba2.6012a0fc02be8cd4aa4db5eab2e2af7b.png" />
                        <img class="w-40 ml-12" src="https://i5.walmartimages.com/seo/Maybelline-Super-Stay-Liquid-Foundation-Makeup-Full-Coverage-340-Cappuccino-1-fl-oz_0f820f69-d355-4d89-9471-b72991c8bbc1.b90f070f8e50c66e8dabe12e7cf20143.png?odnHeight=768&odnWidth=768&odnBg=FFFFFF" />
                    </div>
                    <br /><br />

                    <h1>เฉดสีเหล่านี้มีอยู่ในหลายสูตร เช่น Fit Me Dewy + Smooth สำหรับผิวแห้งและ Matte + Poreless สำหรับผิวมัน</h1>
                    <h1>โดยสีที่เลือกแนะนำนี้เป็นตัวเลือกเบื้องต้น แต่แนะนำให้ทดลองจริงเพื่อให้ได้เฉดที่เหมาะกับผิวคุณที่สุด</h1>
                </div><br />

                <br /><br /><br /><br /><br />

            </section>
        </main>
    );


}

export default Skintone;
