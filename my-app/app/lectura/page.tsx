"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams();
  const parSeleccionado = searchParams.get("parSeleccionado") || "";
  const frecuencia = searchParams.get("frecuencia") || "";
  const intensidad = searchParams.get("intensidad") || "";


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-blue-50 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs -translate-x-40 -translate-y-10 text-3xl font-semibold leading-10 tracking-tight dark:text-zinc-50">
            LECTURA
          </h1>
          <div className="w-full h-80 overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl p-4 md:p-4 shadow-lg border border-blue-100 dark:border-zinc-800">
            <p className="text-l md:text-l font-normal leading-relaxed text-zinc-800 dark:text-zinc-100 text-justify select-none whitespace-pre-line">

              {`Cuando yo tenía seis años vi en un libro sobre la selva virgen que se titulaba "Historias vividas", una magnífica lámina. Representaba una serpiente boa que se tragaba a una fiera. 
              El libro decía: "Las serpientes boas tragan sus presas enteras, sin masticarlas. Luego ya no pueden moverse y duermen durante los seis meses que dura su digestión". Reflexioné mucho entonces sobre las aventuras de la selva y a mi vez logré trazar con un lápiz de color mi primer dibujo. Mi dibujo número 1. 

              Enseñé mi obra de arte a las personas mayores y les pregunté si mi dibujo les daba miedo. Me respondieron: "¿Por qué habría de dar miedo un sombrero?". Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digiere un elefante. Dibujé entonces el interior de la serpiente boa a fin de que las personas mayores pudieran comprender. Siempre estas personas tienen necesidad de explicaciones.

              Las personas mayores me aconsejaron abandonar el dibujo de serpientes boas, ya fueran abiertas o cerradas, y poner mi interés en la geografía, la historia, el cálculo y la gramática. De esta manera a la edad de seis años abandoné una magnífica carrera de pintor. Había quedado desilusionado por el fracaso de mis dibujos. Las personas mayores nunca pueden comprender algo por sí solas y es muy aburrido para los niños tener que darles una y otra vez explicaciones.

              Tuve, pues, que elegir otro oficio y aprendí a pilotar aviones. He volado un poco por todo el mundo y la geografía, en verdad, me ha servido de mucho; al primer vistazo podía distinguir perfectamente la China de Arizona. Esto es muy útil, sobre todo si se pierde uno durante la noche.

              A lo largo de mi vida he tenido multitud de contactos con multitud de gente seria. Viví mucho con personas mayores y las he conocido muy de cerca; pero esto no ha mejorado demasiado mi opinión sobre ellas.

              Viví así, solo, sin nadie con quien hablar verdaderamente, hasta que tuve una avería en el desierto del Sahara, hace seis años. Algo se había roto en mi motor. Y como no llevaba conmigo ni mecánico ni pasajeros, me dispuse a realizar, solo, una reparación difícil. Era, para mí, una cuestión de vida o muerte. Tenía agua apenas para ocho días.

              La primera noche dormí sobre la arena a mil millas de toda tierra habitada. Estaba más aislado que un náufrago sobre una balsa en medio del océano. Imagínense, pues, mi sorpresa cuando, al romper el día, me despertó una extraña vocecita que decía:
              —¡Por favor..., dibújame un cordero!
              —¡Eh!
              —Dibújame un cordero...

              Di un salto sobre mis pies como si hubiera sido golpeado por un rayo. Me froté los ojos con fuerza. Miré bien. Y vi a un hombrecito del todo extraordinario, que me examinaba gravemente. 

              Miré, pues, esta aparición con los ojos redondos de asombro. No olviden que me encontraba a mil millas de toda región habitada. Cuando al fin logré hablar, le dije:
              —Pero... ¿qué haces tú aquí?
              Y él me repitió entonces, muy suavemente, como si fuera una cosa muy seria:
              —¡Por favor..., dibújame un cordero!

              Cuando el misterio es demasiado impresionante, es imposible desobedecer. Por absurdo que me pareciese, a mil millas de todo lugar habitado y en peligro de muerte, saqué de mi bolsillo una hoja de papel y una pluma. Le dije al hombrecito que no sabía dibujar. Me contestó:
              —No importa. Dibújame un cordero.

              Como jamás había dibujado un cordero, rehíce para él el de la boa cerrada. Y quedé estupefacto al oír que el hombrecito me respondía:
              —¡No, no! No quiero un elefante dentro de una boa. Una boa es muy peligrosa y un elefante ocupa mucho sitio. En mi tierra todo es muy pequeño. Necesito un cordero. Dibújame un cordero.

              Entonces dibujé. Él miró atentamente, y luego dijo:
              —No. Este está ya muy enfermo. Haz otro.
              Seguí dibujando. Mi amigo sonrió dulcemente, con indulgencia:
              —¿Ves? Esto no es un cordero, es un carnero. Tiene cuernos.

              Entonces, falto de paciencia, garabateé una caja y le solté:
              —Esta es la caja. El cordero que quieres está adentro.
              Y me sorprendí mucho al ver iluminarse el rostro de mi joven juez:
              —¡Exactamente así lo quería! ¿Crees que necesitará mucha hierba este cordero?
              —¿Por qué?
              —Porque en mi tierra todo es muy pequeño...
              —Alcanzará seguramente. Te he regalado un cordero bien pequeñito.
              Inclinó la cabeza hacia el dibujo:
              —No tan pequeño... ¡Anda! Se ha dormido...
              Y así fue como conocí al Principito.

              Me costó mucho tiempo comprender de dónde venía. El principito, que me hacía muchas preguntas, jamás parecía oír las mías. Fueron palabras pronunciadas al azar, las que poco a poco me revelaron todo. Así, cuando distinguió por vez primera mi avión me preguntó:
              —¿Qué cosa es esa?
              —Eso no es una cosa. Eso vuela. Es un avión, mi avión.

              Y me sentí orgulloso al decirle que volaba. Él entonces gritó:
              —¡Cómo! ¿Has caído del cielo?
              —Sí —le dije modestamente.
              —¡Ah, qué curioso!
              Y el principito lanzó una graciosa carcajada que me irritó mucho. Me gusta que mis desgracias se tomen en serio. Y añadió:
              —Entonces ¿tú también vienes del cielo? ¿De qué planeta eres tú?

              Divisé una luz en el misterio de su presencia y le pregunté bruscamente:
              —¿Tú vienes, pues, de otro planeta?
              Pero no me respondió; movía lentamente la cabeza mirando detenidamente mi avión.
              —Es cierto que, encima de eso, no puedes venir de muy lejos...

              Y se hundió en un ensueño que duró largo tiempo. Luego sacó de su bolsillo mi cordero y se abismó en la contemplación de su tesoro. Imagínense cómo me intrigó esta semiconfidencia sobre los otros planetas. Me esforcé, pues, en saber algo más:
              —¿De dónde vienes, muchachito? ¿Dónde está "tu casa"? ¿Dónde quieres llevarte mi cordero?

              Después de meditar en silencio me respondió:
              —Lo bueno de la caja que me has dado es que por la noche le servirá de casa.
              —Sin duda. Y si eres bueno te daré también una cuerda para atarlo durante el día. Y una estaca.

              Esta proposición pareció chocar al principito.
              —¿Atarlo? ¡Qué idea más rara!
              —Si no lo atas, se irá por donde sea y se perderá...

              Mi amigo soltó una nueva carcajada.
              —¿Y dónde quieres que vaya?
              —No sé, a cualquier parte. Derecho, siempre adelante...
              Entonces el principito señaló con gravedad:
              —¡No importa, es tan pequeña mi tierra!
              Y agregó, quizás, con un poco de melancolía:
              —Derecho, siempre adelante de uno, no se puede ir muy lejos...`}  
                        </p>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
            <Link
              className="active:scale-95 flex h-12 items-center justify-center rounded-full bg-[#5170F5] px-5 text-background transition-colors hover:bg-[#879CFA] dark:hover:bg-[#ccc] w-158px"
              href={`/resultado?tarea=lectura&parSeleccionado=${parSeleccionado}&frecuencia=${frecuencia}&intensidad=${intensidad}`}
            >
              FINALIZAR
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
