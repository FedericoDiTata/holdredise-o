"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

/* Set curado del vocabulario REAL de HOLD — no growth/engagement/scale.
 * Una sola palabra del título principal se escribe / borra en loop. */
const WORDS = [
  "marcas.",
  "negocios.",
  "comunidades.",
  "equipos.",
  "contenido.",
  "talents.",
] as const

/* Tempos pensados para sentirse "humano editorial" (no robot chatbot):
 * - Typing más lento que un IDE auto-complete pero más rápido que tipeo real
 * - Deleting ~2× más rápido (así se siente el "borrar" como menos importante)
 * - Pausa generosa cuando la palabra está completa (la audiencia la lee) */
const TYPING_MS = 78
const DELETING_MS = 38
const PAUSE_AFTER_TYPED_MS = 2200
const PAUSE_AFTER_DELETED_MS = 280

type Phase = "pause" | "typing" | "deleting"

/**
 * Palabra rotativa del hero con typing effect. Escribe letra por letra,
 * pausa cuando termina de escribir, borra letra por letra y pasa a la
 * siguiente palabra. Cursor azul accent: sólido mientras tipea/borra,
 * blink lento solo en pausa — ese detalle hace que se sienta editorial
 * y no chatbot.
 *
 * Server-safe: render inicial es siempre `WORDS[0]` completa, sin
 * hydration mismatch. `prefers-reduced-motion`: muestra estática.
 */
export function HeroRotatingWord() {
  const reduce = useReducedMotion()
  const [wordIdx, setWordIdx] = useState(0)
  const [text, setText] = useState<string>(WORDS[0])
  const [phase, setPhase] = useState<Phase>("pause")

  useEffect(() => {
    if (reduce) return

    let timer: ReturnType<typeof setTimeout> | undefined

    if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPED_MS)
    } else if (phase === "deleting") {
      if (text.length === 0) {
        timer = setTimeout(() => {
          setWordIdx((p) => (p + 1) % WORDS.length)
          setPhase("typing")
        }, PAUSE_AFTER_DELETED_MS)
      } else {
        timer = setTimeout(() => {
          setText((t) => t.slice(0, -1))
        }, DELETING_MS)
      }
    } else {
      const target = WORDS[wordIdx]
      if (text.length === target.length) {
        setPhase("pause")
      } else {
        timer = setTimeout(() => {
          setText(target.slice(0, text.length + 1))
        }, TYPING_MS)
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [text, phase, wordIdx, reduce])

  if (reduce) {
    return (
      <span className="hold-hero-shader__rotator hold-hero-shader__rotator--static">
        {WORDS[0]}
      </span>
    )
  }

  const cursorClass =
    phase === "pause"
      ? "hold-hero-shader__cursor hold-hero-shader__cursor--blink"
      : "hold-hero-shader__cursor"

  return (
    <span className="hold-hero-shader__rotator">
      <span className="hold-hero-shader__rotator-track" aria-live="polite">
        <span className="hold-hero-shader__rotator-word">{text}</span>
      </span>
      <span className={cursorClass} aria-hidden />
    </span>
  )
}
