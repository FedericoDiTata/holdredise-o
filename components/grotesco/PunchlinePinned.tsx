"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE_WIPE } from "@/lib/motion"
import "./punchline-pinned.css"

/* Las 3 buzzwords: cada una con ángulo, tratamiento y vida propia
 * (float + neón con timings distintos, definidos en el CSS). */
const WORDS = [
  { text: "awareness", variant: "outline", rotate: -3.5 },
  { text: "engagement", variant: "accent", rotate: 2 },
  { text: "funnel", variant: "solid", rotate: -1.5 },
] as const

/**
 * Punchline pineada: sección negra full-viewport con la frase completa
 * y las 3 buzzwords estampándose gigantes. Cada palabra entra con un
 * spring con rebote (escala + rotación que se acomoda) y después queda
 * VIVA: float orgánico continuo + neón pulsante, cada una con duración
 * y delay distintos para que nunca se sincronicen.
 *
 * La sección queda sticky y la siguiente se le monta encima.
 */
export function PunchlinePinned() {
  const reduce = useReducedMotion()

  return (
    <section className="grot-punch" aria-label="Manifiesto">
      <div className="grot-punch__inner">
        <motion.h2
          className="grot-punch__phrase"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_WIPE }}
        >
          Algún día alguien te va a querer cobrar caro por decirte
        </motion.h2>

        <div className="grot-punch__words">
          {WORDS.map((w, i) => (
            <motion.span
              key={w.text}
              className={`grot-punch__word grot-punch__word--${w.variant}`}
              initial={
                reduce
                  ? false
                  : { opacity: 0, scale: 1.7, rotate: w.rotate * 4 }
              }
              whileInView={{ opacity: 1, scale: 1, rotate: w.rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 210,
                damping: 13,
                mass: 0.9,
                delay: 0.45 + i * 0.28,
              }}
            >
              <span className={`grot-punch__live grot-punch__live--${i}`}>
                {w.text}
              </span>
            </motion.span>
          ))}
        </div>

        <motion.p
          className="grot-punch__closer"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Nosotras preferimos <em>no venderte humo</em>.
        </motion.p>
      </div>
    </section>
  )
}
