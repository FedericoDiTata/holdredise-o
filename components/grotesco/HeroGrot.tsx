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

/* Columnas blancas que asoman abajo del hero: cada una con su altura
 * inicial (peek) y su propia ventana de progreso, así crecen desparejo
 * como un skyline hasta llenar el viewport y volverse el fondo de la
 * siguiente sección. */
const COLS = [
  { peek: 0.1, start: 0.0, end: 0.85 },
  { peek: 0.2, start: 0.07, end: 0.93 },
  { peek: 0.07, start: 0.13, end: 0.88 },
  { peek: 0.16, start: 0.03, end: 0.96 },
  { peek: 0.12, start: 0.1, end: 0.9 },
  { peek: 0.22, start: 0.05, end: 1.0 },
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
 * Hero grotesco v2 (referencia "not another brand"): bloque ACCENT
 * full-viewport con el título gigante + typewriter, y columnas blancas
 * asomando desde abajo. Al scrollear, el hero queda pineado mientras
 * las columnas CRECEN desparejo hasta llenar la pantalla y convertirse
 * en el fondo blanco sobre el que entra la siguiente sección.
 */
export function HeroGrot() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  })

  /* El título se va BIEN antes de que las columnas lleguen arriba,
   * así nunca queda texto pisado por los bloques blancos. */
  const titleY = useTransform(scrollYProgress, [0, 0.45], [0, -110])
  const titleRotate = useTransform(scrollYProgress, [0, 0.45], [0, -2.5])
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.38], [1, 0])

  /* Base blanca que aparece al final: tapa las ranuras accent entre
   * columnas para que el hero se funda sin costuras con la sección
   * siguiente (fondo blanco). */
  const baseOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1])

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
                reduce
                  ? undefined
                  : { y: titleY, rotate: titleRotate, opacity: titleOpacity }
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

        {!reduce ? (
          <motion.div
            className="grot-hero__base"
            style={{ opacity: baseOpacity }}
            aria-hidden
          />
        ) : null}

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
      </section>
    </div>
  )
}
