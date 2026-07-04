"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { TypingPhrases } from "./TypingPhrases"
import "./hero-grot.css"

/**
 * Hero grotesco: título gigante en 2 líneas (la segunda es un
 * typewriter de frases completas) + bajada.
 *
 * Al scrollear, el título NO se va derecho: sube más lento que la
 * página (parallax), se ladea un par de grados y se desvanece. La
 * bajada se va apenas más rápido. Todo transform/opacity, composited.
 */
export function HeroGrot() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const titleRotate = useTransform(scrollYProgress, [0, 1], [0, -2.5])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15])
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const subOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section className="grot-hero" id="inicio" aria-label="Inicio" ref={ref}>
      <h1 className="grot-hero__sr">
        No solo hacemos contenido, construimos marcas.
      </h1>

      <div className="grot-hero__title-wrap" aria-hidden>
        <motion.p
          className="grot-hero__title"
          style={
            reduce
              ? undefined
              : { y: titleY, rotate: titleRotate, opacity: titleOpacity }
          }
        >
          <span className="grot-hero__line">No solo hacemos contenido,</span>
          <span className="grot-hero__line grot-hero__line--typed">
            <TypingPhrases />
          </span>
        </motion.p>
      </div>

      <div className="grot-hero__bottom">
        <motion.p
          className="grot-hero__sub"
          style={reduce ? undefined : { y: subY, opacity: subOpacity }}
        >
          Ayudamos a negocios y creadores a transformar su presencia digital
          en una marca con identidad, estrategia y resultados.{" "}
          <strong>Nos involucramos en tu negocio.</strong>
        </motion.p>
      </div>
    </section>
  )
}
