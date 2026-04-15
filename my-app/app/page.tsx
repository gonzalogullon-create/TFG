import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-20 px-8 bg-blue-50 dark:bg-black">
        
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-row items-center gap-10">
            <Image
              src="/94_lapaz.png" 
              alt="La Paz logo"
              width={500} 
              height={150} 
              className="h-auto object-contain"
              priority
            />
            <Image
              src="/gbt.png"
              alt="GBT logo"
              width={250}
              height={80}
              className="h-auto object-contain"
              priority
            />
          </div>
          
          <Image
            src="/etsit.png"
            alt="ETSIT logo"
            width={250}
            height={80}
            className="h-auto object-contain"
            priority
          />
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-1 md:gap-12">
  
        <div className="flex w-[150px] justify-end">
          <Image
            src="/deepmapp.png"
            alt="DeepMApp logo"
            width={150}
            height={40}
            className="h-auto object-contain"
            priority
          />
        </div>

        <div className="flex flex-col items-center text-center gap-5">
          <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-black dark:text-zinc-50 md:text-4xl">
            DeepMApp 
          </h1>
          <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-black dark:text-zinc-50 md:text-4xl">
            ESTIMULACIÓN CEREBRAL
          </h1>
        </div>
        
        <div className="w-[150px]"></div>

      </div>
        <div className="flex text-base font-medium ">
          <Link
            className="active:scale-95 flex h-14 items-center gap-2 justify-center rounded-full bg-[#5170F5] px-10 text-white transition-colors hover:bg-[#3f5fd7] shadow-lg mb-15"
            href="/pantalla2"
          >
            <Image
              className="brightness-0 invert"
              src="/vercel.svg"
              alt="Icon"
              width={16}
              height={16}
            />
            COMENZAR
          </Link>
        </div>

      </main>
    </div>
  );
}
