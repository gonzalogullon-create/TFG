
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Carrusel from "./carrusel";


export default async function Home({
  searchParams,}: {  searchParams: Promise<{ parSeleccionado?: string; frecuencia?:string;intensidad?:string; }>;}) 
  {
    
  const directorioFotos = path.join(process.cwd(), "public", "fotos-carrusel");
  
  let listaDeFotos: string[] = [];

  try {
    const archivos = fs.readdirSync(directorioFotos);
    listaDeFotos = archivos
      .filter((archivo) => /\.(jpg|jpeg|png|webp|avif)$/i.test(archivo))
      .map((archivo) => `/fotos-carrusel/${archivo}`);
      
  } catch (error) {
    console.error("Error leyendo la carpeta de fotos:", error);
    listaDeFotos = [];
  }

const params = await searchParams;
const parSeleccionado = params?.parSeleccionado || "";
const frecuencia = params?.frecuencia  || "";
const intensidad = params?.intensidad || "";

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-start gap-6 text-center sm:items-start sm:text-center">
          <h1 className="max-w-xs self-start -translate-x-35 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
          NOMINACIÓN
          </h1>
        </div>
        <div className="w-130 px h-64 mb-12">
            <Carrusel imagenes={listaDeFotos} />
        </div>
        <div className="flex flex-col gap-10 text-base font-medium sm:flex-row justify-center">
          <Link
            className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
            href={`/resultado?tarea=nominación&parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}
          >
            FINALIZAR
          </Link>
        </div>
      </main>
    </div>
  );
}
