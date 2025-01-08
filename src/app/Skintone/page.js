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
    const [isLoading, setIsLoading] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
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

            <section className="h-auto grid place-items-center bg-[#FAF7F0]">
                <br /><div className="h-2/6 flex justify-center">
                    <div className="pl-5">
                        <h1 className="text-center text-[#6d4c41] text-2xl font-semibold">คำแนะนำสำหรับการอัพโหลดรูปภาพ :</h1>

                        <div className="text-lg text-[#8d6e63] mt-2">
                            <li>ภาพถ่ายหน้าตรง เห็นใบหน้าชัดเจน </li>
                            <li>ถ่ายภายใต้แสงไฟสีขาวหรือแสงธรรมชาติ</li>
                            <li>พื้นหลังสีขาวหรือดำเท่านั้น</li>
                            <li>ระยะห่างระหว่างใบหน้ากับกล้อง 30-50 cm</li>
                            <li>ไฟล์รูป JPEG หรือ PNG ขนาดไม่เกิน 4 MB</li>
                           
                        </div>
                        <br /><br />
                    </div>

                    <div className=" text-center">
                        <img className="w-40 ml-12 shadow-lg rounded-lg" src="https://i.postimg.cc/qvCf9N9B/image.png" alt="ตัวอย่างรูปภาพ" />
                        <p className="ml-12 mt-2 text-[#8d6e63]">ตัวอย่างรูปภาพ</p>
                    </div>
                </div>

                <br /><br /><br /><br /><br />

                <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
                    <h1 className="text-pink-600 text-xl font-bold text-center mb-4">
                        Upload a  Image
                    </h1>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        className={`border-dashed border-4 p-6 rounded-lg mb-4 ${dragging ? 'border-pink-400 bg-pink-50' : 'border-pink-300'
                            }`}
                    ><br />
                        <p className="text-pink-500 text-center">
                            Drag and drop your image here, or click to select
                        </p>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="block cursor-pointer">
                            <div className="text-center text-pink-500 underline">
                                Select a file
                            </div><br />
                        </label>

                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={!file || isLoading}
                                className={`w-5/12 py-3 px-5 rounded-full text-white font-bold text-lg transition-all duration-300 shadow-lg ${!file || isLoading
                                    ? 'bg-gradient-to-r from-pink-300 to-pink-400 opacity-50 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600'
                                    }`}
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3 text-white"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            ></path>
                                        </svg>
                                        Uploading...
                                    </div>
                                ) : (
                                    '🌸 Upload 🌸'
                                )}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <p style={{ color: 'red', marginTop: '15px', fontSize: '14px' }}>
                            {error}
                        </p>
                    )}

                    {skinToneData && (
                        <div className="mt-10 text-center">
                            <h2 className="text-xl font-bold text-gray-700 mb-4">
                                Skin Tone Result :
                            </h2>
                            <img
                                src={`/output/debug/color/faces_1/${imgName}`}
                                alt="Processed Skin Tone Result"
                                className="mx-auto rounded-lg shadow-lg max-w-full"
                            />

                            <h2 className="mt-5 text-base text-[#8d6e63] mb-2">
                           -Dominant Color คือ สีที่มีมากที่สุดบนใบหน้า อยู่ใน label ที่ 1
                           <br/>-Percent คือ เปอร์เซ็นต์ที่สีนี้ (Dominant Color) ครอบคลุมในบริเวณที่ตรวจจับได้
                           <br/>-Skin tone คือ สีผิวที่เทียบกับค่ามาตรฐานซึ่งมี 11 สี อยู่ใน label ที่ 2
                           <br/>-Accuracy คือ ความแม่นยำของผลลัพธ์
                            </h2>

                            <h2 className="text-xl  text-pink-700 mt-4">
                                นำโค้ดสี Skin tone (#xxxxxx) ไปเปรียบเทียบกับตารางด้านล่าง เพื่อดูคำแนะนำ
                            </h2>
                        </div>

                    )}
                </div><br /><br /><br /><br /><br />
            </section>

            <section className="py-20 bg-[#231903]">
                <h1 className="text-center text-3xl font-bold text-yellow-100 mb-2">
                    รหัสสีและชื่อในภาษาอังกฤษ-ไทย
                </h1>
                <h1 className="text-center text-2xl font-bold text-yellow-100 mb-6">
                    Maybelline Fit Me Matte Poreless Liquid Foundation
                </h1>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl">
                        <thead className="bg-[#254336]">
                            <tr>
                                <th className="border border-green-950 px-3 py-2 text-lg font-semibold text-amber-100">
                                    Color Code
                                </th>
                                <th className="border border-green-950 px-3 py-2 text-lg font-semibold text-amber-100">
                                    English Name
                                </th>
                                <th className="border border-green-950 px-3 py-2 text-lg font-semibold text-amber-100">
                                    Thai Name
                                </th>
                                <th className="border border-green-950 px-3 py-2 text-lg font-semibold text-amber-100">
                                    Color Block
                                </th>
                                <th className="border border-green-950 px-3 py-2 text-lg font-semibold text-amber-100">
                                    Warm Tone Foundation
                                </th>
                                <th className="border border-green-950 px-3 py-2 text-lg font-semibold text-amber-100">
                                    Cool Tone Foundation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    code: "#373028",
                                    english: "Dark Olive",
                                    thai: "เขียวมะกอกเข้ม",
                                    warm: { image: "https://media.ulta.com/i/ulta/2510205?w=2000&h=2000&fmt=auto", shade: "375 Java" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2529474?w=1080&h=1080&fmt=auto", shade: "380 Espresso" },
                                },
                                {
                                    code: "#422811",
                                    english: "Dark Brown",
                                    thai: "น้ำตาลเข้ม",
                                    warm: { image: "https://media.ulta.com/i/ulta/2529437?w=1080&h=1080&fmt=auto", shade: "370 Deep Bronze" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2510202?w=1080&h=1080&fmt=auto", shade: "360 Mocha" },
                                },
                                {
                                    code: "#513B2E",
                                    english: "Walnut Brown",
                                    thai: "น้ำตาลวอลนัท",
                                    warm: { image: "https://media.ulta.com/i/ulta/2529440?w=1080&h=1080&fmt=auto", shade: "356 Warm Coconut" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2282921?w=1080&h=1080&fmt=auto", shade: "355 Coconut" },
                                },
                                {
                                    code: "#6F503C",
                                    english: "Coffee Brown",
                                    thai: "น้ำตาลกาแฟ",
                                    warm: { image: "https://media.ulta.com/i/ulta/2295398?w=1080&h=1080&fmt=auto", shade: "340 Cappuccino" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2295394?w=1080&h=1080&fmt=auto", shade: "338 Spicy Brown" },
                                },
                                {
                                    code: "#81654F",
                                    english: "Chestnut",
                                    thai: "น้ำตาลเกาลัด",
                                    warm: { image: "https://media.ulta.com/i/ulta/2529457?w=1080&h=1080&fmt=auto", shade: "334 Warm Sun" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2282920?w=1080&h=1080&fmt=auto", shade: "330 Toffee" },
                                },
                                {
                                    code: "#9D7A54",
                                    english: "Tawny",
                                    thai: "น้ำตาลทอง",
                                    warm: { image: "https://media.ulta.com/i/ulta/2282914?w=1080&h=1080&fmt=auto", shade: "228 Soft Tan" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2295391?w=1080&h=1080&fmt=auto", shade: "222 True Beige" },
                                },
                                {
                                    code: "#BEA07E",
                                    english: "Beige Tan",
                                    thai: "เบจอมน้ำตาล",
                                    warm: { image: "https://media.ulta.com/i/ulta/2282912?w=1080&h=1080&fmt=auto", shade: "130 Buff Beige" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2282910?w=1080&h=1080&fmt=auto", shade: "125 Nude Beige" },
                                },
                                {
                                    code: "#E5C8A6",
                                    english: "Sand Beige",
                                    thai: "เบจทราย",
                                    warm: { image: "https://media.ulta.com/i/ulta/2282911?w=1080&h=1080&fmt=auto", shade: "128 Warm Nude" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2295399?w=1080&h=1080&fmt=auto", shade: "122 Creamy Beige" },
                                },
                                {
                                    code: "#E7C1B8",
                                    english: "Peach Pink",
                                    thai: "ชมพูพีช",
                                    warm: { image: "https://media.ulta.com/i/ulta/2529430?w=1080&h=1080&fmt=auto", shade: "118 Light Beige" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2282908?w=1080&h=1080&fmt=auto", shade: "115 Ivory" },
                                },
                                {
                                    code: "#F3DAD6",
                                    english: "Soft Pink",
                                    thai: "ชมพูนุ่มนวล",
                                    warm: { image: "https://media.ulta.com/i/ulta/2282906?w=1080&h=1080&fmt=auto", shade: "110 Porcelain" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2282907?w=1080&h=1080&fmt=auto", shade: "112 Natural Ivory" },
                                },
                                {
                                    code: "#FBF2F3",
                                    english: "Misty Rose",
                                    thai: "ชมพูหมอก",
                                    warm: { image: "https://media.ulta.com/i/ulta/2510268?w=1080&h=1080&fmt=auto", shade: "102 Fair Porcelain" },
                                    cool: { image: "https://media.ulta.com/i/ulta/2510267?w=1080&h=1080&fmt=auto", shade: "105 Fair Ivory" },
                                },
                            ].map((color, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-[#FCF8F3]" : "bg-white"
                                        } transform transition-all duration-200 hover:scale-110`}
                                >
                                    <td className="border border-stone-200 px-3 py-2 text-center text-base font-medium text-gray-700">
                                        {color.code}
                                    </td>
                                    <td className="border border-stone-200 px-3 py-2 text-center text-base font-medium text-gray-700">
                                        {color.english}
                                    </td>
                                    <td className="border border-stone-200 px-3 py-2 text-center text-base font-medium text-gray-700">
                                        {color.thai}
                                    </td>
                                    <td className="border border-stone-200 px-3 py-2 text-center">
                                        <div
                                            className="w-8 h-8 mx-auto rounded-full border border-green-950"
                                            style={{ backgroundColor: color.code }}
                                        ></div>
                                    </td>
                                    <td className="border border-stone-200 px-3 py-2 text-center text-gray-700">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={color.warm.image}
                                                alt={color.warm.shade}
                                                className="w-12 h-12 object-contain mb-2"
                                            />
                                            <span>{color.warm.shade}</span>
                                        </div>
                                    </td>
                                    <td className="border border-stone-200 px-3 py-2 text-center text-gray-700">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={color.cool.image}
                                                alt={color.cool.shade}
                                                className="w-12 h-12 object-contain mb-2"
                                            />
                                            <span>{color.cool.shade}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br/>
            </section>
            <section alt="conclusion">
                <div className="bg-[#231903] px-20 grid place-items-center">
                    <p className="px-40 text-lg text-amber-50 ">บางคนอาจจะสงสัยว่ารองพื้นมีแยกโทนด้วยหรอ แล้ว Warm tone กับ Cool tone จากรองพื้นข้างต้น คืออะไร จริงๆแล้วมาจาก Undertone ของเรานั่นเองค่ะ สงสัยกันใช่ไหมคะ ว่าตนเองมี Undertone แบบไหน ไปทดสอบกันเลย</p>

                    <button
                        className=" mt-6 bg-lime-700 text-white px-6 py-2 rounded-full shadow-lg hover:bg-lime-600 transition-all"
                    ><Link href="/Undertone">Let's analyze your Undertone</Link>
                    </button>

                    <br /><br /><br /><br />
                </div>
            </section>
        </main>
    );


}

export default Skintone;
