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

  const punchScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.86])
  const punchRotate = useTransform(scrollYProgress, [0, 0.65], [0, -5])
  const trabScale = useTransform(scrollYProgress, [0, 0.65], [0.92, 1])
  const trabRotate = useTransform(scrollYProgress, [0, 0.65], [5, 0])

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
