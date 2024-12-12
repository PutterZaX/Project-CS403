"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Prompt, Nunito } from 'next/font/google';
const prompt = Prompt({ subsets: ['thai'], weight: ['400', '700'], variable: '--font-prompt' });
const nunito = Nunito({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-nunito' });


function Makeuptutorials() {
  const [type, setType] = useState(0)
  const data = [
    {
      link: 'https://www.youtube.com/embed/jvAqpTyP6TE',
      name: 'How To Apply Makeup For Beginners',
      type: 1

    },
    {
      link: 'https://www.youtube.com/embed/8eKGei7pv3I',
      name: 'beginner Makeup step by step',
      type: 1

    },
    {
      link: 'https://www.youtube.com/embed/en7NaNgQGts',
      name: 'How to มือใหม่หัดแต่งหน้า',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/q80dd21kv8E',
      name: 'เอามือใหม่มานั่งแต่งหน้าด้วยกัน!🎐🎀 ',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/fh44WYPx5fw',
      name: 'Step By Step "SUPER AFFORDABLE"',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/-WlqBjKC0C8',
      name: 'BEGINNER MAKEUP TUTORIAL',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/LjiP6I9q_qI',
      name: 'Warm Tone Makeup 🍂 | Dearkiko',
      type: 2

    },
    {
      link: 'https://www.youtube.com/embed/DuyIKvsbxFc',
      name: 'WARM TONE Makeup | mininuiizz',
      type: 2

    },
    {
      link: 'https://www.youtube.com/embed/cJtKsdZfiIQ',
      name: 'Warm tone fall makeup that makes prettier',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/V1eq6uWB6sE',
      name: 'HOW TO Warm Tone Makeup 🤎 ',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/dk2Goqgvg9Q',
      name: 'Warm Everyday Makeup 🧶',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/USbS0e6o58o',
      name: ' แต่งหน้าโทนอุ่น โทนสีตุ่นๆ ละมุน รับหน้าหนาว 🍂',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/9OQM3rZUd2c',
      name: 'Everyday Cool Tone Makeup 🐈‍⬛',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/hxzAKZ_t6bg',
      name: 'Cool Tone Makeup สาวไทยก็แต่งได้นะ!!',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/L8ehUgP05xc',
      name: '❄️✨🤍 COOL TONE MAKEUP เกาหลีเกาใจ',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/0duxJz8ZHyk',
      name: 'Everyday Cool Berry Makeup',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/qyxT6ZidG_c',
      name: 'แต่งหน้าหวานๆโทนม่วงชมพูววว☂️💗',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/Lw_EaPF619c',
      name: 'แต่งหน้าชมพูคูลโทนของสาวผิวขาวเหลือง',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/RKxw0oP3OAo',
      name: 'Neutral Tone Makeup แบบสวยจึ้งตะลึง!',
      type: 4
    },
    {
      link: 'https://www.youtube.com/embed/U4v_w2zaZZ0',
      name: 'แต่งหน้างานผิวแมทล้อแสง Neutral Tone',
      type: 4
    },
    {
      link: 'https://www.youtube.com/embed/FdXW9kuS1BI',
      name: 'grwm, everyday soft glam makeup ^_−☆',
      type: 4
    },
    {
      link: 'https://www.youtube.com/embed/ZTS7IenNi6M',
      name: 'Soft beige makeup',
      type: 4
    },
    {
      link: 'https://www.youtube.com/embed/sHm27cMY2M4',
      name: 'แนะนำเมคอัพ Neutral Tone ละมุนเกินเบอร์',
      type: 4
    },
    {
      link: 'https://www.youtube.com/embed/g8Mjj0w0C1k',
      name: 'สอนแต่งหน้า : Spring looks',
      type: 5
    },
    {
      link: 'https://www.youtube.com/embed/7hCUu0rtkKA',
      name: 'Glowy Spring makeup ',
      type: 5
    },
    {
      link: 'https://www.youtube.com/embed/OgMmEP7K5jc',
      name: 'Light Spring Makeup ',
      type: 5
    },
    {
      link: 'https://www.youtube.com/embed/9R-YJYGTIk0',
      name: 'fresh spring makeup 🌷',
      type: 5
    },
    {
      link: 'https://www.youtube.com/embed/QNnnYG8PUHY',
      name: 'Spring warm makeup',
      type: 5
    },
    {
      link: 'https://www.youtube.com/embed/-CipoeGV-s8',
      name: 'Autumn Makeup งาน Warm Tone มาแล้ว',
      type: 6
    },
    {
      link: 'https://www.youtube.com/embed/EfVuVCATeIM',
      name: 'grwm 🍂 autumn mute makeup',
      type: 6
    },
    {
      link: 'https://www.youtube.com/embed/E8PKPFsqje4',
      name: 'Autumn Palette Makeup ฟีลฤดูใบไม้ร่วง🍂🍁',
      type: 6
    },
    {
      link: 'https://www.youtube.com/embed/VoRFuJSzwdk',
      name: 'สอนแต่งหน้า : Autumn Look ',
      type: 6
    },
    {
      link: 'https://www.youtube.com/embed/7zIV3FWbUrM',
      name: 'Warm Autumn 🍁 Makeup ',
      type: 6
    },
    {
      link: 'https://www.youtube.com/embed/rXmB78BRbJk',
      name: '데일리 메이크업 튜토리얼🌷',
      type: 7
    },
    {
      link: 'https://www.youtube.com/embed/gDBRORMi0a8',
      name: 'สอนแต่งหน้า : Summer looks',
      type: 7
    },
    {
      link: 'https://www.youtube.com/embed/KB9xb6O9YJc',
      name: 'Soft Summer(CoolTone)💕Korean Makeup✨',
      type: 7
    },
    {
      link: 'https://www.youtube.com/embed/GYEljxxv5po',
      name: 'PC light summer 🎀🛁',
      type: 7
    },
    {
      link: 'https://www.youtube.com/embed/qs_yb0L6xx8',
      name: 'Light Summer🍓🥛 Strawberry Milk',
      type: 7
    },
    {
      link: 'https://www.youtube.com/embed/erTX3cvP_GM',
      name: 'Deep Winter Makeup Tutorial ❄️ 💜',
      type: 8
    },
    {
      link: 'https://www.youtube.com/embed/EAPb_y-hHXA',
      name: 'สอนแต่งหน้า : Winter Look',
      type: 8
    },
    {
      link: 'https://www.youtube.com/embed/jbVyzE1XYFA',
      name: 'Clear Winter Makeup ลุคชมพูบานเย็น ',
      type: 8
    },
    {
      link: 'https://www.youtube.com/embed/X4RmvQWtkJA',
      name: 'How To : DARK WINTER MAKEUP LOOK ',
      type: 8
    },
    {
      link: 'https://www.youtube.com/embed/LWRut1RsEnc',
      name: 'Deep Winter: My makeup before and after',
      type: 8
    },
  ]

  const fitter = type === 0 ? data : data?.filter(data => type === data?.type)


  return (
    <main className={`${prompt.variable} ${nunito.variable} font-sans bg-[#FAF3ED] text-[#4A3F35]`}>
  <section class="picture-home  bg-[url('https://prod-cdn.pharmacity.io/blog/makeup-1.jpg')]">
        <div class="h-2/6 flex">
          <div class="w-2/5 flex justify-center items-center text-white text-4xl">
            <h1>TellTone</h1>
          </div>
          <ul class="w-full gap-8 flex justify-center items-center text-white">
            <Link href="/">Home</Link>
            <Link href="/Skintone">Skin tone</Link>
            <Link href="/Undertone">Undertone</Link>
            <Link href="/Personalcolor">Personal color</Link>
            <Link href="/Makeuptutorials">Makeup tutorials</Link>
          </ul>
        </div>

        <div class="h-2/6 flex">
          <div class="w-full h-4/5 flex justify-center items-center text-white text-4xl">
            <h1>MAKEUP TUTORIALS</h1>
          </div>
        </div>

      </section>

  {/* Categories */}
  <section className="h-auto flex flex-col items-center py-16">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-[#4A3F35] mb-6">Categories</h1>
      <ul className="flex gap-6 flex-wrap justify-center items-center">
        <button
          className="bg-[#8C6D57] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#A5836B] transition-all"
          onClick={() => setType(0)}
        >
          ทั้งหมด
        </button>
        <button
          className="bg-[#99627A] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#C88EA7] transition-all"
          onClick={() => setType(1)}
        >
          Beginners
        </button>
        <button
          className="bg-[#C78C6C] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#D9A583] transition-all"
          onClick={() => setType(2)}
        >
          Warm Tone
        </button>
        <button
          className="bg-[#8BA5A8] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#9FC2C5] transition-all"
          onClick={() => setType(3)}
        >
          Cool Tone
        </button>
        <button
          className="bg-[#B3A595] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#C4B3A5] transition-all"
          onClick={() => setType(4)}
        >
          Neutral Tone
        </button>
        <button
          className="bg-[#94A684] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#AEC3AE] transition-all"
          onClick={() => setType(5)}
        >
          Spring
        </button>
        <button
          className="bg-[#7D4F3A] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#9A6B52] transition-all"
          onClick={() => setType(6)}
        >
          Autumn
        </button>
        <button
          className="bg-[#76A1C2] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#89B8D5] transition-all"
          onClick={() => setType(7)}
        >
          Summer
        </button>
        <button
          className="bg-[#3A547D] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#4F6A95] transition-all"
          onClick={() => setType(8)}
        >
          Winter
        </button>
      </ul>
    </div>

    {/* Video Grid */}
    <div className="px-20 pt-12 pb-20 grid gap-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
      {fitter.map((data, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm transform hover:scale-105 transition-transform"
        >
          <iframe
            width="100%"
            height="200"
            src={data.link}
            title="YouTube video player"
            className="border-b-4 border-[#4A3F35]"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <p className="text-center text-[#4A3F35] text-base p-4">{data.name}</p>
        </div>
      ))}
    </div>
  </section>
</main>

  )
}

export default Makeuptutorials