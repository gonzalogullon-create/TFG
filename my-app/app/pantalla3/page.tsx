"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const [parSeleccionado, setParSeleccionado] = useState("");
  const [localizacion, setLocalizacion] = useState("");       
  const [frecuencia, setFrecuencia] = useState("");
  const [intensidad, setIntensidad] = useState("");

  const [datosTSV, setDatosTSV] = useState<{ col1: string; col2: string }[]>([]);
  const [listaPares, setListaPares] = useState<string[]>([]);
  
  // 1. NUEVA VARIABLE: Para controlar cuándo mostrar el mensaje de error
  const [mostrarError, setMostrarError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const datosGuardados = localStorage.getItem("pacienteActual");
        
    if (datosGuardados) {
      try {
        const expediente = JSON.parse(datosGuardados);        
        if (expediente && expediente.localizacionesTSV) {
          const localizaciones = expediente.localizacionesTSV;          
          setDatosTSV(localizaciones); 
          const nuevosPares: string[] = [];
          
          for (let i = 0; i < localizaciones.length - 1; i++) {
            const contactoActual = localizaciones[i].col1?.trim();
            const contactoSiguiente = localizaciones[i + 1].col1?.trim();
            
            if (contactoActual && contactoSiguiente) {
              const letraActual = contactoActual.replace(/[0-9]/g, "");
              const letraSiguiente = contactoSiguiente.replace(/[0-9]/g, "");
              
              if (letraActual === letraSiguiente) {
                nuevosPares.push(`${contactoActual}-${contactoSiguiente}`);
              }
            }
          }          
          setListaPares(nuevosPares);
        }
      } catch (error) {
        console.error("Error al leer localStorage", error);
      }
    }
  }, []);

  const validarYAvanzar = () => {
    if (!parSeleccionado || !frecuencia || !intensidad) {
      setMostrarError(true);
      return; 
    }

    setMostrarError(false);
    router.push(`/pantalla4?parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-start gap-6 text-center sm:items-start sm:text-center">
          <h1 className="max-w-xs self-start -translate-x-10 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
          ESTIMULACIÓN
          </h1>
          
          <div className="flex flex-row items-center justify-between w-[400px] -translate-y-5">
            <h2 className="max-w-xs text-xl leading-10 dark:text-zinc-50">
              CONTACTOS
            </h2>
            <select
            className="w-30 -translate-x-10 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black bg-white"
            value={parSeleccionado} 
            onChange={(e) => {
              setParSeleccionado(e.target.value);
              setMostrarError(false); 
            }}
            >
            <option value=""></option>
            {listaPares.map((par, index) => (
                <option key={index} value={par}>
                  {par}
                </option>
            ))}
            </select>
          </div>
          
          <div className="flex flex-row items-center justify-between w-[400px] -translate-y-5">
            <h2 className="max-w-xs text-xl leading-10 dark:text-zinc-50">
              FRECUENCIA
            </h2>
            <select
            className="w-30 -translate-x-10 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black bg-white"
            value={frecuencia} 
            onChange={(e) => {
              setFrecuencia(e.target.value);
              setMostrarError(false);
            }}
            >
            <option value=""></option>
            <option value="1 Hz">{"1 Hz"}</option>
            <option value="10 Hz">{"10 Hz"}</option>
            <option value="20 Hz">{"20 Hz"}</option>
            <option value="25 Hz">{"25 Hz"}</option>
            <option value="30 Hz">{"30 Hz"}</option>
            <option value="40 Hz">{"40 Hz"}</option>
            <option value="50 Hz">{"50 Hz"}</option>
            </select>
          </div>
           <div className="flex flex-row items-center justify-between w-[400px] -translate-y-5">
            <h2 className="max-w-xs text-xl leading-10 dark:text-zinc-50">
              INTENSIDAD
            </h2>
            <select
            className="w-30 -translate-x-10 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black bg-white"
            value={intensidad} 
            onChange={(e) => {
              setIntensidad(e.target.value);
              setMostrarError(false); 
            }}
            >
            <option value=""></option>
            <option value="1 mA">{"1 mA"}</option>
            <option value="2 mA">{"2 mA"}</option>
            <option value="3 mA">{"3 mA"}</option>
            <option value="4 mA">{"4 mA"}</option>
            <option value="5 mA">{"5 mA"}</option>
            <option value="6 mA">{"6 mA"}</option>
            <option value="7 mA">{"7 mA"}</option>
            <option value="8 mA">{"8 mA"}</option>
            <option value="9 mA">{"9 mA"}</option>
            <option value="10 mA">{"10 mA"}</option>
            </select>
          </div>
        </div>

        <div className="h-10 mt-6">
          {mostrarError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-zinc-800 dark:border-red-900">
                <p className="font-medium text-red-500 text-sm text-center">
                  Por favor, seleccione Contactos, Frecuencia e Intensidad antes de continuar.
                </p>
            </div> 
          )}
        </div>

        <div className="flex flex-col gap-10 mt-4">
          <div className="flex flex-col gap-10 text-base font-medium sm:flex-row justify-center">
            <Link
            onClick={() => {
              localStorage.removeItem("misDatosTSV"); 
            }}
              className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              href="/pantalla5"
            >
              FINALIZAR
            </Link>
            <button
              className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-[158px]"
              onClick={validarYAvanzar}
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}