"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion"
import "./punchline-pinned.css"

const PHRASE = "Algún día alguien te va a querer cobrar caro por decirte"
const TYPE_MS = 36

/* Las 3 buzzwords desparramadas: cada una con ángulo, tratamiento y
 * posición propia (los offsets viven en el CSS). */
const WORDS = [
  { text: "awareness", variant: "outline", rotate: -4 },
  { text: "engagement", variant: "accent", rotate: 2.5 },
  { text: "funnel", variant: "solid", rotate: -2 },
] as const

/* Strobe de fondo: negro, accent, blanco, accent, negro. Rápido, y
 * termina siempre en negro. */
const STROBE = ["#1D1D1B", "#2B63FF", "#FAFFFA", "#2B63FF", "#1D1D1B"]

type Props = {
  /** Transforms scroll-linked que inyecta PinScroll (scale + rotate). */
  style?: MotionStyle
}

/**
 * Punchline pineada. Secuencia al entrar al viewport:
 *   1. La frase se ESCRIBE con typewriter (como el hero)
 *   2. Al terminar, el fondo hace un strobe negro/azul/blanco rápido
 *      mientras las buzzwords se estampan desparramadas por la sección
 *   3. Todo queda vivo: float orgánico + neón pulsante por palabra
 *
 * La sección queda sticky y la siguiente se le monta encima (el
 * scale/rotate del overlap lo maneja PinScroll).
 */
export function PunchlinePinned({ style }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  const [typedCount, setTypedCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setTypedCount(PHRASE.length)
      setDone(true)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTypedCount(i)
      if (i >= PHRASE.length) {
        clearInterval(id)
        setDone(true)
      }
    }, TYPE_MS)
    return () => clearInterval(id)
  }, [inView, reduce])

  return (
    <motion.section
      ref={ref}
      className="grot-punch"
      style={style}
      aria-label="Manifiesto"
      animate={
        done && !reduce ? { backgroundColor: STROBE } : undefined
      }
      transition={{ duration: 1, times: [0, 0.22, 0.45, 0.7, 1], ease: "linear" }}
    >
      <div className="grot-punch__inner">
        <h2 className="grot-punch__phrase" aria-label={PHRASE}>
          <span aria-hidden>
            {PHRASE.slice(0, typedCount)}
            {!reduce ? (
              <span
                className={
                  "grot-punch__cursor" +
                  (done ? " grot-punch__cursor--blink" : "")
                }
                aria-hidden
              />
            ) : null}
          </span>
        </h2>

        <div className="grot-punch__words">
          {WORDS.map((w, i) => (
            <motion.span
              key={w.text}
              className={`grot-punch__word grot-punch__word--${w.variant}`}
              initial={
                reduce
                  ? { opacity: 1, scale: 1, rotate: w.rotate }
                  : { opacity: 0, scale: 1.8, rotate: w.rotate * 4 }
              }
              animate={
                done
                  ? { opacity: 1, scale: 1, rotate: w.rotate }
                  : undefined
              }
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 12,
                mass: 0.9,
                delay: 0.15 + i * 0.24,
              }}
            >
              <span
                className={`grot-punch__live grot-punch__live--${i}`}
                data-text={w.text}
              >
                {w.text}
              </span>
            </motion.span>
          ))}
        </div>

        <motion.p
          className="grot-punch__closer"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={done ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Nosotras preferimos <em>no venderte humo</em>.
        </motion.p>
      </div>
    </motion.section>
  )
}
