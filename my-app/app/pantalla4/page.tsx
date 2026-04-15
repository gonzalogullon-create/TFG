"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {

  const searchParams = useSearchParams();
  const parSeleccionado = searchParams.get("parSeleccionado") || "";
  const frecuencia = searchParams.get("frecuencia") || "";
  const intensidad = searchParams.get("intensidad") || "";

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center pt-24 pb-32 px-16 bg-blue-50 dark:bg-black">
        
        <div className="flex flex-col items-center gap-4 text-center w-full mb-12">
          
          {parSeleccionado && (
            <div className="bg-white border-2 border-[#5170F5] text-[#5170F5] px-2 py-1 rounded-full shadow-sm text-sm flex flex-row items-center gap-1">
              <span>
                Estimulando: <strong className="text-base tracking-wide">{parSeleccionado}</strong>
              </span>
              <span className="text-zinc-500 text-xs font-medium ml-1">
                ({frecuencia} | {intensidad})
              </span>
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight dark:text-zinc-50 mt-1">
            SELECCIONE TAREA
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid  grid-cols-2 gap-10 text-base font-medium sm:flex-row font-semibold justify-center">
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/nominacion?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              NOMINACIÓN
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/lectura?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              LECTURA
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/descripcion-de-imagenes?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              DESCRIPCIÓN <br/> DE IMÁGENES
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/categorias?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              CATEGORÍAS
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center text-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/palabras-con-una-letra?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              PALABRAS CON UNA LETRA
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/comprension?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              COMPRENSIÓN
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-col gap-10 text-base font-medium sm:flex-row justify-center">
            <Link
              className="active:scale-95 font-semibold flex h-18 py-4 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px] text-center"
              href={`/resultado?tarea=detección de síntomas&parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}            
            >
              DETECCIÓN DE SÍNTOMAS
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}