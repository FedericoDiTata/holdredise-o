"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { EASE_WIPE } from "@/lib/motion"
import "./section-wipe.css"

type Props = {
  children: ReactNode
  /** Color del rectángulo del wipe. Default: --accent azul. */
  color?: string
  /** Duración total del wipe en s. Default 1.1s. */
  duration?: number
  /** Delay antes de empezar (s). */
  delay?: number
  className?: string
}

/**
 * SectionWipe — el efecto "shockeante" de agencia top.
 *
 * Un rectángulo del color accent cruza la sección de izquierda a derecha:
 * primero crece desde el borde izquierdo hasta cubrir todo (scaleX 0→1
 * con origin left), después se contrae hacia el borde derecho (scaleX
 * 1→0 con origin right). El contenido aparece detrás justo cuando el
 * cover está completamente extendido (~50% del tiempo total) — antes
 * está visualmente tapado por el rectángulo.
 *
 * Es el wipe clásico de motion design editorial: limpio, dramático,
 * inequívocamente intencional. Lo usan agencias top en transitions de
 * page / section reveals.
 *
 * Respeta `prefers-reduced-motion` (saltea el wipe, muestra el contenido
 * directo) y `once: true` (solo dispara la primera vez que se ve).
 */
export function SectionWipe({
  children,
  color = "var(--accent)",
  duration = 1.05,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: "-12%" })
  const shouldAnimate = inView && !reduce

  return (
    <div
      ref={ref}
      className={"hold-section-wipe" + (className ? ` ${className}` : "")}
    >
      <motion.div
        className="hold-section-wipe__cover"
        style={{ background: color }}
        initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
        animate={
          shouldAnimate
            ? {
                scaleX: [0, 1, 1, 0],
                transformOrigin: [
                  "0% 50%",
                  "0% 50%",
                  "100% 50%",
                  "100% 50%",
                ],
              }
            : { scaleX: 0 }
        }
        transition={{
          duration,
          times: [0, 0.46, 0.5, 1],
          ease: EASE_WIPE,
          delay,
        }}
      />
      <motion.div
        className="hold-section-wipe__content"
        initial={{ opacity: 0, y: 16 }}
        animate={
          shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }
        }
        transition={{
          duration: 0.5,
          delay: delay + duration * 0.46,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
