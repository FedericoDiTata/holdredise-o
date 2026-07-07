"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { TypingPhrases } from "./TypingPhrases"
import "./hero-grot.css"

/* Columnas blancas SIN gaps: skyline sólido que crece y tapa el título.
 * Terminan temprano (≤62%) para que las piezas de la frase tengan un
 * tramo largo de entrada sobre el blanco. */
const COLS = [
  { peek: 0.1, start: 0.0, end: 0.5 },
  { peek: 0.2, start: 0.04, end: 0.56 },
  { peek: 0.07, start: 0.08, end: 0.52 },
  { peek: 0.16, start: 0.02, end: 0.58 },
  { peek: 0.12, start: 0.06, end: 0.54 },
  { peek: 0.22, start: 0.03, end: 0.62 },
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

/* Piezas de la frase intro: stickers gigantes desparramados, cada uno
 * con su rotación, su dirección de entrada y su tratamiento (bloques
 * de color con swaps secos, outline con neón, accent con neón). Las
 * ventanas de progreso son ANCHAS para que la llegada sea progresiva,
 * no instantánea. */
const PIECES = [
  {
    text: "Ayudamos a negocios y creadores",
    variant: "block-dark",
    from: { x: -1600, y: 0 },
    window: [0.42, 0.7] as [number, number],
    rotate: -3,
  },
  {
    text: "a transformar su presencia digital",
    variant: "outline",
    from: { x: 1600, y: 0 },
    window: [0.5, 0.78] as [number, number],
    rotate: 2,
  },
  {
    text: "en una marca con identidad, estrategia y resultados.",
    variant: "block-accent",
    from: { x: 0, y: 900 },
    window: [0.58, 0.86] as [number, number],
    rotate: -1.5,
  },
  {
    text: "Nos involucramos en tu negocio.",
    variant: "neon",
    from: { x: 0, y: 1100 },
    window: [0.66, 0.95] as [number, number],
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
      className={`grot-hero__piece grot-hero__piece--${index}`}
      style={{ x, y, rotate: piece.rotate }}
    >
      <span
        className={`grot-hero__piece-in grot-hero__piece-in--${piece.variant}`}
        data-text={piece.text}
      >
        {piece.text}
      </span>
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
  const [collage, setCollage] = useState(false)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  })

  /* Modo collage: cuando las columnas ya crecieron, arranca la
   * coreografía de swaps de color (fondo + piezas, ciclo compartido). */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCollage(v > 0.5)
  })

  /* El título sube y las columnas lo tapan físicamente (z-order). */
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -260])
  const titleRotate = useTransform(scrollYProgress, [0, 0.4], [0, -2.5])

  return (
    <div className="grot-hero-wrap" id="inicio" ref={wrapRef}>
      <section
        className={
          "grot-hero" + (collage && !reduce ? " grot-hero--collage" : "")
        }
        aria-label="Inicio"
      >
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

        {/* Fondo del collage: 3 capas apiladas que alternan opacity con
            steps (compositor puro, no se traba). Corren siempre; el
            umbral de scroll solo hace fade del overlay entero. */}
        {!reduce ? (
          <div className="grot-hero__swap" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        ) : null}

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
