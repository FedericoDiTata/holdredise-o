"use client"

import { useEffect, useState } from "react"
import {
  motion,
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
  /** Dispara la secuencia (lo maneja PinScroll con scroll progress). */
  active: boolean
  /** Transforms scroll-linked que inyecta PinScroll (scale + rotate). */
  style?: MotionStyle
}

/**
 * Punchline pineada. Secuencia cuando PinScroll marca `active`:
 *   1. La frase se ESCRIBE con typewriter (como el hero)
 *   2. Al terminar, el fondo hace un strobe negro/azul/blanco rápido
 *      mientras las buzzwords se estampan desparramadas
 *   3. Todo queda vivo: float orgánico + neón pulsante por palabra
 */
export function PunchlinePinned({ active, style }: Props) {
  const reduce = useReducedMotion()

  const [typedCount, setTypedCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active || done) return
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce])

  return (
    <motion.section
      className="grot-punch"
      style={style}
      aria-label="Manifiesto"
      initial={false}
      animate={
        done && !reduce
          ? { backgroundColor: STROBE }
          : { backgroundColor: "#1D1D1B" }
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
            {!reduce && active ? (
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
              initial={false}
              animate={
                done || reduce
                  ? { opacity: 1, scale: 1, y: 0, rotate: w.rotate }
                  : {
                      opacity: 0,
                      scale: 2.3,
                      y: 60,
                      rotate: w.rotate * 5,
                    }
              }
              transition={
                done && !reduce
                  ? {
                      type: "spring",
                      stiffness: 190,
                      damping: 12,
                      mass: 1,
                      delay: 0.2 + i * 0.3,
                    }
                  : { duration: 0 }
              }
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
          initial={false}
          animate={done || reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: done ? 1.2 : 0 }}
        >
          Nosotras preferimos <em>no venderte humo</em>.
        </motion.p>
      </div>
    </motion.section>
  )
}
