"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface RegistroTabla {
  par: string;
  tarea: string;
  clinico: string;
  eeg: string;
}

export default function Home() {

  const [datosPaciente, setDatosPaciente] = useState<any>(null);
  const [tablaResultados, setTablaResultados] = useState<RegistroTabla[]>([]);

  const router = useRouter();

  useEffect(() => {
    const expedienteGuardado = localStorage.getItem("pacienteActual");

    if (expedienteGuardado) {
      try {
        const expediente = JSON.parse(expedienteGuardado);
        setDatosPaciente(expediente.datosPersonales);

        if (expediente.registroEstimulacion) {
          const agrupados: { [clave: string]: RegistroTabla } = {};

          expediente.registroEstimulacion.forEach((registro: any) => {
            const claveId = `${registro.par}-${registro.tarea}`;

            if (!agrupados[claveId]) {
              agrupados[claveId] = {
                par: registro.par,
                tarea: registro.tarea,
                clinico: "No evaluado",
                eeg: "No evaluado",
              };
            }

            if (registro.resultado.includes("EEG")) {
              agrupados[claveId].eeg = registro.resultado.replace("Alteración EEG: ", "");
            } else {
              agrupados[claveId].clinico = registro.resultado.replace("Alteración: ", "");
            }
          });

          setTablaResultados(Object.values(agrupados));
        }
      } catch (error) {
        console.error("Error al leer el expediente", error);
      }
    }
  }, []);

  const imprimirPDF = () => {
    window.print();
  };

  const fechaHoy = new Date().toLocaleDateString();


  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex self-start min-h-screen w-full flex-col items-center py-20 px-16 bg-blue-50 dark:bg-black print:bg-white print:py-10 print:px-12 print:text-black">
        
        <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-12 print:shadow-none print:border-none print:p-0 text-black dark:text-zinc-100 print:text-black">
          
          <div className="border-b-2 border-zinc-800 pb-6 mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
              Informe de Estimulación Cortical
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
              Fecha del informe: {fechaHoy}
            </p>
          </div>
          
          {datosPaciente ? (
            <div className="mb-8 text-lg leading-relaxed">
              <p><strong>Paciente:</strong> {datosPaciente.nombre || "No especificado"}</p>
              <p><strong>NHC:</strong> {datosPaciente.nhc || "No especificado"}</p>
              <p><strong>Edad:</strong> {datosPaciente.edad || "No especificada"}</p>
              <p><strong>Sospecha Clínica:</strong> {datosPaciente.sospecha || "No especificada"}</p>
            </div>
          ) : (
            <p className="text-zinc-500 mb-8">Cargando datos del paciente...</p>
          )}

          <div className="mb-8">
            <p className="text-lg leading-relaxed text-justify">
              El presente documento detalla los resultados obtenidos durante la sesión de estimulación eléctrica al paciente tras estéreo EEG. 
              A continuación, se exponen las tareas evaluadas para cada par de contactos anatómicos, 
              indicando tanto la respuesta clínica observada en el paciente como los hallazgos registrados en el 
              electroencefalograma (EEG).
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 uppercase border-b border-zinc-300 pb-2">Hallazgos por Localización</h2>
            
            {tablaResultados.length > 0 ? (
              <ul className="flex flex-col gap-6">
                {tablaResultados.map((fila, index) => (
                  <li key={index} className="text-lg leading-relaxed">
                    <p className="mb-1">
                      <strong className="print:text-black">
                        ▶ Contactos {fila.par} — Tarea: <span className="capitalize">{fila.tarea}</span>
                      </strong>
                    </p>
                    <p className="pl-6">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 print:text-zinc-800">Clínica:</span> {fila.clinico}
                    </p>
                    <p className="pl-6">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 print:text-zinc-800">EEG:</span> {fila.eeg}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-500 italic">No se han registrado pruebas de estimulación para este paciente.</p>
            )}
          </div>

        

        </div>

        <div className="flex flex-col gap-6 mt-12 print:hidden w-full max-w-4xl items-center">
          <div className="flex flex-col gap-6 sm:flex-row justify-center w-full">
            
            <button
              onClick={imprimirPDF}
              className="active:scale-95 flex h-14 items-center justify-center rounded-full bg-zinc-800 px-8 text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-black dark:hover:bg-white font-medium shadow-md text-center"
            >
              EXPORTAR A PDF / IMPRIMIR
            </button>

            <Link
              className="active:scale-95 flex h-14 items-center justify-center rounded-full bg-[#5170F5] px-8 text-white transition-colors hover:bg-[#879CFA] font-medium shadow-md text-center"
              href="/pantalla3"
            >
              EVALUAR OTRO CONTACTO
            </Link>
            
            <Link
              className="active:scale-95 flex h-14 items-center justify-center rounded-full bg-emerald-600 px-8 text-white transition-colors hover:bg-emerald-500 font-medium shadow-md text-center"
              href="/"
            >
              GUARDAR Y CONTINUAR OTRO DÍA
            </Link>

            <button
              onClick={() => {
                const seguro = window.confirm("¿Estás seguro de que quieres borrar a este paciente de la memoria? Asegúrate de haber exportado el PDF primero.");
                if (seguro) {
                  localStorage.removeItem("pacienteActual");
                  router.push("/"); 
                }
              }}
              className="active:scale-95 flex h-14 items-center justify-center rounded-full bg-red-500 px-7 text-white transition-colors hover:bg-red-400 font-medium shadow-md text-center"
            >
              CERRAR Y BORRAR DATOS
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}