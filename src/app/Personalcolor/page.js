"use client"
import React from "react";
import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";


function Personalcolor() {
    let videoRef = React.useRef(null);

    const getUserCamera = () => {
        navigator.mediaDevices.getUserMedia({
         video:true   
        })
        .then((stream) => {
           let video = videoRef.current
           video.srcObject = stream
           video.play()

        })
        .catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        getUserCamera()
    },[videoRef])


    // Utility function to darken a color by reducing its brightness
const darkenColor = (color, amount) => {
    let colorValue = parseInt(color.slice(1), 16); // Remove "#" and convert to integer
    let r = (colorValue >> 16) - amount;
    let g = ((colorValue >> 8) & 0x00FF) - amount;
    let b = (colorValue & 0x0000FF) - amount;

    // Ensure RGB values are within 0-255
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
};

        const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default white color
       
    
        // Define color palettes for the 4 seasons
  const colorPalettes = {
    Spring: ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF'],
    Summer: ['#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'],
    Autumn: ['#FFB3C1', '#FF9F1C', '#FFD670', '#6A4C93'],
    Winter: ['#D7E3FC', '#A9DEF9', '#C3F0CA', '#B6E2D3'],
  }

  

  const handleColorChange = (color) => {
    setSelectedColor(color);
  }

   /* const [color, setColor] = useState('#9D27B1');

  const changeColor = (newColor) => {
    setColor(newColor);
  };
*/
    
    return (
        <main >
            <section class="picture-personal bg-[url('https://cdn.prod.website-files.com/649174dcab676e52a64ce81a/6492a007773c4bf34455f75e_image-36.jpeg')]">
                <div class="h-2/6 flex">
                    <div class="w-2/5 flex justify-center items-center text-white text-4xl">
                        <h1>TellTone</h1>
                    </div>
                    <ul class="w-full gap-8 flex justify-center items-center text-white">
                        <Link href="/">Home</Link>
                        <Link href="/Skintone">Skin tone</Link>
                        <Link href="/Personalcolor">Personal color</Link>
                        <Link href="/Makeuptutorials">Makeup tutorials</Link>
                        <Link href="/Makeuptools">Makeup tools</Link>
                        <Link href="/Skincare">Skincare</Link>
                    </ul>
                </div>
                <div class="h-2/6">
                    <div class="w-full h-4/6 flex justify-center items-center text-white text-4xl">
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

            <section class="">
                <div class="camera">
                    <video className="camera" ref={videoRef}></video>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      {/* Square that changes color */}
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: selectedColor,
          border: '1px solid #ccc',
        }}
      />

      {/* Color palettes with darker border on selected color */}
      <div>
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
                    border: selectedColor === color ? `3px solid ${darkenColor(color, 30)}` : '', // Darker border on selected color
                    borderRadius: '50%', // Round shape for color swatches
                    transition: 'transform 0.2s ease, border 0.2s ease', // Smooth animation
                    transform: selectedColor === color ? 'scale(1.2)' : 'scale(1)', // Scale animation on selected
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  
      
             </section>
             
        </main>
    )
    
}




export default Personalcolor