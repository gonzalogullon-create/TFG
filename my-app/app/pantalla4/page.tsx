"use client";


import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {

  const searchParams = useSearchParams();
  const parSeleccionado = searchParams.get("parSeleccionado") || "";

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-start gap-6 text-center sm:items-start sm:text-center">
          <h1 className="max-w-xs self-start -translate-x-25 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
          SELECCIONE TAREA
          </h1>
        </div>
        <div className="flex flex-col gap-10">
          <div className="grid  grid-cols-2 gap-10 text-base font-medium sm:flex-row font-semibold justify-center">
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/nominacion?parSeleccionado=${parSeleccionado}`}
            >
              NOMINACIÓN
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/lectura?parSeleccionado=${parSeleccionado}`}
            >
              LECTURA
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/descripcion-de-imagenes?parSeleccionado=${parSeleccionado}`}
            >
              DESCRIPCIÓN <br/> DE IMÁGENES
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/categorias?parSeleccionado=${parSeleccionado}`}
            >
              CATEGORÍAS
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center text-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/palabras-con-una-letra?parSeleccionado=${parSeleccionado}`}
            >
              PALABRAS CON UNA LETRA
            </Link>
            <Link
              className="active:scale-95 flex h-20 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href={`/comprension?parSeleccionado=${parSeleccionado}`}
            >
              COMPRENSIÓN
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-col gap-10 text-base font-medium sm:flex-row justify-center">
            <Link
              className="active:scale-95 font-semibold flex h-18 items-center justify-center rounded-2xl bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/resultado?tarea=detección de síntomas&par=${parSeleccionado}`}
            >
              DETECCIÓN DE SÍNTOMAS
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
