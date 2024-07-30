"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Makeuptutorials() {
  const [type, setType] = useState(0)
  const data = [
    {
      link: 'https://www.youtube.com/embed/en7NaNgQGts',
      type: 1

    },
    {
      link: 'https://www.youtube.com/embed/8eKGei7pv3I',
      type: 1

    },
    {
      link: 'https://www.youtube.com/embed/EYQS0wEp7nA',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/1hcdp1wz18Y',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/V-EaJ-xvO5o',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/LrdfV8JvwEY',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/hjakEhIm33s',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/znAVSab7Hgw',
      type: 1
    },
    {
      link: 'https://www.youtube.com/embed/zccRkG7J8V8',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/3vUpA26dIhQ',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/D4hmmDmbwkY',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/BOShKEWiF3w',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/PI5BifgV3xA',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/Gz9vRr12B4w',
      type: 2
    },
    {
      link: 'https://www.youtube.com/embed/bon9yxCuTwM',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/XyDBQNY0gYE',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/mRY_aAUh98c',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/UfoDQAv183A',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/fOtuzE-_NtA',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/AdQWskev7Q4',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/2w5WKCYbTg4',
      type: 3
    },
    {
      link: 'https://www.youtube.com/embed/AWKY5981hvc',
      type: 3
    },
    {
      link: '',
      type: 4
    },
    {
      link: '',
      type: 4
    },
    {
      link: '',
      type: 4
    },
    {
      link: '',
      type: 4
    },
    {
      link: '',
      type: 4
    },
    {
      link: '',
      type: 5
    },
    {
      link: '',
      type: 5
    },
    {
      link: '',
      type: 5
    },
    {
      link: '',
      type: 5
    },
    {
      link: '',
      type: 5
    },
    {
      link: '',
      type: 6
    },
    {
      link: '',
      type: 6
    },
    {
      link: '',
      type: 6
    },
    {
      link: '',
      type: 6
    },
    {
      link: '',
      type: 6
    },
    {
      link: '',
      type: 7
    },
    {
      link: '',
      type: 7
    },
    {
      link: '',
      type: 7
    },
    {
      link: '',
      type: 7
    },
    {
      link: '',
      type: 7
    },
    {
      link: 'https://www.youtube.com/embed/Hf6_U-eoTds',
      type: 8
    },
    {
      link: '',
      type: 8
    },
    {
      link: '',
      type: 8
    },
    {
      link: '',
      type: 8
    },
    {
      link: '',
      type: 8
    },
    {
      link: 'https://www.youtube.com/embed/znAVSab7Hgw?si=XFQpNzMacZ20YStc',
      type: 9
    },
    {
      link: 'https://www.youtube.com/embed/fnLAw6-wsTY',
      type: 9
    },
    {
      link: 'https://www.youtube.com/embed/6bGnE2quJTs',
      type: 9
    },
    {
      link: 'https://www.youtube.com/embed/rqLosSG8Sow',
      type: 9
    },
    {
      link: 'https://www.youtube.com/embed/wc7vvsOSEMU',
      type: 9
    },
    {
      link: 'https://www.youtube.com/embed/BILROlwfYDU',
      type: 9
    },
    {
      link: 'https://www.youtube.com/embed/9Ppqj_HFwI0',
      type: 9
    },
    {
      link: '',
      type: 10
    },
    {
      link: '',
      type: 10
    },
    {
      link: '',
      type: 10
    },
    {
      link: '',
      type: 10
    },
    {
      link: '',
      type: 10
    },


  ]

  const fitter = type === 0 ? data : data?.filter(data => type === data?.type)


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
            <h1>MAKEUP TUTORIALS</h1>
          </div>
        </div>

      </section>

      <section class="h-auto flex justify-center">

        <div class="w-4/5 text-center pt-10 border-black border-4 ">

          <h1 class="text-2xl">Caragories</h1>
          <br />
          <ul class="gap-8 flex justify-center items-center  ">
            <button onClick={() => setType(0)}>ทั้งหมด</button>
            <button onClick={() => setType(1)}>มือใหม่</button>
            <button onClick={() => setType(2)}>สไตล์เกาหลี</button>
            <button onClick={() => setType(3)}>สายฝอ</button>
            <button onClick={() => setType(4)}>คอสเพลย์</button>
            <button onClick={() => setType(5)}>Spring</button>
            <button onClick={() => setType(6)}>Autumn</button>
            <button onClick={() => setType(7)}>Winter</button>
            <button onClick={() => setType(8)}>Summer</button>
            <button onClick={() => setType(9)}>โรงเรียน</button>
            <button onClick={() => setType(10)}>มหาลัย</button>
          </ul>

          <div class="pt-10 pb-20 grid gap-4 grid-cols-4 place-items-center">
            {
              fitter.map(data => (
                <iframe width="200" height="150" src={data.link} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="1" />
              ))
            }

          </div>

        </div>

      </section>

    </main>
  )
}

export default Makeuptutorials