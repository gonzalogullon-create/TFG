import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="items-center flex self-start min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-center translate-y-20">
          <div className="flex flex-row gap-10 -translate-y-20 ">
            <Image
              src="/94_lapaz.png" 
              alt="La Paz logo"
              width={600}
              height={20}
              priority
            />
            <Image
              src="/gbt.png"
              alt="GBT logo"
              width={300}
              height={10}
              priority
            />
          </div>
          <Image
            src="/etsit.png"
            alt="ETSIT logo"
            width={300}
            height={20}
            priority
          />
          
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            ESTIMULACIÓN CEREBRAL
          </h1>
          
        </div>
        <div className="flex text-base font-medium">
          <Link
            className="active:scale-95 flex h-12 items-center gap-2 justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
            href="/pantalla2"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
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
