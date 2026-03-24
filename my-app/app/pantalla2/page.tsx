"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const [nombre, setNombre] = useState(""); 
  const [NHC, setNHC] = useState("");
  const [edad, setEdad] = useState("");
  const [sospecha_lesion, setSospecha_lesion] = useState("");

  const [datosLocalizaciones, setDatosLocalizaciones] = useState<{ col1: string; col2: string }[]>([]);
  const [nombreArchivo, setNombreArchivo] = useState(""); 

  const [mensajeGuardado, setMensajeGuardado] = useState("");

  const procesarArchivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    setNombreArchivo(archivo.name); 

    const lector = new FileReader();
    lector.onload = (e) => {
      const texto = e.target?.result as string;
      const filas = texto.split(/\r?\n/);
      const datosTemporales = [];

      for (let i = 1; i < filas.length; i++) {
        const filaActual = filas[i].trim();
        if (!filaActual) continue;

        const columnas = filaActual.split("\t");
        if (columnas.length >= 2) {
          datosTemporales.push({
            col1: columnas[0].trim(),
            col2: columnas[20].trim(),
          });
        }
      }
      setDatosLocalizaciones(datosTemporales);
      setMensajeGuardado("");
    };
    lector.readAsText(archivo);
  };

  const guardarPaciente = () => {
    if (!nombre || !NHC || !edad || !sospecha_lesion || datosLocalizaciones.length===0) {
      setMensajeGuardado("Por favor, introduzca todos los datos del paciente.");
      return;
    }
    
    const pacientePrevio = localStorage.getItem("pacienteActual");
    
    if (pacientePrevio) {
      try {
        const datosPrevios = JSON.parse(pacientePrevio);
        const confirmacion = window.confirm(
          `CUIDADO: Ya tienes un paciente guardado activo: "${datosPrevios.datosPersonales.nombre}".\n\nSi guardas ahora, el paciente anterior se borrará.\n\n¿Estás seguro de que quieres sobrescribirlo?`
        );        
        if (!confirmacion) {
          setMensajeGuardado(" Acción cancelada. Se ha mantenido al paciente anterior.");
          return;
        }
      } catch (error) {
        console.error("No se pudo leer el paciente anterior", error);
      }
    }

    const pacienteData = {
      datosPersonales: {
        nombre: nombre,
        nhc: NHC,
        edad: edad,
        sospecha: sospecha_lesion
      },
      localizacionesTSV: datosLocalizaciones
    };
    try {
      localStorage.setItem("pacienteActual", JSON.stringify(pacienteData));
      setMensajeGuardado("Paciente guardado correctamente en la memoria.");
    } catch (error) {
      console.error("Error al guardar el paciente", error);
      setMensajeGuardado("Error al guardar. Quizás el archivo es demasiado grande.");
    }
  };


  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-start gap-6 text-center sm:items-start sm:text-center">
          <h1 className="self-start -translate-x-10 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            DATOS DEL PACIENTE
          </h1>
          <div className="flex flex-row items-center justify-between w-[400px] -translate-y-7">
            <h2 className="text-xl leading-10 dark:text-zinc-50 text-left">
              NOMBRE
            </h2>
            <input type="text"
            className="w-48 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black"
            placeholder="Nombre..."
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-between w-[400px] -translate-y-7">
            <h2 className=" text-xl leading-10 dark:text-zinc-50">
              NHC
            </h2>
            <input type="text"
            className="w-48 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black"
            placeholder="NHC..."
            value={NHC} 
            onChange={(e) => setNHC(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-between w-[400px] -translate-y-7">
            <h2 className="max-w-xs text-xl leading-10 dark:text-zinc-50">
              EDAD
            </h2>
            <input type="text"
            className="w-48 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black"
            placeholder="Edad..."
            value={edad} 
            onChange={(e) => setEdad(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-between w-[400px] -translate-y-7">
              <h2 className="text-xl leading-10 dark:text-zinc-50 text-left">
                SOSPECHA LESIÓN
              </h2>
              <input type="text"
              className="w-48 py-1 px-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 text-black"
              placeholder="Sospecha lesión..."
              value={sospecha_lesion} 
              onChange={(e) => setSospecha_lesion(e.target.value)}
              />
            </div>
        </div>
        <div className="flex flex-row">
          <h1 className=" mt-10 max-w-xs self-start -translate-x-23 text-center  text-l font-semibold leading-6 tracking-tight dark:text-zinc-50">
            ADJUNTAR BASE DE DATOS <br/> LOCALIZACIONES ANATÓMICAS
          </h1>
          <label className="flex h-12 w-12 cursor-pointer items-center justify-center translate-y-10 rounded-full bg-[#5170F5] px-1 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc]">
            <Image
              className="invert"
              src="/45162.png"
              alt="Icono descarga"
              width={25}
              height={10}
            />
            <input 
                type="file" 
                accept=".tsv, .txt" 
                onChange={procesarArchivo} 
                className="hidden" 
              />
          </label>
          {nombreArchivo && (
            <p className="mt-14 translate-x-3 text-sm text-[#5170F5] font-medium">
              Archivo cargado: {nombreArchivo}
            </p>
          )}
        </div>
              
        {mensajeGuardado && (
          <div className="mt-4 p-3 rounded-lg bg-zinc-100 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
             <p className={`font-medium ${mensajeGuardado.includes("correctamente") ? "text-green-600" : "text-red-500"}`}>
               {mensajeGuardado}
             </p>
          </div>
        )}
        
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex flex-col gap-10 text-base font-medium sm:flex-row justify-center">
            <button
              onClick={guardarPaciente}
              className="flex h-14 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
            >
              GUARDAR PACIENTE
            </button>
            <Link
              className="flex h-14 flex-col items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href="/pantalla3"
            >
             <span>SEGUIR CON </span> 
             <span>ÚLTIMO PACIENTE</span> 
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
