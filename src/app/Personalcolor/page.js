"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

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

    const toggleHeart = (color) => {
        setLikedColors((prevLikedColors) => ({
            ...prevLikedColors,
            [color]: !prevLikedColors[color],
        }));
    };

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
                <div className="pt-10 w-3/5 text-center">
                    <h1 className="my_space text-2xl font-bold">4 Steps การดู Personal color</h1>
                    <br /> <br /> <br />
                    <img src="https://i.postimg.cc/90dQB41f/4steps.png" alt="4 Steps Personal Color Guide"></img>
                    <br />
                </div>
            </section>
            <br />
            <br />
            
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
            <br />
            <br />
        </main>
    );
}

export default Personalcolor;
