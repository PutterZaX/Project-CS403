import React from "react";
import Image from "next/image";
import Link from "next/link";

function Makeuptools() {
    return (
        <main >
            <section class="h-80 bg-[url('https://media.istockphoto.com/id/1296506522/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%9B%E0%B8%95%E0%B9%8C%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B9%8C.jpg?s=1024x1024&w=is&k=20&c=EYosMjYDXJgF9Dpfu_30MNggCzaF5WWp0cAC7FHD4AE=')]">

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

                <div class="h-4/6 flex">
                    <div class="w-full h-4/5 flex justify-center items-center text-white text-4xl">
                        <h1>MAKEUP TOOLS</h1>
                    </div>
                </div>

            </section>



            <section class="h-screen flex justify-center">

                <div class="w-4/5 text-center pt-10 border-black border-4 ">
                    <h1 class="text-2xl">Caragories</h1>
                    <br />
                    <ul class="gap-8 flex justify-center items-center ">
                        <button>ทั้งหมด</button>
                        <button>แปลงแต่งหน้า</button>
                        <button>เครื่องสำอางแต่งหน้า</button>
                        <button>เครื่องสำอางแต่งตา</button>
                        <button>เครื่องสำอางแต่งคิ้ว</button>
                        <button>เครื่องสำอางแต่งแก้ม</button>
                        <button>เครื่องสำอางแต่งปาก</button>
                    </ul>

                </div>

            </section >

        </main >
    )
}

export default Makeuptools