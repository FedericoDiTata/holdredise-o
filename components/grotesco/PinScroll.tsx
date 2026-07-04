"use client"

import { useRef, useState } from "react"
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { PunchlinePinned } from "./PunchlinePinned"
import { TrabajosGrot } from "./TrabajosGrot"

/**
 * Overlap de secciones estilo "hero scroll animation": la punchline
 * pineada se encoge y rota levemente mientras Trabajos sube por encima
 * enderezándose. Un solo scrollYProgress maneja los dos lados.
 *
 * Además dispara la secuencia de la punchline (typewriter + strobe +
 * words) via el MISMO sistema de scroll: `enterProgress` mide la
 * entrada del wrapper al viewport y activa la secuencia cuando la
 * sección ya domina la pantalla. Nada de IntersectionObserver sobre
 * elementos sticky, que venía fallando silenciosamente.
 */
export function PinScroll() {
  const container = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  /* Progreso de ENTRADA: 0 cuando el top del wrapper toca el borde
   * inferior del viewport, 1 cuando llega al 25% superior. */
  const { scrollYProgress: enterProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  })

  useMotionValueEvent(enterProgress, "change", (v) => {
    if (v >= 1) setActive(true)
  })

  /* Ángulos y escalas contenidos para que no quede hueco a la
   * izquierda y se acomode rápido. */
  const punchScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const punchRotate = useTransform(scrollYProgress, [0, 0.5], [0, -3])
  const trabScale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1])
  const trabRotate = useTransform(scrollYProgress, [0, 0.4], [2.5, 0])

  return (
    <div ref={container} className="grot-pin-wrap">
      <PunchlinePinned
        active={active}
        style={
          reduce ? undefined : { scale: punchScale, rotate: punchRotate }
        }
      />
      <TrabajosGrot
        style={
          reduce ? undefined : { scale: trabScale, rotate: trabRotate }
        }
      />
    </div>
  )
}
