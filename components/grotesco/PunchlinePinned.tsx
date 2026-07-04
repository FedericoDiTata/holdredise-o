"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE_WIPE } from "@/lib/motion"
import "./punchline-pinned.css"

/* Las 3 buzzwords aparecen estampadas, cada una con su propio ángulo
 * y tratamiento (solid blanco / outline / solid accent). */
const WORDS = [
  { text: "awareness", variant: "outline", rotate: -3.5 },
  { text: "engagement", variant: "accent", rotate: 2 },
  { text: "funnel", variant: "solid", rotate: -1.5 },
] as const

/**
 * Punchline pineada: sección negra full-viewport con la frase completa
 * arriba y las 3 buzzwords estampándose gigantes debajo, cada una con
 * rotación propia y tratamiento distinto. La sección queda sticky y la
 * siguiente sección de la página se le monta encima al scrollear.
 *
 * El stamp: cada palabra entra con scale 1.6 a 1 + opacity, rápida y
 * seca, escalonada. Quedan ahí, apiladas como afiches pegados.
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
              style={{ rotate: `${w.rotate}deg` }}
              initial={
                reduce ? false : { opacity: 0, scale: 1.6 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.35,
                ease: [0.2, 0.9, 0.3, 1],
                delay: 0.5 + i * 0.3,
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="grot-punch__closer"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Nosotras preferimos <em>no venderte humo</em>.
        </motion.p>
      </div>
    </section>
  )
}
