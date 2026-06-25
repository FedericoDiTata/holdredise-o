"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"
import "./section-wipe.css"

type Props = {
  children: ReactNode
  /** Color del blob accent de fondo. Default: --accent. */
  color?: string
  /** Delay inicial antes de empezar la animación. */
  delay?: number
  className?: string
}

/**
 * SectionWipe — Bloom Reveal.
 *
 * Bg: un blob accent difuso crece detrás del contenido y se desvanece.
 * Fg: el contenido emerge con spring overshoot orgánico — robusto y
 * obvio, no editorial-sutil.
 *
 * Simplificación clave (post-feedback "no veo animaciones"):
 *   - El viewport no usa margin negativo (eso requería que el elemento
 *     entrara MÁS adentro del viewport antes de disparar; con secciones
 *     de padding grande, podía no dispararse nunca).
 *   - `amount: 0.15` dispara cuando 15% del elemento es visible.
 *   - Sin clip-path: el initial es solo opacity + y + scale, robusto
 *     entre browsers (clip-path con polygon collapsado podía dejar el
 *     content invisible si la transición fallaba).
 *
 * Respeta prefers-reduced-motion: render directo sin animación.
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
            /* x/y como motion values para que framer combine con scale. */
            x: "-50%",
            y: "-50%",
          } as React.CSSProperties
        }
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{
          scale: [0.4, 1.3, 1.8, 2.1],
          opacity: [0, 0.7, 0.4, 0],
        }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.6,
          times: [0, 0.35, 0.7, 1],
          ease: [0.4, 0, 0.2, 1],
          delay,
        }}
      />

      <motion.div
        className="hold-section-wipe__content"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          opacity: {
            duration: 0.55,
            ease: [0.2, 0.8, 0.2, 1],
            delay: delay + 0.1,
          },
          y: {
            type: "spring",
            stiffness: 100,
            damping: 16,
            mass: 0.9,
            delay: delay + 0.1,
          },
          scale: {
            type: "spring",
            stiffness: 90,
            damping: 14,
            mass: 0.9,
            delay: delay + 0.1,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
