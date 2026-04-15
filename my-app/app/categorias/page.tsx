"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categorias = ["Frutas y verduras", "Prendas de vestir", "Medios de tranasporte", "Muebles y objetos de la casa", "Partes del cuerpo", "Herramientas", "Profesiones y oficios", "Instrumentos musicales"];

export default function Home() {
const [categoriasDisponibles, setCategoriasDisponibles] = useState(categorias);
const [categoriaActual, setcategoriaActual] = useState("");

const cargarCategoriaAleatoria = () => {
    if (categoriasDisponibles.length === 0) return;
    const indiceAleatorio = Math.floor(Math.random() * categoriasDisponibles.length);
    const categoriaElegida = categoriasDisponibles[indiceAleatorio];
    setcategoriaActual(categoriaElegida);
    const nuevoMazo = categoriasDisponibles.filter((_, index) => index !== indiceAleatorio);
    setCategoriasDisponibles(nuevoMazo);
}
useEffect(() => {
    cargarCategoriaAleatoria();
  }, []);
const searchParams = useSearchParams();
const parSeleccionado = searchParams.get("parSeleccionado") || "";
const frecuencia= searchParams.get("frecuencia") || "";
const intensidad= searchParams.get("intensidad") || "";


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w -translate-x-36 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            CATEGORÍAS
          </h1>
          <div className="w-[450px] bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center shadow-lg border-2 border-blue-100 dark:border-zinc-800 flex items-center justify-center min-h-[250px]">
              <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 leading-relaxed uppercase">
                {categoriaActual}
              </p>
            
        </div>
          <div className="flex flex-row gap-6 translate-y-15">
            {categoriasDisponibles.length>0 &&(
              <button
                  onClick={cargarCategoriaAleatoria}
                  className="active:scale-95 text-base flex h-12 items-center justify-center rounded-full bg-white border-2 border-[#5170F5] px-10 text-[#5170F5] font-bold transition-colors hover:bg-blue-50 shadow-sm"
                >
                  SIGUIENTE <br/> CATEGORÍA
                </button>
            )}
            <Link
              className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/resultado?tarea=categorías&parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}
            >
              FINALIZAR
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
