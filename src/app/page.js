import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main >
      <section class=" picture-home bg-[url('https://limelushorganics.com/cdn/shop/files/Bg.png?v=1694756724&width=1440')]">

        <div class="h-2/6 flex">

          <div class="w-2/5 flex justify-center items-center text-white text-4xl">
            <h1>TellTone</h1>
          </div>

          <ul class="w-full gap-8 flex justify-center items-center text-white">
            <Link href="/">Home</Link>
            <Link href="/Skintone">Skin tone</Link>
            <Link href="/Personalcolor">Personal color</Link>
            <Link href="/Makeuptutorials">Makeup tutorials</Link>
          </ul>
        </div>

        <div class="h-4/6 flex">
          <div class="w-full h-4/5 grid justify-center items-center ">
            <h1 class="text-white  text-center text-4xl">TELL YOUR SKIN TONE & PERSONAL COLOR</h1>
            <h1 class="text-white text-center">Makeup tutorials & Tools & Skincare</h1>
            <Link class="bg-white  mx-auto px-10 py-4 text-black text-center " href="/Skintone"> Let’s start</Link>

          </div>
        </div>

      </section>

     
      
      <section class="h-auto grid place-items-center">

        <div class="pt-10 h-96 w-3/5 ">

          <div class=" h-2/6 text-center">
          <br />
          <p class="text-3xl font-serif font-semibold">Skin Tone</p>
            <br />
            <p class= "text-neutral-500" >มนุษย์แต่ละเชื้อชาติมีความต่างกัน เห็นได้ชัดทั้งรูปร่างหน้าตาและสีผิว สำหรับคนที่เชื้อชาติเดียวกัน
              <br />ก็ยังมีสีผิวที่แตกต่างกันได้ หรือแม้กระทั่งตัวเราก็ยังมีสีผิวที่ไม่สม่ำเสมอ</p>
          </div>
          <br /> <br /><br />

          <div class=" h-4/6 flex justify-center text-center">
            <div class="w-1/2 ">
              <img class="max-w-100" src="https://www.sinotaclinic.com/wp-content/uploads/2023/11/P2-Insert-Pico-sinota-01.webp"></img>
            </div>
            
            <div class="w-1/2 pl-5 text-left">
            <br /><br /><br /><br />
              <p class ="text-base font-serif font-medium text-red-700">Skin tone</p>
              <h1 class="my_space text-2xl font-bold">เลือกรองพื้นให้หน้าไม่เทา</h1>
              <h1 class="text-sm">ถ้าเรารู้โทนสีผิวของตัวเองแล้ว เราจะสามารถเลือกสีรองพื้น
                <br />คอนซีลเลอร์ และแป้งที่เหมาะกับสีผิวของเราได้มากขึ้น
                <br />ช่วยทำให้เครื่องสำอางที่ทาออกมาดูเป็นงานผิวธรรมชาติ
                <br />ไม่ดูหมองคล้ำ หรือหน้าลอย</h1>
              <br />
              <Link class="bg-black  mx-auto px-9 py-4 text-white text-center " href="/Skintone">เริ่มทดสอบ</Link>
            </div>
          </div>
        </div>

       <br /><br /><br /><br />

      </section>

      <section class="">
      <div class="pt-80  ">
          <div class="h-2/6 text-center justify-center">
            <p class="text-3xl font-serif font-semibold">Personal Color</p>
            <br />
            <p class="text-neutral-500">เทรนด์บางอย่างมาแล้วก็ไป แต่ Personal Color เป็นการทำงานกับหลักความเป็นจริง
              <br />นั่นแปลว่า ถ้าคุณใส่สีนี้สวย ต่อให้สิบปีข้างหน้า คุณก็ยังใส่สีนี้สวยอยู่ ดังนั้น Personal Color
              <br />ไม่มีทางหายไปไหน เพราะเรายังต้องอยู่กับความเป็นจริงตลอดไป</p>
          </div>
          <br /><br />

          <div class=" h4/6 flex text-center">
            <div class="w-1/2 pr-5 text-right"><br /> <br /><br /><br />
            <p class ="text-base font-serif font-medium text-red-700">Personal Color</p>
            <h1 class="my_space text-2xl font-bold">สวยได้ทุกสีผิวจากโทนสีประจำตัว</h1>
              <h1 class="text-sm">หากคุณอยากรู้ว่าโทนสีที่ใช่<br />
                และเหมาะสมกับผิวของคุณที่สุดอยู่ในโทนใด<br />
                ไปเช็คและสำรวจตัวเองกันได้เลย</h1><br />
              <Link class="bg-black mx-auto px-9 py-4 text-white text-center " href="/Personalcolor">เริ่มทดสอบ</Link>
            </div>

            <div class="w-1/2">
              <img class="w-auto h-auto " src="https://cdn.prod.website-files.com/649174dcab676e52a64ce81a/6492a007773c4bf34455f75e_image-36.jpeg"></img>
            </div>

          </div>

        </div>
      </section>
      <br /><br /><br />

    </main>

  );
}
