"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { EASE_HOLD } from "@/lib/motion"

/* Set curado del vocabulario REAL de HOLD — no growth/engagement/scale.
 * Una sola palabra del título principal rota, el resto queda anclado.
 * Cycle lento (3.2s) y wipe vertical editorial: lejos de typing effect. */
const WORDS = [
  "marcas.",
  "negocios.",
  "comunidades.",
  "equipos.",
  "contenido.",
  "talents.",
] as const

const wordVariants = {
  enter: { y: "0.55em", opacity: 0, filter: "blur(8px)" },
  center: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: "-0.55em", opacity: 0, filter: "blur(8px)" },
}

const CYCLE_MS = 3200

/**
 * Palabra rotativa del hero. Reemplaza "marcas." en el segundo span del
 * título. Cicla cada 3.2s entre 6 palabras del vocabulario de la marca,
 * con wipe vertical + blur. Cursor azul accent al lado, blink lento.
 *
 * Server-safe: render inicial es siempre `WORDS[0]` ("marcas.") — sin
 * hydration mismatch.
 *
 * `prefers-reduced-motion`: muestra solo "marcas." estática, sin cursor.
 */
export function HeroRotatingWord() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % WORDS.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [reduce])

  if (reduce) {
    return (
      <span className="hold-hero-shader__rotator hold-hero-shader__rotator--static">
        {WORDS[0]}
      </span>
    )
  }

  return (
    <span className="hold-hero-shader__rotator">
      <span className="hold-hero-shader__rotator-track" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={idx}
            className="hold-hero-shader__rotator-word"
            variants={wordVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE_HOLD }}
          >
            {WORDS[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hold-hero-shader__cursor" aria-hidden />
    </span>
  )
}
