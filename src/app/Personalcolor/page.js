"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Prompt, Nunito } from 'next/font/google';
const prompt = Prompt({ subsets: ['thai'], weight: ['400', '700'], variable: '--font-prompt' });
const nunito = Nunito({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-nunito' });

function Personalcolor() {
    const videoRef = useRef(null);


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


    const topics = [
        {
            title: "🌸 Spring 🌸",
            paragraph: "Warm Tone ที่มีความอ่อน จะเป็นโทนสีแนวสดใส ดอกไม้ผลิ ที่มีความน่ารัก หรือป๊อป สดใส สว่าง สว่างสดใส ให้ลุคที่น่ารักและร่าเริง",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_04.jpg",
            videos: [
                "https://www.youtube.com/embed/g8Mjj0w0C1k",
                "https://www.youtube.com/embed/7hCUu0rtkKA",
                "https://www.youtube.com/embed/OgMmEP7K5jc",
            ],
        },
        {
            title: "🍂 Autumn 🍂",
            paragraph: "Warm Tone ที่มีความเข้ม จะเป็นโทนสีแนวตุ่นๆ หม่นๆ ดูเป็นธรรมชาติ ดูชิค และ หรูหรา แนวเอิร์ธโทน ให้ลุคที่เป็นธรรมชาติและดูสุขุมนุ่มลึก",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_06.jpg",
            videos: [
                "https://www.youtube.com/embed/-CipoeGV-s8",
                "https://www.youtube.com/embed/EfVuVCATeIM",
                "https://www.youtube.com/embed/E8PKPFsqje4",
            ],
        },
        {
            title: "☀️ Summer ☀️",
            paragraph: "Cool Tone ที่มีความอ่อน จะเป็นโทนสีแนว pastel ละมุ่น หวาน โรแมนติก สง่างาม แนวพาสเทล ให้ลุคที่ดูอ่อนโยนและน่าทะนุถนอม",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_05.jpg",
            videos: [
                "https://www.youtube.com/embed/gDBRORMi0a8",
                "https://www.youtube.com/embed/KB9xb6O9YJc",
                "https://www.youtube.com/embed/GYEljxxv5po",
            ],
        },
        {
            title: "❄️ Winter ❄️",
            paragraph: "สีโทนเย็นที่มีความเข้ม จะเป็นโทนสีเข้ม ๆ contrastจัด ๆ สีสด ๆ สีแบบแม่สี สีค่อนข้างสด ให้ลุคที่คมเข้มและดูเท่",
            image: "https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_07-01.jpg",
            videos: [
                "https://www.youtube.com/embed/erTX3cvP_GM",
                "https://www.youtube.com/embed/EAPb_y-hHXA",
                "https://www.youtube.com/embed/jbVyzE1XYFA",
            ],
        },
    ];

    const [currentTopic, setCurrentTopic] = useState(topics[0]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const [likesCount, setLikesCount] = useState({
        Spring: 0,
        Autumn: 0,
        Summer: 0,
        Winter: 0,
    });

    const toggleHeart = (color, season) => {
        setLikedColors((prevLikedColors) => {
            const isLiked = !prevLikedColors[color]; // Toggle the like state
            setLikesCount((prevCounts) => ({
                ...prevCounts,
                [season]: prevCounts[season] + (isLiked ? 0.5 : -0.5), // Adjust count based on like/unlike
            }));
            return {
                ...prevLikedColors,
                [color]: isLiked,
            };
        });
    };


    useEffect(() => {
        const sortedTopics = [...topics].sort(
            (a, b) => (likesCount[b.title.match(/[A-Za-z]+/)] || 0) - (likesCount[a.title.match(/[A-Za-z]+/)] || 0)
        );
        setCurrentTopic(sortedTopics[0]);
    }, [likesCount]);
    




    return (
        <main className={`${prompt.variable} ${nunito.variable} font-sans`}>

            {/* Navigation Buttons */}
            <section className="fixed bottom-80 left-5 z-50 flex flex-col gap-2 items-start">
                {[
                    {
                        id: '1',
                        label: 'Introduction of Personal color',
                        color: 'bg-yellow-400/70 hover:bg-yellow-500',
                    },
                    {
                        id: '2',
                        label: 'Analyze your Personal color',
                        color: 'bg-violet-800/70 hover:bg-violet-900',
                    },
                    {
                        id: '3',
                        label: 'Result & Recommendation',
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

            <section className="picture-personal bg-[url('https://cdn.prod.website-files.com/649174dcab676e52a64ce81a/6492a007773c4bf34455f75e_image-36.jpeg')]" alt="header">
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
                    <div className="w-full h-4/6 flex justify-center items-center text-white text-4xl ">
                        <h1>PERSONAL COLOR ANALYSIS</h1>
                    </div>
                </div>
            </section>



            {/* Introduction */}
            <section id="1" className="py-12 bg-[#f5f3eb] flex justify-center items-center">
                <div className="bg-white shadow-lg rounded-lg p-10 max-w-5xl text-center">
                    {/* Title */}
                    <h2 className="text-4xl font-serif font-extrabold mb-4 text-[#6d4c41]">
                        Personal Color
                    </h2>

                    {/* Description */}
                    <p className="text-lg mb-4 mx-10 text-left text-[#8d6e63]">
                        <span className="font-bold text-[#6d4c41]">Personal Color </span>
                        คือสีประจำตัวที่มีความเหมาะสมกับโทนสีผิวของเรา สามารถนำมาใช้เป็นสีเสื้อผ้า เครื่องประดับ เครื่องสำอาง สีผม
                        หรืออะไรก็ตามที่อยู่ใกล้กับผิวมากที่สุด ซึ่งถ้ามีสีนี้อยู่บนตัวจะขับผิวให้ดูเปล่งปลั่ง มีออร่าโดดเด่นและเปล่งประกาย ช่วยเสริมสร้างความมั่นใจ
                        และทำให้ดูอ่อนเยาว์มากขึ้น
                        <br />
                        <span className="text-[#a1887f]">
                            *ในทางตรงกันข้าม หากเลือกสีที่ไม่เหมาะกับตัวเองก็จะทำให้หน้าดูหมอง ริ้วรอยบนหน้าดูชัดขึ้นได้*
                        </span>
                    </p>

                    <p className="text-lg mb-2 mx-10 text-left text-[#8d6e63]">
                        <span className="font-bold text-[#6d4c41]">Personal Color </span>
                        จะแบ่งออกเป็น 2 ประเภทอย่างหลวมๆ ก็คือ Warm Tone และ Cool Tone โดยแบ่งลงไปอีกเป็น 2 กลุ่มย่อยในแต่ละประเภท
                        นั่นก็คือ Autumn และ Spring อยู่ในหมวด Warm Tone , Summer และ Winter อยู่ในหมวดสี Cool Tone ทั้ง 4 กลุ่มย่อยถูกแบ่งด้วยความเข้มและสว่างของเฉดสีอีกที
                    </p>

                    {/* Image */}
                    <div className="grid place-items-center">
                        <img
                            src="https://cosmenet-private.s3-bkk.nipa.cloud/upload/content/cosme-howto/lifestyle/2022-05-20-personal-color/personal_color_01.jpg"
                            alt="personal color"
                            className="rounded-lg shadow-lg w-8/12 mt-4"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => scrollToSection('2')}
                        className="mt-8 bg-[#8d6e63] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6d4c41] transition-all"
                    >
                        Click เพื่อไปยังการทดสอบ Personal color
                    </button>
                </div>
            </section>


            <section id="2" className="bg-[#2B1B0B] py-12 flex justify-center items-center min-h-screen">
    <div className="bg-[#FDFDF6] shadow-lg rounded-lg max-w-5xl w-full mx-auto p-8">
        {/* Title and Instructions */}
        <div className="text-center text-[#5A3825]">
            <h1 className="text-4xl font-serif font-extrabold text-[#4A2E16]">
                Personal Color Analysis
            </h1>
            <p className="mt-6 text-lg">
                <span className="font-semibold text-xl text-[#704F4F]">วิธีการทดสอบ📌 </span>
                : กดแผ่นสีเพื่อลองเทียบกับใบหน้า หากใบหน้าดูสว่างขึ้น หรือส่งเสริมให้เราดูดี
                <br />ให้คลิกที่สีนั้น 2 ครั้งเพื่อกดถูกใจ หากฤดูไหนที่มีจำนวนหัวใจมากที่สุด นั่นคือฤดูที่เหมาะกับคุณ
            </p>
        </div>

        {/* Camera and Palette Container */}
        <div className="flex flex-col md:flex-row items-start mt-8 gap-6">
            {/* Camera Section */}
            <div className="flex-auto w-80">
                <h2 className="text-lg font-bold text-[#5A3825] mb-4 text-center">
                    Camera Feed
                </h2>
                <div className="relative bg-[#FAF5EF] h-80 rounded-lg overflow-hidden shadow-inner">
                    <video className="w-full h-full object-cover" ref={videoRef}></video>
                    {/* Trapezoid Overlay */}
                    <div
                        style={{
                            position: "absolute",
                            top: "90%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "80%",
                            height: "20%",
                            clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
                            backgroundColor: selectedColor,
                            transition: "background-color 0.3s ease",
                        }}
                    />
                </div>
            </div>

            {/* Color Palette Section */}
            <div className="flex-auto w-1">
                <h2 className="text-lg font-bold text-[#5A3825] mb-4 text-center">
                    Select Colors
                </h2>
                <div className="overflow-y-auto h-80 bg-[#FAF5EF] p-4 rounded-lg shadow-inner">
                    {Object.keys(colorPalettes).map((season) => (
                        <div key={season} className="mb-6">
                            <h3 className="text-sm font-semibold text-[#704F4F] mb-2">
                                {`${season} (${seasonToneMap[season]}) - Likes: ${likesCount[season]}`}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {colorPalettes[season].map((color) => (
                                    <div
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        onDoubleClick={() => toggleHeart(color, season)}
                                        className={`relative w-8 h-8 rounded-full cursor-pointer transition-transform ${selectedColor === color
                                            ? "scale-100 ring-4"
                                            : "ring-2"
                                            }`}
                                        style={{
                                            backgroundColor: color,
                                            ringColor: selectedColor === color ? darkenColor(color, 40) : "#D6CCC2",
                                            boxShadow: selectedColor === color
                                                ? `0 0 0 4px ${darkenColor(color, 40)}`
                                                : `0 0 0 2px #D6CCC2`,
                                        }}
                                    >
                                        {likedColors[color] && (
                                            <span className="absolute text-[#9C3328] text-xs top-0.5 right-0.5">
                                                ❤️
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <p className="mt-10 text-[#5A3825] text-center">
            สามารถดูคำแนะนำแต่ละฤดูได้ที่ด้านล่าง
        </p>

        {/* Next Button */}
        <div className="mt-4 text-center">
            <button
                onClick={() => scrollToSection("3")}
                className="bg-[#704F4F] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#5A3825] transition-all"
            >
                Click เพื่อดูผลลัพธ์
            </button>
        </div>
    </div>
</section>



            <section id="3" className="py-12 bg-[#FAF7F0]  ">
                <h1 className="text-4xl font-serif font-extrabold text-center text-[#6d4c41]">
                    Result & Recommendation
                </h1>
                <p className="text-lg text-center text-[#8d6e63] mt-4">
                    มาดูผลลัพธ์และคำแนะนำของแต่ละฤดูกัน
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                    {[...topics]
                        .sort((a, b) => likesCount[b.title.slice(2, -2)] - likesCount[a.title.slice(2, -2)])
                        .map((topic, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTopic(topic)}
                                className={`px-6 py-3 text-lg font-bold rounded-full shadow-md transition-transform transform 
                        ${currentTopic.title === topic.title
                                        ? "bg-[#8d6e63] text-white scale-105"
                                        : "bg-[#d7ccc8] text-[#6d4c41]"
                                    }
                        hover:bg-[#8d6e63] hover:text-white hover:scale-105`}
                            >
                                {topic.title}
                            </button>
                        ))}
                </div>

                {/* Displayed Content */}
                <div className="mt-12 bg-white shadow-lg rounded-lg p-8 w-11/12 lg:w-3/4 mx-auto">
                    {/* Topic Title */}
                    <h2 className="text-3xl font-bold text-[#6d4c41] text-center">
                        {currentTopic.title}
                    </h2>
                    <p className="text-xl text-[#8d6e63] mt-4 text-center mx-36">
                        {currentTopic.paragraph}
                    </p>

                    {/* Topic Image */}
                    <div className="flex justify-center mt-6 ">
                        <img
                            src={currentTopic.image}
                            alt={currentTopic.title}
                            className="rounded-lg shadow-md max-w-[50%]"
                        />
                    </div>

                    {/* Video Section */}
                    <div className="mt-8 ">
                        <h3 className="text-xl font-medium text-[#6d4c41] text-center">
                            วิดีโอแนะนำการแต่งหน้า
                        </h3>
                        <div className="flex justify-center gap-6 mt-6 flex-wrap">
                            {currentTopic.videos.map((video, index) => (
                                <iframe
                                    key={video}
                                    src={video}
                                    title={`Video ${index + 1}`}
                                    className="w-[220px] h-[150px] rounded-lg shadow-md border-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ))}
                        </div>
                        <ul className="text-right mt-6 mx-20">
                            <Link
                                href="/Makeuptutorials"
                                className="text-lg text-[#6d4c41] hover:text-[#8d6e63] underline"
                            >
                                ดูเพิ่มเติม
                            </Link>
                        </ul>
                    </div>
                </div>
            </section>


            <section alt="conclusion">
                <div className="px-20 grid place-items-center bg-[#FAF7F0] text-stone-500">
                    <p className="px-40 text-lg">ทดสอบ Personal Color ได้สีที่ใช่กันไปเรียบร้อยแล้วหวังว่าทุกคนจะเอาไปแมตช์สีเสื้อผ้า เครื่องประดับ เครื่องสำอาง หรือสีผมได้หมดทุกสิ่งอย่างเพื่อสร้างสรรค์ลุคที่สวยขับผิวเปล่งออร่าให้ความมั่นใจมาเต็ม จะแต่งลุคไหนก็เกิดแน่นอน!
                        <br />ทั้งนี้ทั้งนั้นก็ไม่อยากให้หลายๆคน ยึดติดในสีประจำตัวมากเกินไป แต่นำหลักการไปปรับให้เข้ากับตัวเองโดยการสังเกตสีที่ตัวเองใส่แล้วรอด จะได้สนุกกับการแต่งตัวและได้ลุคที่ดึงเสน่ห์ของเราออกมาได้ด้วย</p><br />

                    <br /><br />
                </div>
            </section>


        </main>
    );
}

export default Personalcolor;



