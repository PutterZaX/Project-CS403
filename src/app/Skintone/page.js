import React from "react";
import Image from "next/image";
import Link from "next/link";

function Skintone() {
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
                        <h1>SKIN TONE ANALYSIS</h1>
                    </div>
                </div>

            </section>

            <section class="h-auto grid place-items-center">

                <div class=" pt-10">
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

                    <div class="w-full text-right">

                    </div>

                </div>

            </section>

        </main>
    )
}

export default Skintone