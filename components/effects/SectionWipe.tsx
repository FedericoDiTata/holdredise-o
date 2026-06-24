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
 * SectionWipe rediseñado — en vez de un rectángulo accent horizontal,
 * ahora son 5 stripes verticales accent que colapsan hacia arriba en
 * cascada de izquierda a derecha (delay escalonado). El efecto se siente
 * como una persiana editorial subiéndose, mucho más print-design / magazine.
 *
 * Las stripes pares tienen un hatch diagonal sutil para textura tactil
 * (no es un bloque plano de color).
 *
 * El contenido emerge cuando ~la mitad de las stripes ya colapsaron.
 *
 * Respeta prefers-reduced-motion: stripes hidden, contenido visible directo.
 */
export function SectionWipe({
  children,
  color = "var(--accent)",
  duration = 0.75,
  delay = 0,
  stripeStagger = 0.08,
  className,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <div className={"hold-section-wipe" + (className ? ` ${className}` : "")}>
      <div className="hold-section-wipe__stripes" aria-hidden>
        {Array.from({ length: STRIPES }).map((_, i) => (
          <motion.div
            key={i}
            className="hold-section-wipe__stripe"
            style={{ background: color, originY: 0 }}
            initial={{ scaleY: reduce ? 0 : 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              duration,
              delay: delay + i * stripeStagger,
              ease: EASE_WIPE,
            }}
          />
        ))}
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
