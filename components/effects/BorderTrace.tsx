"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import "./border-trace.css"

type Props = {
  /** Color del trazo. Default: accent azul. */
  color?: string
  /** Stroke width en px. Default 1. */
  strokeWidth?: number
  /** Duración del recorrido en s. */
  duration?: number
  /** Delay antes de empezar el trazo. */
  delay?: number
  /** Si true, el border se desvanece después de completarse. */
  fadeOut?: boolean
}

/**
 * BorderTrace — una línea accent recorre los 4 lados del card en sentido
 * horario y después se desvanece. Es el efecto "running border" de
 * motion design editorial: shockeante porque dibuja, no es permanente.
 *
 * Implementación con SVG + stroke-dashoffset. `pathLength="1"` normaliza
 * el path para que dasharray="1" cubra el perímetro completo. Animar
 * strokeDashoffset 1 → 0 dibuja el path; opacity 1 → 0 después fade.
 *
 * Se posiciona absolute sobre el card padre (que debe tener
 * position: relative o isolation). preserveAspectRatio="none" permite
 * que el rectángulo se estire al tamaño exacto del card.
 *
 * Respeta prefers-reduced-motion (no renderiza nada).
 */
export function BorderTrace({
  color = "var(--accent)",
  strokeWidth = 1,
  duration = 1.4,
  delay = 0,
  fadeOut = true,
}: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: "-12%" })
  const shouldAnimate = inView && !reduce

  if (reduce) return null

  return (
    <svg
      ref={ref}
      className="hold-border-trace"
      aria-hidden
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <motion.rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray={1}
        initial={{ strokeDashoffset: 1, opacity: 1 }}
        animate={
          shouldAnimate
            ? {
                strokeDashoffset: 0,
                opacity: fadeOut ? [1, 1, 0] : 1,
              }
            : { strokeDashoffset: 1, opacity: 1 }
        }
        transition={{
          strokeDashoffset: {
            duration,
            ease: [0.62, 0.04, 0.36, 0.97],
            delay,
          },
          opacity: fadeOut
            ? {
                duration: 0.7,
                times: [0, 0.6, 1],
                delay: delay + duration,
              }
            : { duration: 0 },
        }}
      />
    </svg>
  )
}
