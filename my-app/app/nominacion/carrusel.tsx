"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarruselProps {
  imagenes: string[];
}

export default function Carrusel({ imagenes }: CarruselProps) {
  const [indiceActual, setIndiceActual] = useState(0);

  if (!imagenes || imagenes.length === 0) {
    return <div className="w-full h-64 bg-gray-200 flex items-center justify-center">No hay imágenes</div>;
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
   
    <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-xl shadow-lg bg-gray-100">
      
      {imagenes.map((ruta, index) => (
        <div
          key={index}
          className={`absolute inset-0 
            ${index === indiceActual ? "opacity-100" : "opacity-0"}
          `}
        >
          <Image
            src={ruta}
            alt={`Foto ${index}`}
            fill
            className="object-contain" 
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}