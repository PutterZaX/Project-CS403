import React from "react";
import Image from "next/image";
import Link from "next/link";

function skincare() {
    return (
        <main >
            <section class="picture-home  bg-[url('https://today-obs.line-scdn.net/0hMAFQhiIVEm57KALz5g1tOUN-Hh9ITghnWR4OXw4sHl8FBAA6REtBDVh7HEIFSlc8Wx0IWFovHl8DEVA4Ew/w1200')]">

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
                        <h1>SKINCARE</h1>
                    </div>
                </div>

            </section>



            <section class="h-screen flex justify-center">

                <div class="w-4/5 text-center pt-10 border-black border-4 ">
                    <h1 class="text-2xl">Caragories</h1>
                    <br />
                    <ul class="gap-8 flex justify-center items-center ">
                        <button>ทั้งหมด</button>
                        <button>ผิวหน้า</button>
                        <button>เส้นผมและหนังศรีษะ</button>
                        <button>ผิวกาย</button>
                        <button>เล็บ</button>
                        <button>มือ</button>
                        <button>รอบดวงตา</button>
                        <button>ป้องกันแดด</button>
                        <button>ทำความสะอาด</button>
                    </ul>

                </div>

            </section>




        </main>
    )
}

export default skincare