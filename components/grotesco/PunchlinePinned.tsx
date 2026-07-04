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
const TYPE_MS = 24

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
  /* amount 0.55: la secuencia arranca recién cuando más de la mitad de
   * la sección está en pantalla. Con 0.35 disparaba mientras todavía
   * estabas en Stats y llegabas con todo ya terminado. */
  const inView = useInView(ref, { once: true, amount: 0.55 })

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
      transition={{
        duration: 1.2,
        times: [0, 0.2, 0.42, 0.68, 1],
        ease: "linear",
        delay: 0.1,
      }}
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
                  ? { opacity: 1, scale: 1, y: 0, rotate: w.rotate }
                  : { opacity: 0, scale: 2.3, y: 60, rotate: w.rotate * 5 }
              }
              animate={
                done
                  ? { opacity: 1, scale: 1, y: 0, rotate: w.rotate }
                  : undefined
              }
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 12,
                mass: 1,
                delay: 0.2 + i * 0.3,
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
