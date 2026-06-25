"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"
import { EASE_WIPE } from "@/lib/motion"
import "./section-wipe.css"

type Props = {
  children: ReactNode
  /** Color de las líneas accent. Default: --accent azul. */
  color?: string
  /** Duración total en s. */
  duration?: number
  /** Delay inicial. */
  delay?: number
  className?: string
}

/**
 * SectionWipe rediseñado — "Split Reveal" editorial.
 *
 * Eliminado el approach de bloques sólidos accent (rectángulos rígidos
 * sin profundidad). Ahora el efecto es minimalista y arquitectónico:
 *
 *   1. Una línea horizontal accent fina (1px) se dibuja desde el centro
 *      hacia afuera (scaleX 0 → 1, origin center).
 *   2. El contenido se "rasga" abriendo desde esa línea central —
 *      clip-path desde polygon plano (línea horizontal) a rectángulo
 *      completo, acompañado de scale-up 1.04 → 1 + blur-fade 6px → 0.
 *   3. La línea accent se mantiene visible un instante y luego se
 *      desvanece (opacity 1 → 0).
 *
 * Es el "horizon split" que usan agencias top de motion design. Mucho
 * más editorial que cubrir la sección con bloques de color, da
 * sensación de profundidad por el clip + scale + blur combinados.
 *
 * Respeta prefers-reduced-motion: render directo sin animación.
 */
export function SectionWipe({
  children,
  color = "var(--accent)",
  duration = 1.1,
  delay = 0,
  className,
}: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div
        className={"hold-section-wipe" + (className ? ` ${className}` : "")}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={"hold-section-wipe" + (className ? ` ${className}` : "")}>
      <motion.div
        className="hold-section-wipe__line"
        style={{ background: color }}
        initial={{ scaleX: 0, opacity: 1 }}
        whileInView={{
          scaleX: [0, 1, 1, 1],
          opacity: [1, 1, 1, 0],
        }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{
          duration: duration * 1.15,
          times: [0, 0.32, 0.78, 1],
          ease: EASE_WIPE,
          delay,
        }}
      />

      <motion.div
        className="hold-section-wipe__content"
        initial={{
          clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          opacity: 0,
          scale: 1.04,
          filter: "blur(6px)",
        }}
        whileInView={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{
          clipPath: {
            duration: duration * 0.9,
            ease: EASE_WIPE,
            delay: delay + duration * 0.25,
          },
          opacity: {
            duration: duration * 0.7,
            ease: EASE_WIPE,
            delay: delay + duration * 0.3,
          },
          scale: {
            duration: duration * 1.1,
            ease: [0.2, 0.8, 0.2, 1],
            delay: delay + duration * 0.3,
          },
          filter: {
            duration: duration * 0.8,
            ease: EASE_WIPE,
            delay: delay + duration * 0.3,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
