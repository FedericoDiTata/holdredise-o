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
 * inicial (peek) y su propia ventana de progreso. Al crecer TAPAN
 * físicamente el título (z-order), como en la referencia. */
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
 * Hero grotesco: bloque accent pineado con el título + typewriter.
 * Las columnas blancas crecen desde abajo y CUBREN el título (están
 * por encima en z-order); sobre el blanco resultante aparece la frase
 * de la agencia centrada, integrada al final de la transición. El
 * recorrido es corto (30svh de scroll) para que no haya que scrollear
 * de más.
 */
export function HeroGrot() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  })

  /* El título sube y se desvanece mientras las columnas lo tapan. */
  const titleY = useTransform(scrollYProgress, [0, 0.55], [0, -220])
  const titleRotate = useTransform(scrollYProgress, [0, 0.55], [0, -2.5])
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.4], [1, 0])

  /* La frase aparece centrada SOBRE el blanco de las columnas, apenas
   * después de que crecieron: integrada a la transición, sin dejar
   * una pantalla blanca vacía. */
  const introOpacity = useTransform(scrollYProgress, [0.45, 0.72], [0, 1])
  const introY = useTransform(scrollYProgress, [0.45, 0.72], [70, 0])

  /* Base blanca que tapa las ranuras accent al final. */
  const baseOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1])

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

        <motion.p
          className="grot-hero__intro"
          style={reduce ? undefined : { opacity: introOpacity, y: introY }}
        >
          Ayudamos a negocios y creadores a transformar su presencia digital
          en una marca con identidad, estrategia y resultados.{" "}
          <strong>Nos involucramos en tu negocio.</strong>
        </motion.p>
      </section>
    </div>
  )
}
