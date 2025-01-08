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
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);

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
        "Warm Tone": "คุณเหมาะกับเครื่องประดับสีทอง ใส่แล้วดูเป็นประกายวิ้งๆ สีเสื้อผ้าที่ใส่แล้วขึ้นคือ ส้ม เขียวใบไม้ เขียวอมฟ้า เหลือง น้ำตาล สีเอิร์ทโทน หรือสีอื่นๆ ที่ออกโทนเหลือง บางคนจะใส่สีขาวไม่ค่อยขึ้น บางคนจะไม่ เหมาะกับสีชมพู หรือฟ้า แต่ก็ไม่ได้หมายความว่าไม่ควรใส่นะคะ แล้วแต่สไตล์ สีผม สีผิวหน้าด้วย บางคนใส่สี ชมพูหรือฟ้าได้สวยทีเดียว รองพื้นหรือแป้งเหมาะกับสีออกโทนพีชหรือเหลือง",
        "Cool Tone": "คุณเหมาะกับเครื่องประดับเงิน ทองคำขาวและแพลทตินัม ใส่แล้วจะดูมีออร่า สีเสื้อผ้าที่ใส่แล้วขึ้นคือ ชมพู ฟ้า น้ำเงิน เขียว ม่วง ขาว ดำ ดูดีกับเสื้อผ้าสีสว่างๆ หรือสีสดใส รองพื้นหรือแป้งเหมาะกับสีออกโทนชมพู",
        "Neutral Tone": "คุณเป็นคนพิเศษ เพราะน้อยคนนักที่จะมี Undertone สีนี้และจะดูดีกับเสื้อผ้าแทบทุกสีเลย เครื่องประดับก็สามารถใส่ได้หมด",
    };

    const toneImages = {
        "Warm Tone": "https://i.postimg.cc/NFM8Gcf9/warmtone.jpg",
        "Cool Tone": "https://i.postimg.cc/d3yRpKs8/cooltone.jpg",
        "Neutral Tone": "https://i.postimg.cc/jSsNQf76/neutarltone.jpg",
    };

    useEffect(() => {
        // Load face detection models
        const loadModels = async () => {
            await faceapi.loadTinyFaceDetectorModel('/models');
        };
        loadModels();
    }, []);

    // Handle image upload and undertone analysis
    const handleImageUpload = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target.result);
                analyzeImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) handleImageUpload(file);
    };



    // Analyze the uploaded image and determine undertone
    const analyzeImage = (imageSrc) => {
        setLoading(true); // Start loading spinner
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
                setLoading(false); // Stop loading spinner
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
            const warmTones = ["#ecc9ab", "#ac7437", "#d6aa7b", "#562c08", "#fcf2e8", "#c48b62", "#f3d4bf", "#b17b55", "#dabc9a", "#8f5c47", "#d4b191", "#6f4433", "#d5ac81", "#523726", "#c69d72", "#3a2810", "#ebc9aa", "#eed4b5", "#d7ba92", "#dfac96", "#aa7536", "#d2ab79", "#935f3e", "#623410", "#522a06", "#422307"];
            const coolTones = ["#fcecef", "#ffe1f0", "#dab8b7", "#63392d", "#340c0c", "#ffe4e7", "#e2c6c1", "#c29081", "#d9bab8", "#623930", "#462220", "#2c1313"];

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

            setLoading(false); // Stop loading spinner
        };

        image.src = imageSrc;
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const resetUpload = () => {
        setUploadedImage(null);
        setUndertone(null);
        setLoading(false);
    };

    return (
        <main className={`${prompt.variable} ${nunito.variable} font-sans`}>

            {/* Navigation Buttons */}
            <section className="fixed bottom-80 left-5 z-50 flex flex-col gap-2 items-start">
                {[
                    {
                        id: '1',
                        label: 'Introduction of Undertone',
                        color: 'bg-yellow-400/70 hover:bg-yellow-500',
                    },
                    {
                        id: '2',
                        label: 'Basic to know your Undertone',
                        color: 'bg-violet-800/70 hover:bg-violet-900',
                    },
                    {
                        id: '3',
                        label: 'Analyze your Undertone',
                        color: 'bg-pink-700/70 hover:bg-pink-800',
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



            <section className="picture-personal bg-[url('https://media.glamourmagazine.co.uk/photos/64ba688967c0e099ae2e9782/16:9/w_2240,c_limit/UNDERTONES%20210723%20%20GettyImages-1483844655_L.jpg')]" alt="header">
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
                    <div className=" w-full h-4/6 flex justify-center items-center text-white text-4xl">
                        <h1>UNDERTONE ANALYSIS</h1>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section
                id="1"
                className="relative h-auto bg-[#FFEEF4] py-10 flex justify-center items-center"
            >
                <div className="bg-white shadow-lg rounded-lg p-10 max-w-5xl text-center">
                    <h2 className="text-4xl font-serif font-extrabold  mb-5 text-amber-950">
                        Undertone
                    </h2>
                    <p className="text-lg mb-3 leading-8 text-amber-950">
                        คือโทนสีผิวจริงที่ปรากฏใต้พื้นผิวหนัง โดยจะแสดงสีผิวจากเม็ดสีเมลานินที่อยู่ใต้ชั้นผิว ซึ่งส่งผลต่อเฉดสีผิวโดยรวม <br />
                        แตกต่างจาก Skin Tone ที่เป็นสีผิวที่มองเห็นจากภายนอก สามารถเปลี่ยนแปลงได้อยู่ตลอดเวลา
                    </p>
                    <p className="text-lg mb-4 leading-8 text-pink-600">
                        *ที่สำคัญ* หากรู้ Undertone เราจะสามารถ รู้ Personal color แบบเบื้องต้นได้! <br />
                    </p>
                    <p className="text-lg leading-8 text-amber-950">
                        สีผิว Undertone จะแบ่งออกเป็น 2 กลุ่มใหญ่ๆด้วยกัน คือ <br/>
                        <span className="block mt-1">
                            <span className="font-bold text-red-700">Warm Tone☀️ </span>: สีโทนอุ่น
                            โดยคนที่มี Undertone เป็นสีโทนอุ่นมักจะเป็นคนที่มีสีผิวออกเหลือง ทอง และพีช
                        </span>
                        <span className="block mt-1">
                            <span className="font-bold text-blue-700">Cool Tone🧊 </span>: สีโทนเย็น
                            โดยคนที่มี Undertone เป็นสีโทนเย็นมักจะเป็นคนที่มีสีผิวออกชมพูและฟ้า
                        </span>
                    </p>
                    <div className="mt-6">
                        <img
                            className="mx-auto"
                            src="https://qph.cf2.quoracdn.net/main-qimg-b92d74ec71aa796c1f96bd12ba681776-lq"
                            alt="Undertone explanation"
                        />
                    </div><br/>
                    {/* Next Button */}
                    <button
                        onClick={() => scrollToSection('2')}
                        className=" mt-6 bg-[#E966A0] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#FF90BB] transition-all"
                    >
                        Click เพื่อสำรวจ Undertone ด้วยตนเอง
                    </button>
                </div>
            </section>



            {/* Step 2 */}
            <section id="2" className="relative h-auto bg-[#231903] bg-cover bg-center grid place-items-center"
            /* style={{
                 backgroundImage: "url('https://www.glam.com/img/gallery/why-your-skin-undertones-matter-and-how-to-figure-it-out/how-do-i-find-my-undertone-1663344935.webp')",
             }} */
            >
                {/*<div className="absolute inset-0 bg-black opacity-65 z-0"></div>*/}
                <br /><br />
                <div className="relative text-center ">
                    <h1 className="text-4xl font-serif  font-extrabold text-yellow-400">Basic Undertone</h1>
                    <p className="mt-3 text-lg text-yellow-50 text-center">
                        วิธีทดสอบ Personal Color เบื้องต้นแบบง่ายๆ เริ่มจากการหา Under Tone ของสีผิวจาก 3 วิธี
                    </p>

                    {/* Images and Texts in Equal-Width Columns */}
                    <div className="mt-7 text-yellow-50 flex justify-evenly items-start w-full max-w-screen-xl space-x-4 text-white">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center w-2/6">
                            <img
                                src="https://media.atime.live/editor/content/bab05b25-725e-4cf9-a8fe-c05907518046.png"
                                alt="vein"
                                className="w-full h-full rounded-lg shadow-md"
                            />
                            <p className="text-lg text-center mt-4">
                                <span className="text-xl text-yellow-400">ดูสีเส้นเลือดที่ข้อมือ </span> <br />
                                สีม่วงหรือสีน้ำเงิน : Cool Tone <br />
                                สีเขียว : Warm Tone<br />
                                ทั้งสีเขียวและสีน้ำเงิน : Neutral Tone<br />
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
                                <span className="text-xl text-yellow-400">เช็กสีผิวหลังโดนแดด </span> <br />
                                โดนแดดแล้วผิวแดง : Cool Tone<br />
                                โดนแดดแล้วผิวคล้ำ : Warm Tone<br />
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
                                <span className="text-xl text-yellow-400">เทียบสีเครื่องประดับ </span> <br />
                                ใส่สีเงินแล้วดูผ่อง  : Cool Tone<br />
                                ใส่สีทองแล้วดูผ่อง : Warm Tone<br />
                            </p>
                        </div>
                    </div><br />

                    {/* Next Button */}
                    <button
                        onClick={() => scrollToSection('3')}
                        className=" mt-6 bg-lime-700 text-white px-6 py-2 rounded-full shadow-lg hover:bg-lime-600 transition-all"
                    >
                        Click เพื่อให้ระบบประมวณผล Undertone ให้
                    </button>
                </div><br/><br/><br/>
            </section>

            {/* Step 3 */}
            <section id="3" className="bg-[#FAF7F0] h-auto grid place-items-center text-center ">
            
                <div className="text-yellow-950 mt-20 ">
                <div className="bg-white shadow-lg rounded-lg px-20 pt-10 pb-20 max-w-5xl grid place-items-center text-center ">
                    <h1 className="text-4xl font-serif font-extrabold  h-auto grid place-items-center">Undertone Analysis </h1><br />
                    <p className="text-xl"> หากคุณยังไม่แน่ใจสี Undertone ลองให้เราประมวลผลให้สิ เพียงคุณอัปโหลดรูปภาพ </p>
                    <div className="text-left">
                        <p className="text-lg text-[#8d6e63]" >
                            - ภาพถ่ายหน้าตรง เห็นใบหน้าชัดเจน 
                            - ถ่ายภายใต้แสงไฟสีขาวหรือแสงธรรมชาติ 
                            - พื้นหลังสีขาวหรือดำเท่านั้น<br/>
                           - ระยะห่างระหว่างใบหน้ากับกล้อง 30-50 cm
                           - ไฟล์รูป JPEG หรือ PNG ขนาดไม่เกิน 4 MB
                            </p>
                    </div>

                    {/* Drag-and-Drop or Upload Section */}
                    <div
                        className={`relative border-4 border-dashed ${dragging ? 'border-pink-500 bg-pink-100' : 'border-pink-300 bg-pink-50'
                            } rounded-lg p-6 w-80 h-60 flex flex-col items-center justify-center text-center mt-6`}
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                    >
                        {!uploadedImage && !loading && (
                            <p className="text-pink-600 text-sm mb-2">
                                Drag and drop your image here
                            </p>
                        )}
                        {!uploadedImage && (
                            <label
                                htmlFor="image-upload"
                                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 px-5 rounded-full shadow-lg hover:from-pink-500 hover:to-pink-600 hover:shadow-xl transition-all duration-300 cursor-pointer font-bold"
                            >
                                🌸 Upload Image 🌸
                            </label>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                            style={{ display: 'none' }}
                        />
                        {uploadedImage && (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="absolute w-full h-full object-cover rounded-lg"
                            />
                        )}
                        {loading && (
                            <div className="mt-4 flex justify-center items-center">
                                <svg
                                    className="animate-spin h-6 w-6 text-pink-500"
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
                            </div>
                        )}
                    </div>


                    {/* Display Undertone Result */}
                    {undertone && (

                        <div className="">
                            <button
                                className="mt-2 bg-pink-500 text-white py-2 px-5 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 cursor-pointer font-bold"
                                onClick={resetUpload}
                            >
                                🌸 Upload Another Image 🌸
                            </button>
                            <p className="mt-8 text-3xl text-pink-700 font-bold">
                                 Undertone : {undertone}
                            </p>

                        </div>
                    )}
                    {/* Display Example Videos */}
                    {undertone && videos[undertone] && (

                        <div className="mt-2 ">
                            {/* Text and Image */}
                            <div className="mb-2 text-center">
                                <p className="text-xl text-[#8d6e63] mx-20 ">{toneText[undertone]}</p>
                                {toneImages[undertone] && (
                                    <img
                                        src={toneImages[undertone]}
                                        alt={undertone}
                                        className="w-6/12 mx-auto shadow-lg rounded-lg mt-4 "
                                    />
                                )}
                            </div>

                            <h3 className="text-xl font-medium text-[#6d4c41] text-center mt-10">
                            วิดีโอแนะนำการแต่งหน้า
                        </h3>
                        
                         <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                {videos[undertone].map((video, index) => (
                                    <iframe
                                        key={index}
                                        src={video}
                                        title={`Video ${index + 1}`}
                                        className="mt-3 w-[220px] h-[150px] rounded-lg shadow-md border-none"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ))}
                            </div>
                            <ul className="text-right mt-4">
                            <Link
                                href="/Makeuptutorials"
                                className="text-lg text-[#6d4c41] hover:text-[#8d6e63] mx-20 underline"
                            >
                                ดูเพิ่มเติม
                            </Link>
                        </ul>
                        </div>
                    )}

                    {/* Hidden Canvas for Image Analysis */}
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                </div><br/><br/><br/><br/>
                </div>
            </section>

            <section alt="conclusion" className="bg-[#FAF7F0] px-20 grid place-items-center">
    <p className="px-40 text-lg text-[#4A2E16]">
        รู้จัก Undertone ของตัวเองกันไปแล้ว ทีนี้คุนก็ได้รู้ Personal Color แบบเบื้องต้นกันไปแล้ว แต่ Personal Color
        แบ่งแยกลึกลงไปอีกถึง 4 ฤดู ถ้าอยากรู้ว่าแต่ละฤดูเป็นยังไงและตัวเองอยู่ในฤดูอะไร ไปทำการทดสอบกันเลย
    </p>
    <br />
    <button className="mb-10 bg-[#8B5742] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#A06B57] transition-all">
        <Link href="/Personalcolor">Let's analyze your Personal color</Link>
    </button>
    <p className="px-40 text-lg text-[#5A3825]">
        หลังจากรู้ Undertone แล้วคุณสามารถรู้เฉดรองพื้นจากระบบของเรา ที่สามารถหาเฉด skin tone ของคุณเพื่อให้เจอเฉดรองพื้นที่เหมาะสมกับคุณมากที่สุด ไปทำการทดสอบกันเลย
    </p>
    <button className="mt-6 bg-[#472D2D] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#704F4F] transition-all">
        <Link href="/Skintone">Let's analyze your Skin tone</Link>
    </button>
    <br/><br/><br/>
</section>

            

        </main>
    );
}

export default Undertone;



