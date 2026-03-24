"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  const [mostrarText, setMostrarText] = useState(false);
  const [alteraciones, setAlteraciones] = useState("");

  const searchParams = useSearchParams();
  const router= useRouter();

  const nombreTarea = searchParams.get("tarea") || "";
  const rutaTarea= nombreTarea.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  const parSeleccionado = searchParams.get("parSeleccionado") || "";

  const guardarResultadoEEG_YAvanzar = (resultadoClinico: string) => {
    const expedienteGuardado = localStorage.getItem("pacienteActual");

    if (expedienteGuardado) {
      try {
        const expediente = JSON.parse(expedienteGuardado);

        if (!expediente.registroEstimulacion) {
          expediente.registroEstimulacion = [];
        }

        const indiceExistente = expediente.registroEstimulacion.findIndex(
          (registro: any) => registro.par === parSeleccionado && registro.tarea === nombreTarea && registro.resultado.includes("EEG") 
        );

        if (indiceExistente !== -1) {
          expediente.registroEstimulacion[indiceExistente].resultado = resultadoClinico;
          expediente.registroEstimulacion[indiceExistente].fecha = new Date().toLocaleString();
          console.log("Registro EEG previo actualizado con éxito.");
        } else {
          const nuevoRegistro = {
            par: parSeleccionado,
            tarea: nombreTarea,
            resultado: resultadoClinico, 
            fecha: new Date().toLocaleString()
          };
          expediente.registroEstimulacion.push(nuevoRegistro);
          console.log("Nuevo registro EEG guardado:", nuevoRegistro);
        }

        localStorage.setItem("pacienteActual", JSON.stringify(expediente));

      } catch (error) {
        console.error("Error al guardar el resultado EEG", error);
      }
    } else {
      console.warn("No hay ningún paciente activo guardado en memoria.");
    }

    router.push("/pantalla3");
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center pt-22 pb-32 px-13 bg-blue-50 dark:bg-black">
        <div className="w-full flex flex-col items-start gap-6 mb-12">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            {nombreTarea.toUpperCase()}
          </h1>
          <h2 className="text-2xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
          RESULTADO EEG
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-start gap-30 h-[120px] "> 
            <button
                onClick={() => guardarResultadoEEG_YAvanzar("Sin alteraciones EEG (OK)")}
                className="active:scale-95 transition-opacity hover:opacity-70"
            >
              <Image
                src="/Tick.webp"
                alt="Buen resultado"
                width={120}
                height={120}
              />
            </button>
            <button
                onClick={() => setMostrarText(!mostrarText)} 
                className="active:scale-95 transition-opacity hover:opacity-70 focus:outline-none"
                >
              <Image
                src="/Cruz.webp"
                alt="Mal resultado"
                width={120}
                height={120}
              />
            </button>
            </div>
              {mostrarText && (
                <>
                  <div className="flex flex-col translate-y-10">
                    <textarea
                      autoFocus
                      placeholder="Escriba las alteraciones clínicas..."
                      rows={4}
                      value={alteraciones}
                      onChange={(e) => setAlteraciones(e.target.value)}
                      className="border-2 border-blue-200 rounded-lg p-3 text-black w-100 h-40 focus:border-blue-300 outline-none resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-10 mt-10 translate-y-10">
                    <div className="flex flex-col gap-10 text-base font-medium sm:flex-row justify-center">
                      {nombreTarea==="detección de síntomas" ? (
                        <Link
                        className="flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
                        href={`/pantalla4?parSeleccionado=${parSeleccionado}`}    
                      >
                        CANCELAR REGISTRO
                      </Link>
                      ):(
                        <Link
                        className="flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
                        href={`/${rutaTarea}?parSeleccionado=${parSeleccionado}`}    
                        >
                        CANCELAR REGISTRO
                      </Link>
                      )}
                      <button
                        className="flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
                        onClick={() => {
                          if (!alteraciones.trim()) {
                            guardarResultadoEEG_YAvanzar("Sin alteraciones EEG (OK)");
                          }
                          else{
                            guardarResultadoEEG_YAvanzar(`Alteración EEG: ${alteraciones}`);
                          }
                        }}
                      >
                        SIGUIENTE
                      </button>
                    </div>
                  </div>
                </>
              )}
        </div>
      </main>
    </div>
  );
}
