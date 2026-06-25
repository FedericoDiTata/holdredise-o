"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"
import "./section-wipe.css"

type Props = {
  children: ReactNode
  /** Color del blob de fondo. Default: --accent azul. */
  color?: string
  /** Delay inicial antes de empezar. */
  delay?: number
  className?: string
}

/**
 * SectionWipe rediseñado — "Bloom Reveal" creativo y cercano.
 *
 * Reemplaza el approach editorial anterior (líneas finas, clip-path
 * arquitectónico). Ahora es más orgánico:
 *
 *   1. Un blob accent difuso (radial gradient con blur grande) crece
 *      desde detrás del contenido y se desvanece — como un "spotlight"
 *      orgánico que ilumina el bloque por un instante.
 *
 *   2. El contenido emerge con SPRING OVERSHOOT (scale 0.92 → 1.02 → 1)
 *      en lugar de duration-based linear → movimiento natural, bouncy,
 *      más juguetón que la rigidez editorial anterior.
 *
 *   3. Sutil rotation tilt durante el reveal (-1.2° → 0°) para evitar
 *      el "snap to grid" que se sentía mecánico.
 *
 * Respeta prefers-reduced-motion: render directo, sin blob ni spring.
 */
export function SectionWipe({
  children,
  color = "var(--accent)",
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
        className="hold-section-wipe__bloom"
        style={
          {
            "--bloom-color": color,
            /* x/y como motion values para que framer combine el centrado
             * con el scale animado. Si lo dejábamos como `transform:
             * translate(-50%, -50%)` en CSS, framer lo sobrescribía al
             * aplicar `transform: scale(X)` inline → el bloom se iba a
             * una esquina en vez de quedar centrado. */
            x: "-50%",
            y: "-50%",
          } as React.CSSProperties
        }
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{
          scale: [0.4, 1.2, 1.5, 1.8],
          opacity: [0, 0.55, 0.35, 0],
        }}
        viewport={{ once: true, margin: "-10%", amount: 0.15 }}
        transition={{
          duration: 1.8,
          times: [0, 0.35, 0.65, 1],
          ease: [0.4, 0, 0.2, 1],
          delay,
        }}
      />

      <motion.div
        className="hold-section-wipe__content"
        initial={{ opacity: 0, scale: 0.92, y: 28, rotate: -1.2 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-10%", amount: 0.15 }}
        transition={{
          opacity: { duration: 0.6, delay: delay + 0.15 },
          scale: {
            type: "spring",
            stiffness: 80,
            damping: 13,
            mass: 0.9,
            delay: delay + 0.15,
          },
          y: {
            type: "spring",
            stiffness: 80,
            damping: 13,
            mass: 0.9,
            delay: delay + 0.15,
          },
          rotate: {
            type: "spring",
            stiffness: 60,
            damping: 14,
            delay: delay + 0.15,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
