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

/* Piezas de la frase intro: desparramadas, cada una con su rotación y
 * entrando desde una dirección distinta (transform puro, scroll-linked). */
const PIECES = [
  {
    text: "Ayudamos a negocios y creadores",
    variant: "solid",
    from: { x: -1300, y: 0 },
    window: [0.5, 0.72] as [number, number],
    rotate: -3,
  },
  {
    text: "a transformar su presencia digital",
    variant: "outline",
    from: { x: 1300, y: 0 },
    window: [0.56, 0.78] as [number, number],
    rotate: 2,
  },
  {
    text: "en una marca con identidad, estrategia y resultados.",
    variant: "solid",
    from: { x: 0, y: 700 },
    window: [0.62, 0.84] as [number, number],
    rotate: -1.5,
  },
  {
    text: "Nos involucramos en tu negocio.",
    variant: "accent",
    from: { x: 0, y: 900 },
    window: [0.68, 0.9] as [number, number],
    rotate: 2.5,
  },
] as const

function IntroPiece({
  progress,
  piece,
  index,
}: {
  progress: MotionValue<number>
  piece: (typeof PIECES)[number]
  index: number
}) {
  const x = useTransform(progress, piece.window, [piece.from.x, 0])
  const y = useTransform(progress, piece.window, [piece.from.y, 0])
  return (
    <motion.span
      className={`grot-hero__piece grot-hero__piece--${piece.variant} grot-hero__piece--${index}`}
      style={{ x, y, rotate: piece.rotate }}
    >
      {piece.text}
    </motion.span>
  )
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

        {!reduce ? (
          <p className="grot-hero__intro" aria-hidden>
            {PIECES.map((piece, i) => (
              <IntroPiece
                key={piece.text}
                progress={scrollYProgress}
                piece={piece}
                index={i}
              />
            ))}
          </p>
        ) : null}
      </section>
    </div>
  )
}
