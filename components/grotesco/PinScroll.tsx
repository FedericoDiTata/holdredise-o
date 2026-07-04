"use client"

import { useRef } from "react"
import {
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { PunchlinePinned } from "./PunchlinePinned"
import { TrabajosGrot } from "./TrabajosGrot"

/**
 * Overlap de secciones estilo "hero scroll animation" (ui-layouts,
 * adaptado a nuestro stack): la punchline pineada se ENCOGE y rota
 * levemente mientras Trabajos sube por encima enderezándose desde una
 * rotación opuesta. Un solo scrollYProgress del contenedor maneja los
 * dos lados de la transición, así quedan perfectamente sincronizados.
 *
 * Los transforms terminan en 0.65 del progreso (cuando Trabajos ya
 * cubrió el viewport) para que el resto del scroll interno de Trabajos
 * quede derecho.
 */
export function PinScroll() {
  const container = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  /* Ángulos y escalas contenidos: con rotate 5 y scale 0.92 quedaba un
   * hueco grande a la izquierda y tardaba en acomodarse. Con 2.5 grados
   * y settle al 40% del progreso, la sección entra apenas ladeada y se
   * endereza enseguida. */
  const punchScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const punchRotate = useTransform(scrollYProgress, [0, 0.5], [0, -3])
  const trabScale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1])
  const trabRotate = useTransform(scrollYProgress, [0, 0.4], [2.5, 0])

  return (
    <div ref={container} className="grot-pin-wrap">
      <PunchlinePinned
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
