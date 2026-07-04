"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { TypingPhrases } from "./TypingPhrases"
import "./hero-grot.css"

/* Columnas blancas SIN gaps: skyline sólido que crece y tapa el título.
 * Terminan alrededor del 78% del progreso para dejar un tramo final de
 * blanco + frase antes de que el hero se vaya. */
const COLS = [
  { peek: 0.1, start: 0.0, end: 0.62 },
  { peek: 0.2, start: 0.05, end: 0.7 },
  { peek: 0.07, start: 0.1, end: 0.66 },
  { peek: 0.16, start: 0.02, end: 0.74 },
  { peek: 0.12, start: 0.08, end: 0.68 },
  { peek: 0.22, start: 0.04, end: 0.78 },
] as const

function HeroCol({
  progress,
  peek,
  start,
  end,
}: {
  progress: MotionValue<number>
  peek: number
  start: number
  end: number
}) {
  const scaleY = useTransform(progress, [start, end], [peek, 1])
  return <motion.div className="grot-hero__col" style={{ scaleY }} />
}

/**
 * Hero grotesco: bloque accent pineado con el título + typewriter.
 * Las columnas blancas (sin ranuras) crecen y CUBREN el título; la
 * frase de la agencia SUBE desde abajo sobre el blanco resultante.
 *
 * Nota técnica: todos los efectos scroll-linked de este hero usan
 * SOLO transforms (scaleY / translateY / rotate) — los MotionValues de
 * opacity venían fallando en este stack y dejaban contenido invisible.
 */
export function HeroGrot() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  })

  /* El título sube y las columnas lo tapan físicamente (z-order). */
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -260])
  const titleRotate = useTransform(scrollYProgress, [0, 0.5], [0, -2.5])

  /* La frase SUBE desde abajo del viewport sobre el blanco: transform
   * puro, sin opacity. */
  const introY = useTransform(scrollYProgress, [0.55, 0.85], [1000, 0])

  return (
    <div className="grot-hero-wrap" id="inicio" ref={wrapRef}>
      <section className="grot-hero" aria-label="Inicio">
        <h1 className="grot-hero__sr">
          No solo hacemos contenido, construimos marcas.
        </h1>

        <div className="grot-hero__content">
          <div className="grot-hero__title-wrap" aria-hidden>
            <motion.p
              className="grot-hero__title"
              style={
                reduce ? undefined : { y: titleY, rotate: titleRotate }
              }
            >
              <span className="grot-hero__line">
                No solo hacemos contenido,
              </span>
              <span className="grot-hero__line grot-hero__line--typed">
                <TypingPhrases />
              </span>
            </motion.p>
          </div>
        </div>

        <div className="grot-hero__cols" aria-hidden>
          {COLS.map((c, i) =>
            reduce ? (
              <div
                key={i}
                className="grot-hero__col"
                style={{ transform: `scaleY(${c.peek})` }}
              />
            ) : (
              <HeroCol
                key={i}
                progress={scrollYProgress}
                peek={c.peek}
                start={c.start}
                end={c.end}
              />
            ),
          )}
        </div>

        <motion.p
          className="grot-hero__intro"
          style={reduce ? undefined : { y: introY }}
        >
          Ayudamos a negocios y creadores a transformar su presencia digital
          en una marca con identidad, estrategia y resultados.{" "}
          <strong>Nos involucramos en tu negocio.</strong>
        </motion.p>
      </section>
    </div>
  )
}
