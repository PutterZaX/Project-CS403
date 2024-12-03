"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import * as faceapi from "face-api.js";
import Link from "next/link";
import { Prompt, Nunito } from 'next/font/google';
const prompt = Prompt({ subsets: ['thai'], weight: ['400', '700'], variable: '--font-prompt' });
const nunito = Nunito({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-nunito' });

function Undertone() {
    const canvasRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [undertone, setUndertone] = useState("");

    const videos = {
        "Warm Tone": [
            "https://www.youtube.com/embed/LjiP6I9q_qI",
            "https://www.youtube.com/embed/DuyIKvsbxFc",
            "https://www.youtube.com/embed/cJtKsdZfiIQ",
        ],
        "Cool Tone": [
            "https://www.youtube.com/embed/9OQM3rZUd2c",
            "https://www.youtube.com/embed/hxzAKZ_t6bg",
            "https://www.youtube.com/embed/L8ehUgP05xc",
        ],
        "Neutral Tone": [
            "https://www.youtube.com/embed/RKxw0oP3OAo",
            "https://www.youtube.com/embed/U4v_w2zaZZ0",
            "https://www.youtube.com/embed/FdXW9kuS1BI",
        ],
    };

    const toneText = {
        "Warm Tone": "You have a warm undertone! Here are some tips for you.",
        "Cool Tone": "You have a cool undertone! Explore these resources.",
        "Neutral Tone": "You have a neutral undertone! Check out these ideas.",
    };

    const toneImages = {
        "Warm Tone": "https://www.beautyintrend.com/images/article/upload/763/2.jpg",
        "Cool Tone": "https://www.beautyintrend.com/images/article/upload/763/1.jpg",
        "Neutral Tone": "https://www.beautyintrend.com/images/article/upload/763/3.jpg",
    };

    useEffect(() => {
        // Load face detection models
        const loadModels = async () => {
            await faceapi.loadTinyFaceDetectorModel('/models');
        };
        loadModels();
    }, []);

    // Handle image upload and undertone analysis
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target.result);
                analyzeImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Analyze the uploaded image and determine undertone
    const analyzeImage = (imageSrc) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const image = new window.Image();

        image.onload = async () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);

            // Detect face
            const detections = await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions());
            if (!detections) {
                setUndertone("Face not detected");
                return;
            }

            // Get face bounding box and extract color data within it
            const { x, y, width, height } = detections.box;
            const faceData = context.getImageData(x, y, width, height);

            let red = 0, green = 0, blue = 0;
            const pixelCount = faceData.data.length / 4;

            for (let i = 0; i < faceData.data.length; i += 4) {
                red += faceData.data[i];
                green += faceData.data[i + 1];
                blue += faceData.data[i + 2];

            }

            /// Calculate average color values
            red = red / pixelCount;
            green = green / pixelCount;
            blue = blue / pixelCount;

            // Reference warm and cool tone colors
            const warmTones = ["#FEDCC0", "#F0C9A6", "#EDC097"];
            const coolTones = ["#FCD6CA", "#F4D0C4", "#EBBCAC"];

            // Convert hex to RGB
            const hexToRgb = (hex) => {
                const bigint = parseInt(hex.slice(1), 16);
                return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
            };

            // Calculate color distance
            const colorDistance = (rgb1, rgb2) => {
                return Math.sqrt(
                    Math.pow(rgb1[0] - rgb2[0], 2) +
                    Math.pow(rgb1[1] - rgb2[1], 2) +
                    Math.pow(rgb1[2] - rgb2[2], 2)
                );
            };

            // Find closest match in warm and cool tones
            const averageColor = [red, green, blue];
            let minWarmDistance = Infinity;
            let minCoolDistance = Infinity;

            for (const tone of warmTones) {
                const toneRgb = hexToRgb(tone);
                const distance = colorDistance(averageColor, toneRgb);
                if (distance < minWarmDistance) minWarmDistance = distance;
            }

            for (const tone of coolTones) {
                const toneRgb = hexToRgb(tone);
                const distance = colorDistance(averageColor, toneRgb);
                if (distance < minCoolDistance) minCoolDistance = distance;
            }

            // Determine undertone based on closest color match
            if (minWarmDistance < minCoolDistance) {
                setUndertone("Warm Tone");
            } else if (minCoolDistance < minWarmDistance) {
                setUndertone("Cool Tone");
            } else {
                setUndertone("Neutral Tone");
            }
        };

        image.src = imageSrc;
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className={`${prompt.variable} ${nunito.variable} font-sans`}>

            {/* Navigation Buttons */}
            <section className="fixed bottom-80 left-5 z-50 flex flex-col gap-2 items-start">
                {[
                    {
                        id: '1',
                        label: 'Introduction of Undertone',
                        color: 'bg-blue-500 hover:bg-blue-700',
                    },
                    {
                        id: '2',
                        label: 'Basic your Undertone',
                        color: 'bg-green-500 hover:bg-green-700',
                    },
                    {
                        id: '3',
                        label: 'Analyze your Undertone',
                        color: 'bg-yellow-500 hover:bg-yellow-700',
                    },
                ].map((step) => (
                    <div key={step.id} className="group relative">
                        <button
                            onClick={() => scrollToSection(step.id)}
                            className={`text-white rounded-lg shadow-lg px-4 py-2 flex items-center overflow-hidden transition-all duration-300 ${step.color}`}
                        >
                            {/* Short Label */}
                            <span className="whitespace-nowrap group-hover:hidden">
                                {step.label.split(' ')[0]}
                            </span>
                            {/* Full Label */}
                            <span className="hidden whitespace-nowrap group-hover:inline">
                                {step.label}
                            </span>
                        </button>
                    </div>
                ))}
            </section>



            <section className="picture-personal bg-[url('https://www.annmariegianni.com/wp-content/uploads/2020/05/how-to-determine-your-skin-tone-for-makeup-foundation-2.jpg')]" alt="header">
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
                    <div className="w-full h-4/6 flex justify-center items-center text-white text-4xl">
                        <h1>UNDERTONE ANALYSIS</h1>
                    </div>
                </div>
            </section><br /><br />

            {/* Introduction */}
            <section id="1" className="py-6 px-6 md:px-20">
                <h2 className="text-3xl font-serif font-bold text-center mb-8">Undertone</h2>
                <p className="text-lg mb-6 leading-7">
                    Undertone คือโทนสีผิวจริงที่ปรากฏใต้พื้นผิวหนังของเรา จะส่งผลต่อเฉดสีผิวโดยรวม โดยจะแสดงสีผิวจากเม็ดสีเมลานินที่อยู่ใต้ชั้นผิว  ซึ่งจะแตกต่างจาก Skin Tone ที่เป็นสีผิวของเราที่เรามองเห็นจากภายนอก สามารถเปลี่ยนแปลงได้อยู่ตลอดเวลา
                </p>
                <p className="text-lg mb-6 leading-7">สีผิว Undertone จะแบ่งออกเป็น 3 กลุ่มด้วยกัน คือ <br />
                    Cool Tone สีโทนเย็น โดยคนที่มี Undertone เป็นสีโทนเย็นมักจะเป็นคนที่มีสีผิวออกชมพูและฟ้า<br />
                    Warm Tone สีโทนอุ่น โดยคนที่มี Undertone เป็นสีโทนอุ่นมักจะเป็นคนที่มีสีผิวออกเหลือง ทอง และพีช<br />
                    Neutral Tone หรือโทนผิวกลาง สีโทนกลาง หมายความว่า สีผิวด้านนอก (Skin Tone) กับสีผิวด้านล่าง (Under Tone) เป็นสีเดียวกัน เป็นสีผิวที่ไม่ออกไปโทนชมพูหรือเหลือง
                </p>
                <br />
                <div className="grid place-items-center">
                    <img
                        src="https://pilthesalon.com/wp-content/uploads/2022/01/skin-undertones-1024x536.jpg"
                        alt="Undertone"
                        className="w-8/12 "
                    />
                </div>
            </section><br /><br /><br /><br />

            {/* Step 2 */}
            <section id="2" className="relative h-auto bg-cover bg-center py-20 grid place-items-center"
                style={{
                    backgroundImage: "url('https://www.glam.com/img/gallery/why-your-skin-undertones-matter-and-how-to-figure-it-out/how-do-i-find-my-undertone-1663344935.webp')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                <div className="relative text-center">
                    <h1 className="text-4xl font-serif  font-bold text-white">Step 1: Basic Undertone</h1>
                    <p className="mt-4 text-lg text-white text-center">
                        วิธีทดสอบ Personal Color เบื้องต้นแบบง่ายๆ เริ่มจากการหา Under Tone ของสีผิวจาก 3 วิธี
                    </p>

                    {/* Images and Texts in Equal-Width Columns */}
                    <div className="mt-10 flex justify-evenly items-start w-full max-w-screen-xl space-x-4 text-white">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center w-2/6">
                            <img
                                src="https://media.atime.live/editor/content/bab05b25-725e-4cf9-a8fe-c05907518046.png"
                                alt="vein"
                                className="w-full h-full rounded-lg shadow-md"
                            />
                            <p className="text-lg text-center mt-4">
                                ดูสีเส้นเลือดที่ข้อมือ <br />
                                สีม่วงหรือสีน้ำเงิน 💜💙 : Cool Tone <br />
                                สีเขียว 💚 : Warm Tone<br />
                                ทั้งสีเขียวและสีน้ำเงิน 💚💙 : Neutral Tone<br />
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col items-center w-2/6">
                            <img
                                src="https://media.atime.live/editor/content/178ca9ef-573c-4280-a761-96edf50131fc.png"
                                alt="sun-exposure"
                                className="w-full h-full rounded-lg shadow-md"
                            />
                            <p className="text-lg text-center mt-4">
                                เช็กสีผิวหลังโดนแดด <br />
                                โดนแดดแล้วผิวแดง ❤️ : Cool Tone<br />
                                โดนแดดแล้วผิวคล้ำ 🤎 : Warm Tone<br />
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col items-center w-2/6">
                            <img
                                src="https://media.atime.live/editor/content/ebe2d8f5-d966-4221-b057-95979d2464ba.png"
                                alt="jewery"
                                className="w-full h-full rounded-lg shadow-md"
                            />
                            <p className="text-lg text-center mt-4">
                                เทียบสีเครื่องประดับ <br />
                                ใส่สีเงินแล้วดูผ่อง 🤍  : Cool Tone<br />
                                ใส่สีทองแล้วดูผ่อง 💛 : Warm Tone<br />
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => scrollToSection('step2')}
                        className=" mt-6 bg-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-pink-400 transition-all"
                    >
                        Next Step
                    </button>
                </div>
            </section>

            {/* Step 3 */}
            <section id="3" className="h-auto grid place-items-center text-center mt-20" alt="step2">
                <h1 className="text-4xl font-serif font-bold h-auto grid place-items-center"> Step 2 Undertone Analysis </h1><br />
                <p className="text-lg"> หากคุณยังไม่แน่ใจสี Undertone เราจะประมวลผลให้ เพียงคุณอัปโหลดรูปภาพ </p>
                <p> รูปหน้าตรง หน้าสด ถ่ายภายใต้แสงไฟสีขาวหรือแสงธรรมชาติ พื้นหลังสีขาว</p>

                <div className="h-auto grid place-items-center"><br />
                    <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                        <div
                            style={{
                                padding: "10px 20px",
                                background: "linear-gradient(135deg, #ff7eb3, #ff758c)",
                                color: "#fff",
                                borderRadius: "25px",
                                fontWeight: "bold",
                                fontSize: "16px",
                                display: "inline-block",
                                textAlign: "center",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0px 4px 10px rgba(255, 117, 140, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            Upload Image
                        </div>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                    <br/>
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />}
                </div>

                {/* Display Undertone Result */}
                {undertone && <p>Your undertone is: {undertone}</p>}

                {/* Display Example Videos */}
                {undertone && videos[undertone] && (

                    <div className="mt-8">
                        {/* Text and Image */}
                        <div className="mb-6 text-center">
                            <p className="text-2xl font-semibold">{toneText[undertone]}</p>
                            {toneImages[undertone] && (
                                <img
                                    src={toneImages[undertone]}
                                    alt={undertone}
                                    className="w-48 h-48 mx-auto mt-4 "
                                />
                            )}
                        </div>

                        <h3 className="my_space text-left">วิดีโอแนะนำการแต่งหน้า</h3>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            {videos[undertone].map((video, index) => (
                                <iframe
                                    key={index}
                                    src={video}
                                    title={`Video ${index + 1}`}
                                    style={{ width: "220px", height: "150px", border: "none" }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ))}
                        </div>
                        <ul className=" my_space  text-right text-black">
                            <Link href="/Makeuptutorials">ดูเพิ่มเติม</Link>
                        </ul>
                    </div>
                )}

                {/* Hidden Canvas for Image Analysis */}
                <canvas ref={canvasRef} style={{ display: "none" }} />

            </section>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />

            <section alt="conclusion">
                <div className="px-20 grid place-items-center">
                    <p className="px-40 text-lg">ทดสอบ Personal Color ได้สีที่ใช่กันไปเรียบร้อยแล้วหวังว่าทุกคนจะเอาไปแมตช์สีเสื้อผ้า เครื่องประดับ เครื่องสำอาง หรือสีผมได้หมดทุกสิ่งอย่างเพื่อสร้างสรรค์ลุคที่สวยขับผิวเปล่งออร่าให้ความมั่นใจมาเต็ม จะแต่งลุคไหนก็เกิดแน่นอน!</p><br />
                    <p className="px-40 text-lg">ทั้งนี้ทั้งนั้นก็ไม่อยากให้หลายๆคน ยึดติดในสีประจำตัวมากเกินไป แต่นำหลักการไปปรับให้เข้ากับตัวเองโดยการสังเกตสีที่ตัวเองใส่แล้วรอด จะได้สนุกกับการแต่งตัวและได้ลุคที่ดึงเสน่ห์ของเราออกมาได้ด้วย</p>
                </div>
            </section>

            <br /><br /><br /><br />

        </main>
    );
}

export default Undertone;



