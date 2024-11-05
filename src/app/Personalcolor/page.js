"use client"
import React from "react";
import { useEffect } from 'react'
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
                <div className="container">
                    <video className="container" ref={videoRef}></video>
                </div>
             </section>
        </main>
    )
}

export default Personalcolor