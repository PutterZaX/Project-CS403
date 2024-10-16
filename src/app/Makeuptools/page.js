import React from "react";
import Image from "next/image";
import Link from "next/link";

function Makeuptools() {
    return (
        <main >
            <section class="picture-home bg-[url('https://i.postimg.cc/pXTq63gP/5d1f1c33c3d5dcca7db3066ac510cfa6.jpg')]">

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

                <div class="h-2/6 flex">
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