"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {

const imagenes=["/fotos-descripcion/parque.png","/fotos-descripcion/supermercado.png","/fotos-descripcion/salon.png","/fotos-descripcion/playa.png","/fotos-descripcion/terraza.png","/fotos-descripcion/robodelasgalletas.png","/fotos-descripcion/picnic.png"];
const [imagenesDisponibles, setImagenesDisponibles] = useState(imagenes);
const [imagenActual, setImagenActual] = useState("");
const searchParams = useSearchParams();
const parSeleccionado = searchParams.get("parSeleccionado") || "";
const frecuencia= searchParams.get("frecuencia") || "";
const intensidad= searchParams.get("intensidad") || "";


const cargarImagenAleatoria = () => {
    if (imagenesDisponibles.length === 0) return;
    const indiceAleatorio = Math.floor(Math.random() * imagenesDisponibles.length);
    const fotoElegida = imagenesDisponibles[indiceAleatorio];
    setImagenActual(fotoElegida);
    const nuevoMazo = imagenesDisponibles.filter((_, index) => index !== indiceAleatorio);
    setImagenesDisponibles(nuevoMazo);
}
useEffect(() => {
    cargarImagenAleatoria();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w -translate-x-10 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            DESCRIPCIÓN DE IMÁGENES
          </h1>
          <div className="w-full h-64 mb-12">
            {imagenActual ? (
              <Image 
                src={imagenActual} 
                alt="Imagen para describir" 
                width={600} 
                height={400} 
                className="rounded-lg object-contain"
              />
            ) : (
              <p className="text-gray-500">Cargando imagen...</p>
            )}
          </div>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-center mt-5">
            {imagenesDisponibles.length > 0 && (
              <button
                onClick={cargarImagenAleatoria}
                className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-white border-2 border-[#5170F5] px-10 text-[#5170F5] font-bold transition-colors hover:bg-blue-50 shadow-sm"
              >
                OTRA IMAGEN
              </button>
            )}
            <Link
              className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/resultado?tarea=descripción de imágenes&parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}
            >
              FINALIZAR
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
