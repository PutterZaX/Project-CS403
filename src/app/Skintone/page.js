import React from "react";
import Image from "next/image";
import Link from "next/link";

function Skintone() {
    return (
        <main >
            <section class="picture-home bg-[url('https://i.postimg.cc/zXqt5V6S/IMG-0703.jpg')]">

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

                <div class="h-2/6 ">
                    <div class="w-full h-4/5 flex justify-center items-center text-white text-4xl">
                        <h1>SKIN TONE ANALYSIS</h1>
                    </div>
                </div>

            </section>

            <section class="h-auto grid place-items-center">

            <div class=" h-4/6 flex justify-center">
                <div class="w-1/2 pl-5 ">
                    <h1 class="text-center text-lg">คำแนะนำสำหรับการอัพโหลดรูป</h1>
                    
                    <br />
                    <div class="">
                        <li>รูปครวที่จะเป็นหน้าสด ไม่ใช้รุปที่แต่งหน้าแล้วเพื่อนที่จะได้คำนวนสีออกมาได้ถูกต้อง</li>
                        <br />
                        <li>แสงควรที่จะสว่าง ไม่ทำให้เกิดาหงาบนใบหน้า เพื่อให้สีออกมาตรงมากที่สุด</li>
                        <br />
                        <li>แนะนำให้เป็นรูปที่เห็นหน้าชัดเจน หน้าตรง ไม่เล็กหรือไกลจนเกินไป</li>
                        <br />
                        <li>พื้นหลังต้องไม่ส่งผลกระทบต่อแสงที่ใบหน้า</li>
                    </div>
                    <br /><br />
                    </div>

                    <div class="w-1/2">
                    <img class="w-40" src="https://i.postimg.cc/qvCf9N9B/image.png"></img>
                </div>
                </div>

            </section>

        </main>
    )
}

export default Skintone