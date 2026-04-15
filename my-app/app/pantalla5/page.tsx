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
  frecuencia: string;
  intensidad: string;
  localizacion: string;
  fecha: string;
}

interface TempRegistroTabla extends RegistroTabla {
  _maxIntNum: number;
}

interface GrupoResultados {
  fecha: string;
  registros: RegistroTabla[];
}

export default function Home() {
  const [datosPaciente, setDatosPaciente] = useState<any>(null);
  const [tablaResultados, setTablaResultados] = useState<GrupoResultados[]>([]);  
  const router = useRouter();

  useEffect(() => {
    const expedienteGuardado = localStorage.getItem("pacienteActual");

    if (expedienteGuardado) {
      try {
        const expediente = JSON.parse(expedienteGuardado);
        setDatosPaciente(expediente.datosPersonales);

        if (expediente.registroEstimulacion) {
          const agrupados: { [clave: string]: TempRegistroTabla } = {};
          const localizaciones = expediente.localizacionesTSV || [];

          const obtenerNumeroIntensidad = (texto: string) => {
            if (!texto) return -1;
            const num = parseFloat(texto.replace(/[^0-9.]/g, ""));
            return isNaN(num) ? -1 : num;
          };

          expediente.registroEstimulacion.forEach((registro: any) => {
            const dia = registro.fecha ? registro.fecha.split(",")[0] : "Día desconocido";
            const claveId = `${registro.par}-${registro.tarea}-${registro.frecuencia}-${dia}`;
            const intActual = obtenerNumeroIntensidad(registro.intensidad);

            if (!agrupados[claveId]) {
              let localizacionAnatomica = "Desconocida";
              if (registro.par) {
                const primerContacto = registro.par.split("-")[0]; 
                const filaTSV = localizaciones.find((loc: any) => loc.col1 === primerContacto);
                if (filaTSV) {
                  localizacionAnatomica = filaTSV.col2;
                }
              }

              agrupados[claveId] = {
                par: registro.par,
                tarea: registro.tarea,
                clinico: "No evaluado",
                eeg: "No evaluado",
                frecuencia: registro.frecuencia || "N/A",
                intensidad: registro.intensidad || "N/A",
                localizacion: localizacionAnatomica,
                fecha: dia,
                _maxIntNum: intActual
              };
            } else {
              if (intActual > agrupados[claveId]._maxIntNum) {
                agrupados[claveId].intensidad = registro.intensidad;
                agrupados[claveId]._maxIntNum = intActual;
                agrupados[claveId].clinico = "No evaluado";
                agrupados[claveId].eeg = "No evaluado";
              }
            }

            if (intActual === agrupados[claveId]._maxIntNum) {
              if (registro.resultado.includes("EEG")) {
                agrupados[claveId].eeg = registro.resultado.replace("Alteración EEG: ", "");
              } else {
                agrupados[claveId].clinico = registro.resultado.replace("Alteración: ", "");
              }
            }
          });

          const listaFinal = Object.values(agrupados).map((item) => {
            const { _maxIntNum, ...filaLimpia } = item;
            return filaLimpia as RegistroTabla;
          });        

          const porFecha: { [fecha: string]: RegistroTabla[] } = {};
          listaFinal.forEach(fila => {
            if (!porFecha[fila.fecha]) porFecha[fila.fecha] = [];
            porFecha[fila.fecha].push(fila);
          });

          const arrayAgrupado = Object.keys(porFecha).map(fechaStr => {
            const registrosOrdenados = porFecha[fechaStr].sort((a, b) => {
              return a.par.localeCompare(b.par, undefined, { numeric: true, sensitivity: 'base' });
            });

            return {
              fecha: fechaStr,
              registros: registrosOrdenados
            };
          });

          setTablaResultados(arrayAgrupado);
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
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black print:block print:min-h-0 print:bg-white">
      <main className="flex self-start min-h-screen w-full flex-col items-center py-20 px-16 bg-blue-50 dark:bg-black print:block print:min-h-0 print:p-0 print:m-0 print:bg-white">
        
        <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-12 print:shadow-none print:border-none print:p-0 print:max-w-full text-black dark:text-zinc-100">
          
          <table className="w-full border-collapse">
            <thead className="table-header-group">
              <tr>
                <td className="pb-8 print:pb-16 print:pt-12">
                  <div className="flex w-full items-center">
                    <Image
                      src="/94_lapaz.png" 
                      alt="La Paz logo"
                      width={300}
                      height={100}
                      className="object-contain"
                      priority
                    />
                  </div>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  
                  <div className="border-b-2 border-zinc-800 print:border-zinc-300 pb-6 mb-8 mt-2 print:mt-0">
                    <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 print:text-black">
                      Informe de Estimulación Eléctrica Cerebral
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 print:text-zinc-600">
                      Fecha del informe: {fechaHoy}
                    </p>
                  </div>
                  
                  {datosPaciente ? (
                    <div className="mb-8 text-lg leading-relaxed print:text-black">
                      <p><strong>Paciente:</strong> {datosPaciente.nombre || "No especificado"}</p>
                      <p><strong>NHC:</strong> {datosPaciente.nhc || "No especificado"}</p>
                      <p><strong>Edad:</strong> {datosPaciente.edad || "No especificada"}</p>
                      <p><strong>Sospecha Clínica:</strong> {datosPaciente.sospecha || "No especificada"}</p>
                    </div>
                  ) : (
                    <p className="text-zinc-500 mb-8">Cargando datos del paciente...</p>
                  )}

                  <div className="mb-8">
                    <p className="text-lg leading-relaxed text-justify print:text-black">
                      Se realizó estimulación eléctrica cortical con pulsos bifásicos y en modo bipolar entre contactos adyacentes de todos los electrodos, explorando al paciente para observar respuestas clínicas. Se realizó mayoritariamente en trenes de alta frecuencia (50Hz); y de baja frecuencia en regiones motoras (1Hz) y de riesgo de crisis, con intensidades entre 1 y 10mA. 
                    </p>
                  </div>

                  <div className="mb-12">
                    <h2 className="text-xl font-bold mb-6 uppercase border-b border-zinc-300 pb-2 print:text-black">Hallazgos por Localización</h2>
                    
                    {tablaResultados.length > 0 ? (
                      <div className="flex flex-col gap-10">
                        {tablaResultados.map((grupo, indexGrupo) => (
                          <div key={indexGrupo} className="flex flex-col gap-6">
                            
                            <h3 className="text-l font-bold text-[#000000] border-b-2 border-zinc-200 pb-2 uppercase tracking-wide print:text-black print:border-zinc-100">
                              Resultados de la sesión: {grupo.fecha}
                            </h3>
                            
                            <ul className="flex flex-col gap-4">
                              {grupo.registros?.map((fila, index) => (
                                <li key={index} className="text-sm leading-relaxed break-inside-avoid">
                                  <p className="mb-1">
                                    <strong className="print:text-black">
                                    ▶ Contactos {fila.par} <span className="font-normal text-zinc-500">({fila.localizacion})</span> {fila.frecuencia} | {fila.intensidad} — Tarea: <span className="capitalize">{fila.tarea}</span>                                    </strong>
                                  </p>
                                  <p className="pl-5 text-zinc-800 dark:text-zinc-200 print:text-black">
                                    <span className="font-semibold text-zinc-900 dark:text-white print:text-black">Clínica:</span> {fila.clinico}
                                  </p>
                                  <p className="pl-5 text-zinc-800 dark:text-zinc-200 print:text-black">
                                    <span className="font-semibold text-zinc-900 dark:text-white print:text-black">EEG:</span> {fila.eeg}
                                  </p>
                                </li>
                              ))}
                            </ul>
                            
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-500 italic">No se han registrado pruebas de estimulación para este paciente.</p>
                    )}
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
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