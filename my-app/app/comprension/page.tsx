"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const preguntas = [
  { frase: "Para cortar el filete necesito un ___.", opciones: ["cuchillo", "tenedor", "cuchara", "vaso"], correcta: "cuchillo" },
  { frase: "Cuando llueve mucho, abro el ___.", opciones: ["armario", "libro", "paraguas", "grifo"], correcta: "paraguas" },
  { frase: "Me pongo los ___ en los pies.", opciones: ["anillos", "zapatos", "guantes", "sombreros"], correcta: "zapatos" },
  { frase: "El pájaro vuela por el ___.", opciones: ["suelo", "árbol", "mar", "cielo"], correcta: "cielo" },
  { frase: "Para dormir me acuesto en la ___.", opciones: ["silla", "cama", "mesa", "alfombra"], correcta: "cama" },
  { frase: "Bebo agua en un ___.", opciones: ["plato", "tenedor", "vaso", "servilleta"], correcta: "vaso" },
  { frase: "Enciendo la ___ porque está muy oscuro.", opciones: ["estufa", "luz", "radio", "televisión"], correcta: "luz" },
  { frase: "El perro es un ___ muy fiel.", opciones: ["mueble", "animal", "vehículo", "árbol"], correcta: "animal" },
  { frase: "Escribo la carta con un ___.", opciones: ["zapato", "bolígrafo", "martillo", "peine"], correcta: "bolígrafo" },
  { frase: "Compro el pan en la ___.", opciones: ["farmacia", "ferretería", "panadería", "librería"], correcta: "panadería" }
];

export default function Home() {

  const [indiceActual, setIndiceActual] = useState(0); 
  const [opcionPulsada, setOpcionPulsada] = useState<string | null>(null); 
  const [bloquearBotones, setBloquearBotones] = useState(false); 

  const preguntaActual = preguntas[indiceActual];

  const controlarRespuesta = (opcionElegida: string) => {
    if (bloquearBotones) return;
    setBloquearBotones(true);
    setOpcionPulsada(opcionElegida);
    setTimeout(() => {
      if (indiceActual<9){ 
        setIndiceActual((indiceAnterior) => indiceAnterior + 1);
      }
      else{
        setIndiceActual(0);
      }
      setOpcionPulsada(null); 
      setBloquearBotones(false); 
    }, 1000); 
  };

  const searchParams = useSearchParams();
  const parSeleccionado = searchParams.get("parSeleccionado") || "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w -translate-x-32 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            COMPRENSIÓN
          </h1>
          <div className="w-full flex flex-col items-center gap-12">
            <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-10 text-center shadow-lg border-3 border-blue-100 dark:border-zinc-800">
              <p className="text-2xl md:text-2xl font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed">
                {preguntaActual.frase}
              </p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {preguntaActual.opciones.map((opcion, index) => {
                let colorFondo = "bg-white dark:bg-zinc-800";
                let colorTexto = "text-zinc-800 dark:text-zinc-100";
                let colorBorde = "border-blue-200 dark:border-zinc-700";
                if (opcionPulsada !== null) {
                  if (opcion === preguntaActual.correcta) {
                    colorFondo = "bg-green-100 dark:bg-green-900";
                    colorTexto = "text-green-800 dark:text-green-100";
                    colorBorde = "border-green-500";
                  } else if (opcion === opcionPulsada && opcion !== preguntaActual.correcta) {
                    colorFondo = "bg-red-100 dark:bg-red-900";
                    colorTexto = "text-red-800 dark:text-red-100";
                    colorBorde = "border-red-500";
                  } else {
                    colorFondo = "bg-zinc-100 dark:bg-zinc-900";
                    colorTexto = "text-zinc-400 dark:text-zinc-600";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => controlarRespuesta(opcion)}
                    disabled={bloquearBotones}
                    className={`h-20 text-xl md:text-xl font-semibold rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 ${colorFondo} ${colorTexto} ${colorBorde}`}
                  >
                    {opcion.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <Link
              className=" active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/resultado?tarea=comprensión&parSeleccionado=${parSeleccionado}`}
            >
              FINALIZAR
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
