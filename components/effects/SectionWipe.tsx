"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"
import { EASE_WIPE } from "@/lib/motion"
import "./section-wipe.css"

const STRIPES = 5

type Props = {
  children: ReactNode
  /** Color de las stripes. Default: accent azul. */
  color?: string
  /** Duración del colapso de cada stripe en s. */
  duration?: number
  /** Delay inicial antes de empezar el cascada. */
  delay?: number
  /** Delay entre stripes (cascada). */
  stripeStagger?: number
  className?: string
}

/**
 * SectionWipe horizontal — 5 stripes accent que ocupan filas horizontales
 * y colapsan en zigzag: las stripes pares contraen desde la izquierda
 * (originX 100% → scaleX 0), las impares desde la derecha (originX 0% →
 * scaleX 0). El stagger entre stripes y la alternancia de dirección
 * crea un efecto de tejido / persianas que se abren editorialmente.
 *
 * Stripes pares con hatch diagonal para textura.
 *
 * Respeta prefers-reduced-motion: stripes hidden, contenido visible directo.
 */
export function SectionWipe({
  children,
  color = "var(--accent)",
  duration = 0.85,
  delay = 0,
  stripeStagger = 0.07,
  className,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <div className={"hold-section-wipe" + (className ? ` ${className}` : "")}>
      <div className="hold-section-wipe__stripes" aria-hidden>
        {Array.from({ length: STRIPES }).map((_, i) => {
          /* Alterna el origin: par anclado al lado derecho (colapsa hacia
           * la derecha), impar anclado a la izquierda (colapsa hacia la
           * izquierda). Da efecto zigzag editorial. */
          const originX = i % 2 === 0 ? "100%" : "0%"
          return (
            <motion.div
              key={i}
              className="hold-section-wipe__stripe"
              style={{ background: color, originX }}
              initial={{ scaleX: reduce ? 0 : 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration,
                delay: delay + i * stripeStagger,
                ease: EASE_WIPE,
              }}
            />
          )
        })}
      </div>
      <motion.div
        className="hold-section-wipe__content"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{
          duration: 0.6,
          delay: delay + STRIPES * stripeStagger * 0.55,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
