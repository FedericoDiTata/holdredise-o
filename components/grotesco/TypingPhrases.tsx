"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

/* Frases completas que alternan: nada queda fijo, cada ciclo escribe
 * y borra la frase entera. Vocabulario de la marca. */
const PHRASES = [
  "construimos marcas.",
  "sostenemos negocios.",
  "creamos comunidades.",
  "potenciamos talentos.",
  "contamos historias.",
] as const

const TYPING_MS = 40
const DELETING_MS = 20
const PAUSE_AFTER_TYPED_MS = 950
const PAUSE_AFTER_DELETED_MS = 160

type Phase = "pause" | "typing" | "deleting"

/**
 * Typewriter de frases completas para el hero grotesco. Escribe la
 * frase entera letra por letra, pausa, la borra y pasa a la siguiente.
 * Cursor tipo bloque (grotesco, no la barrita fina editorial): sólido
 * mientras escribe/borra, parpadea solo en pausa.
 *
 * Server-safe: el primer render muestra la primera frase completa.
 * Respeta prefers-reduced-motion (frase estática).
 */
export function TypingPhrases() {
  const reduce = useReducedMotion()
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [text, setText] = useState<string>(PHRASES[0])
  const [phase, setPhase] = useState<Phase>("pause")

  useEffect(() => {
    if (reduce) return

    let timer: ReturnType<typeof setTimeout> | undefined

    if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPED_MS)
    } else if (phase === "deleting") {
      if (text.length === 0) {
        timer = setTimeout(() => {
          setPhraseIdx((p) => (p + 1) % PHRASES.length)
          setPhase("typing")
        }, PAUSE_AFTER_DELETED_MS)
      } else {
        timer = setTimeout(() => {
          setText((t) => t.slice(0, -1))
        }, DELETING_MS)
      }
    } else {
      const target = PHRASES[phraseIdx]
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
  }, [text, phase, phraseIdx, reduce])

  if (reduce) {
    return <span className="grot-typing">{PHRASES[0]}</span>
  }

  const cursorClass =
    phase === "pause"
      ? "grot-typing__cursor grot-typing__cursor--blink"
      : "grot-typing__cursor"

  return (
    <span className="grot-typing" aria-live="polite">
      {text}
      <span className={cursorClass} aria-hidden />
    </span>
  )
}
