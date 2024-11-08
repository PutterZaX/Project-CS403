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

    const colorPalettes = useMemo(() => ({
        Spring: ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF'],
        Summer: ['#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'],
        Autumn: ['#FFB3C1', '#FF9F1C', '#FFD670', '#6A4C93'],
        Winter: ['#D7E3FC', '#A9DEF9', '#C3F0CA', '#B6E2D3'],
    }), []);

    const handleColorChange = (color) => {
        setSelectedColor(color);
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

                </section> <br /> <br />
            <section class="h-auto grid place-items-center">
                <div class="pt-10 w-3/5 text-center">
                <h1 class="my_space text-2xl font-bold">4 Steps การดู Personal color</h1>   <br /> <br /> <br />
                <img src="https://i.postimg.cc/90dQB41f/4steps.png"></img>
                    
                    <br />  
                </div>
                
            </section>
            <br />
            <br />

            <section className="flex justify-center items-center">
                <div className="relative w-2/5">
                    {/* Camera Feed */}
                    <div className="camera w-full">
                        <video className="camera w-full" ref={videoRef}></video>
                    </div>

                    {/* Drape Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%', // Adjust width if needed
                            height: 'auto',
                            borderRadius: '10px',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: selectedColor,
                                mixBlendMode: 'multiply',
                                transition: 'background-color 0.3s ease',
                            }}
                        />
                        <img
                            src="https://i.postimg.cc/gJT97ytp/drape-bw.png" // Replace with the path to your white drape image
                            alt="Personal color drape"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                pointerEvents: 'none',
                                mixBlendMode: 'screen',
                                filter: 'brightness(1.5)',
                            }}
                        />
                    </div>
                </div>

                {/* Color Palette on the Right */}
                <div className="ml-10">
                    {Object.keys(colorPalettes).map((season) => (
                        <div key={season} style={{ marginBottom: '10px' }}>
                            <h4>{season}</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {colorPalettes[season].map((color) => (
                                    <div
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: color,
                                            cursor: 'pointer',
                                            border: selectedColor === color ? `3px solid ${darkenColor(color, 30)}` : '1px solid #ccc',
                                            borderRadius: '50%',
                                            transition: 'transform 0.2s ease, border 0.2s ease',
                                            transform: selectedColor === color ? 'scale(1.2)' : 'scale(1)',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Personalcolor;
