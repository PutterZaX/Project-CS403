"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import * as faceapi from "face-api.js";
import Link from "next/link";

function Personalcolor() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [undertone, setUndertone] = useState("");

    // Example videos for each undertone
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

    useEffect(() => {
        // Load face detection models
        const loadModels = async () => {
            await faceapi.loadTinyFaceDetectorModel('/models');
        };
        loadModels();
    }, []);

    const getUserCamera = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getUserCamera();
    }, []);

    const darkenColor = (color, amount) => {
        if (!/^#[0-9A-F]{6}$/i.test(color)) return color;
        let colorValue = parseInt(color.slice(1), 16);
        let r = (colorValue >> 16) - amount;
        let g = ((colorValue >> 8) & 0x00FF) - amount;
        let b = (colorValue & 0x0000FF) - amount;

        r = Math.max(0, r);
        g = Math.max(0, g);
        b = Math.max(0, b);

        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    };

    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [likedColors, setLikedColors] = useState({});
    const colorPalettes = useMemo(() => ({
        Spring: ['#FE9A01', '#FE804D', '#FE592A', '#F91D41', '#29AAAE', '#870EC6', '#B0DF72', '#8ECE76', '#68BD65', '#B4E1ED', '#67C3B9', '#42B199', '#EE677B', '#EC89B8', '#F0E2E5', '#F3EED2', '#F1ED8A', '#F2EC11', '#F74491', '#DBCC98', '#DAB345', '#C0AC6F', '#4D1A04', '#0B286E'],
        Autumn: ['#412A0B', '#5A350B', '#FA7D77', '#FFF2DF', '#D9D9C9', '#CBBC91', '#BF8840', '#735F0F', '#757F4E', '#4D5F2B', '#253F12', '#358125', '#0E3F1A', '#34001B', '#591B19', '#CCA107', '#CB800F', '#CC5205', '#C01700', '#F8554E', '#019376', '#80AFA4', '#013133', '#690B9D'],
        Summer: ['#F95C94', '#B3D6EA', '#9AC4DD', '#8E8CC3', '#8B55A5', '#CCBEDC', '#F1D7E9', '#EDA4D1', '#76A4CD', '#5284BC', '#5360A9', '#6A47A3', '#DBF1F7', '#B5E1CC', '#80CEBD', '#EA437F', '#E6E6AB', '#BDA1A6', '#A5BBBB', '#80A38E', '#7E8593', '#806F5C', '#805043', '#703738'],
        Winter: ['#051436', '#0B286E', '#76C1DC', '#F2FAFE', '#F2FFAD', '#BEC5DE', '#2398DB', '#0000FD', '#29017C', '#870EC6', '#FEF100', '#0C8732', '#0E916B', '#005322', '#77003A', '#780D6E', '#CF0140', '#FF00FE', '#D69FCD', '#B1AAD3', '#CCCCCC', '#808080', '#4C4C4C', '#030217'],
    }), []);


    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    // Map season names to their tones
    const seasonToneMap = {
        Spring: "Warm Tone",
        Autumn: "Warm Tone",
        Summer: "Cool Tone",
        Winter: "Cool Tone"
    };

    const toggleHeart = (color) => {
        setLikedColors((prevLikedColors) => ({
            ...prevLikedColors,
            [color]: !prevLikedColors[color],
        }));
    };

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


    const topics = [
        {
            title: "🍃Spring🍃",
            paragraph: "Warm Tone ที่มีความอ่อน จะเป็นโทนสีแนวสดใส ดอกไม้ผลิ ที่มีความน่ารัก หรือป๊อป สดใส สว่าง สว่างสดใส ให้ลุคที่น่ารักและร่าเริง",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_04.jpg",
            videos: [
                "https://www.youtube.com/embed/g8Mjj0w0C1k",
                "https://www.youtube.com/embed/7hCUu0rtkKA",
                "https://www.youtube.com/embed/OgMmEP7K5jc",
            ],
        },
        {
            title: "🍂Autumn🍂",
            paragraph: "Warm Tone ที่มีความเข้ม จะเป็นโทนสีแนวตุ่นๆ หม่นๆ ดูเป็นธรรมชาติ ดูชิค และ หรูหรา แนวเอิร์ธโทน ให้ลุคที่เป็นธรรมชาติและดูสุขุมนุ่มลึก",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_06.jpg",
            videos: [
                "https://www.youtube.com/embed/g8Mjj0w0C1k",
                "https://www.youtube.com/embed/7hCUu0rtkKA",
                "https://www.youtube.com/embed/OgMmEP7K5jc",
            ],
        },
        {
            title: "☀️Summer☀️",
            paragraph: "Cool Tone ที่มีความอ่อน จะเป็นโทนสีแนว pastel ละมุ่น หวาน โรแมนติก สง่างาม แนวพาสเทล ให้ลุคที่ดูอ่อนโยนและน่าทะนุถนอม",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_05.jpg",
            videos: [
                "https://www.youtube.com/embed/g8Mjj0w0C1k",
                "https://www.youtube.com/embed/7hCUu0rtkKA",
                "https://www.youtube.com/embed/OgMmEP7K5jc",
            ],
        },
        {
            title: "❄️Winter❄️",
            paragraph: "สีโทนเย็นที่มีความเข้ม จะเป็นโทนสีเข้ม ๆ contrastจัด ๆ สีสด ๆ สีแบบแม่สี สีค่อนข้างสด ให้ลุคที่คมเข้มและดูเท่",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_07-01.jpg",
            videos: [
                "https://www.youtube.com/embed/g8Mjj0w0C1k",
                "https://www.youtube.com/embed/7hCUu0rtkKA",
                "https://www.youtube.com/embed/OgMmEP7K5jc",
            ],
        },
    ];

    const [currentTopic, setCurrentTopic] = useState(topics[0]);

    return (
        <main>
            <section className="picture-personal bg-[url('https://cdn.prod.website-files.com/649174dcab676e52a64ce81a/6492a007773c4bf34455f75e_image-36.jpeg')]">
                <div className="h-2/6 flex">
                    <div className="w-2/5 flex justify-center items-center text-white text-4xl">
                        <h1>TellTone</h1>
                    </div>
                    <ul className="w-full gap-8 flex justify-center items-center text-white">
                        <Link href="/">Home</Link>
                        <Link href="/Skintone">Skin tone</Link>
                        <Link href="/Personalcolor">Personal color</Link>
                        <Link href="/Makeuptutorials">Makeup tutorials</Link>
                        <Link href="/Makeuptools">Makeup tools</Link>
                        <Link href="/Skincare">Skincare</Link>
                    </ul>
                </div>
                <div className="h-2/6">
                    <div className="w-full h-4/6 flex justify-center items-center text-white text-4xl">
                        <h1>PERSONAL COLOR ANALYSIS</h1>
                    </div>
                </div>
            </section>
            <br /> <br />


            <section className="h-auto grid place-items-center">
                <div className="pt-10 w-4/5">
                    <h1 className="my_space text-2xl font-bold text-center">Personal Color</h1>
                    <br />
                    <p className="text-lg">Personal Color คือสีประจำตัวที่มีความเหมาะสมกับโทนสีผิวของเรา ซึ่งถ้ามีสีนี้อยู่บนตัวจะขับผิวให้ดูเปล่งปลั่ง มีออร่าโดดเด่นและเปล่งประกาย ช่วยเสริมสร้างความมั่นใจ และทำให้ดูอ่อนเยาว์มากขึ้น ในทางตรงกันข้าม หากเลือกสีที่ไม่เหมาะกับตัวเองก็จะทำให้หน้าดูหมอง ริ้วรอยบนหน้าดูชัดขึ้นได้ โดย Personal Color นี้สามารถนำมาใช้เป็นสีเสื้อผ้า เครื่องประดับ เครื่องสำอาง สีผม หรืออะไรก็ตามที่อยู่ใกล้กับผิวของเรามากที่สุด</p>
                    <br />
                    <p className="text-lg">ตามหลักการแล้ว Personal Color จะแบ่งออกเป็น 2 ประเภทอย่างหลวมๆ ก็คือ Warm Tone (สีโทนอุ่น)  และ Cool Tone (สีโทนเย็น) โดยแบ่งลงไปอีกเป็น 2 กลุ่มย่อยในแต่ละประเภท นั่นก็คือ Autumn และ Spring อยู่ในหมวด Warm Tone , Summer และ  Winter  อยู่ในหมวดสี Cool Tone ทั้ง 4 กลุ่มย่อยถูกแบ่งด้วยความเข้มและสว่างของเฉดสีอีกที</p>
                    <br /><br />
                    <div className=" grid place-items-center">
                        <img src="https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_01.jpg" alt="personalcolor"></img>
                    </div>
                    <br /> <br /> <br /> <br /> <br />

                    <section className="h-auto grid place-items-center">
                        <div className="pt-10 w-full text-center">
                            <h1 className="my_space text-2xl font-bold">4 Steps การดู Personal color</h1>
                            <br /> <br /> <br />
                            <img src="https://i.postimg.cc/HsXCVMmX/4step.png" alt="4 Steps Personal Color Guide"></img>
                            <br /><br /> <br /> <br /> <br /> <br /> <br />
                        </div>
                    </section>

                    <h1 className="my_space text-2xl font-bold h-auto grid place-items-center" > Step 1 Basic Under Tone</h1>
                    <p className="text-center text-lg"> วิธีทดสอบ Personal Color เบื้องต้นแบบง่ายๆ เริ่มจากขั้นตอนแรกการหา Under Tone ของสีผิวจาก 4 วิธีต่อไปนี้</p>
                    <br />
                    <p className="text-lg">1.เป็นวิธีที่นิยมกันมากที่สุดคือ ดูสีเส้นเลือดที่ข้อมือ <br /> เส้นเลือดออกสีเขียว คือ Warm Tone <br /> เส้นเลือดออกสีม่วง คือ Cool Tone <br /> เส้นเลือดออกทั้งสีเขียวและสีน้ำเงิน คือ สีผิวแบบกลาง (ให้ลองเทียบดูว่าเราเหมาะกับสีแบบไหนมากกว่ากัน)</p>
                    <br />
                    <p className="text-lg">2.เช็กสีผิวหลังโดนแดด <br /> โดนแดดแล้วผิวคล้ำ คือ Warm Tone <br /> โดนแดดแล้วผิวเป็นสีแดง คือ Cool Tone  </p>
                    <br />
                    <p className="text-lg">3.สีผม / ตา <br /> ได้สังเกตจากสีผมธรรมชาติของเราบริเวณโคนผม <br />  หากสีผมและตาเป็นโทนออกน้ำตาล หรือว่าเวลาโดนแดดแล้วเป็นประกายออกแดงๆ แสดงว่า เป็น Warm Tone <br />  หากสีผมและตาเป็นโทนสีดำ แสดงว่า เป็น Cool Tone </p>
                    <br />
                    <p className="text-lg">4.เทียบสีเครื่องประดับทอง vs เงิน <br /> ใส่เครื่องประดับทองแล้วดูผ่อง คือ Warm Tone <br /> ใส่เครื่องประดับเงินแล้วดูผ่อง คือ Cool Tone </p>
                </div>
            </section><br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />



            <section className="h-auto grid place-items-center text-center">
                <h1 className="my_space text-2xl font-bold h-auto grid place-items-center"> Step 2 Under Tone Analysis </h1>
                <p className="text-lg"> หากคุณยังไม่แน่ใจสี Under Tone เราจะประมวลผลให้ เพียงคุณอัปโหลดรูปภาพ </p>
                <p> รูปหน้าตรง หน้าสด ถ่ายภายใต้แสงไฟสีขาวหรือแสงธรรมชาติ พื้นหลังสีขาว</p>
                <div className="h-auto grid place-items-center"><br />
                    <input type="file" accept="image/*" onChange={handleImageUpload} /><br />
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: '200px', marginTop: '10px' }} />}
                </div>
                <br />
                {/* Display Undertone Result */}
                {undertone && <p>Your undertone is: {undertone}</p>}

                {/* Display Example Videos */}
                {undertone && videos[undertone] && (
                    <div>
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
            <br /><br /><br /><br /> <br /> <br /> <br />

            <div className="grid place-items-center">
                <h1 className="my_space text-2xl font-bold h-auto" > Step 3 Personal Color Analysis</h1>
                <p className="text-lg"> ซึ่งหลังจากที่เราเช็ก Undertone ของสีผิวทั้ง 4 ข้อเรียบร้อยแล้ว เราก็จะสามารถดูได้เลยว่าโทนผิวของเราจะสามารถอยู่ในฤดูไหนบ้าง </p><br />
                <p className="px-40 text-lg text-center"> วิธีการทดสอบ : กดแผ่นสีเพื่อลองเทียบกับใบหน้า หากใบหน้าดูสว่างขึ้น หรือส่งเสริมให้เราดูดี ให้คลิกที่สีนั้น2ครั้งเพื่อกดถูกใจ ถ้าหัวใจที่ฤดูไหนเยอะที่สุดสีในฤดูนั้นจะเป็นสี Personal ของคุณ ระหว่างทำการทดสอบ ต้องหน้าสด ใช้แสงไฟสีขาวหรือแสงธรรมชาติ พื้นหลังสีขาว </p>
            </div>
            <br /><br />

            <section className="flex justify-center items-center">

                <div className="relative w-3/5"> {/* Adjust width here to control overall container size */}
                    {/* Camera Feed */}
                    <div className="camera w-full h-full">
                        <video
                            className="camera w-full h-full"
                            ref={videoRef}
                            style={{ width: '90%', height: '100%' }} // Ensures video fills container
                        ></video>
                    </div>

                    {/* Trapezoid Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '90%',
                            left: '45%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            height: '20%',
                            clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)', // Creates a trapezoid shape
                            backgroundColor: selectedColor,
                            transition: 'background-color 0.3s ease',
                            borderRadius: '',
                        }}
                    />
                </div>

                {/* Color Palette on the Right */}
                <div className="ml-10">
                    {Object.keys(colorPalettes).map((season) => (

                        <div key={season} style={{ marginBottom: '20px' }}>
                            {/* Season with tone text */}
                            <h4 style={{ marginBottom: '7px' }}>{`${season} ( ${seasonToneMap[season]} )`}</h4>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                                maxWidth: '300px', // Adjust to control the number of colors per line
                            }}>
                                {colorPalettes[season].map((color) => (
                                    <div
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        onDoubleClick={() => toggleHeart(color)}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: color,
                                            cursor: 'pointer',
                                            position: 'relative',
                                            border: selectedColor === color ? `3px solid ${darkenColor(color, 30)}` : '',
                                            borderRadius: '50%',
                                            transition: 'transform 0.2s ease, border 0.2s ease',
                                            transform: selectedColor === color ? 'scale(1.2)' : 'scale(1)',
                                        }}
                                    >
                                        {/* Red Heart Icon */}
                                        {likedColors[color] && (
                                            <span style={{
                                                position: 'absolute',
                                                top: '1px',
                                                right: '0px',
                                                color: 'red',
                                                fontSize: '12px',
                                                lineHeight: '1',
                                            }}>❤️</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </section>
            <br /><br /><br /><br /><br /><br /><br /><br />

            <section className="h-auto grid place-items-center">

                <h1 className="my_space text-2xl font-bold h-auto grid place-items-center" > Step 4 Result & Recommendation</h1>
                <p className="text-lg"> มาดูผลลัพธ์และคำแนะนำของแต่ละฤดูกัน </p>
            </section><br/>

            <div style={{ textAlign: "center" }}>
                {/* Topic Titles */}
                <div style={{ display: "flex", justifyContent: "center", gap: "", marginBottom: "20px" }}>
                    {topics.map((topic, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentTopic(topic)}
                            style={{
                                padding: "10px 90px",
                                backgroundColor: "",
                                border: "",
                                cursor: "pointer",
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}
                        >
                            {topic.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Displayed Content */}

            <div className="h-auto grid place-items-center">
                <h2 className="text-xl font-bold">{currentTopic.title}</h2>
                <p className="my_space text-lg">{currentTopic.paragraph}</p>
                <img src={currentTopic.image} alt={currentTopic.title} style={{ maxWidth: "50%" }} />
                <div>
                    <h3 className="my_space ">วิดีโอแนะนำการแต่งหน้า</h3>
                    <div className="flex justify-center gap-8">
                        {currentTopic.videos.map((video, index) => (
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
            </div>

            <br /><br /><br />

            <div className="px-20 grid place-items-center">
                <p className="px-40 text-lg">ทดสอบ Personal Color ได้สีที่ใช่กันไปเรียบร้อยแล้วหวังว่าทุกคนจะเอาไปแมตช์สีเสื้อผ้า เครื่องประดับ เครื่องสำอาง หรือสีผมได้หมดทุกสิ่งอย่างเพื่อสร้างสรรค์ลุคที่สวยขับผิวเปล่งออร่าให้ความมั่นใจมาเต็ม จะแต่งลุคไหนก็เกิดแน่นอน!</p><br />
                <p className="px-40 text-lg">ทั้งนี้ทั้งนั้นก็ไม่อยากให้หลายๆคน ยึดติดในสีประจำตัวมากเกินไป แต่นำหลักการไปปรับให้เข้ากับตัวเองโดยการสังเกตสีที่ตัวเองใส่แล้วรอด จะได้สนุกกับการแต่งตัวและได้ลุคที่ดึงเสน่ห์ของเราออกมาได้ด้วย</p>
            </div>



            <br /><br /><br /><br />


        </main>
    );
}

export default Personalcolor;
