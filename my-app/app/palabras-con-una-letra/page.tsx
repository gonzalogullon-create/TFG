"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const letras = "ABCDEFGHIJLMNOPQRSTUV";

export default function Home() {

const [letraActual, setLetraActual] = useState("");

const cargarLetraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * letras.length);
    const letraElegida = letras[indiceAleatorio];
    setLetraActual(letraElegida);
}
useEffect(() => {
    cargarLetraAleatoria();
  }, []);

const searchParams = useSearchParams();
const parSeleccionado = searchParams.get("parSeleccionado") || "";
const frecuencia= searchParams.get("frecuencia") ||"";
const intensidad= searchParams.get("intensidad");


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w -translate-x-11 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            PALABRAS CON UNA LETRA
          </h1>
          <div className="w-[400px] bg-white dark:bg-zinc-900 rounded-3xl p-10 text-center shadow-lg border-2 border-blue-100 dark:border-zinc-800 flex items-center justify-center min-h-[200px]">
              <p className="text-9xl font-bold text-zinc-800 dark:text-zinc-100 leading-relaxed uppercase">
                {letraActual}
              </p>
            
        </div>
          <div className="flex flex-row gap-6 translate-y-15">
            <button
                onClick={cargarLetraAleatoria}
                className="active:scale-95 text-base flex h-12 items-center justify-center rounded-full bg-white border-2 border-[#5170F5] px-10 text-[#5170F5] font-bold transition-colors hover:bg-blue-50 shadow-sm"
              >
                SIGUIENTE <br/> LETRA
              </button>
            
            <Link
              className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/resultado?tarea=palabras con una letra &parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}           >
              FINALIZAR
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
