"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { trabajos } from "@/data/content"
import { MarqueeGrot } from "./MarqueeGrot"
import "./trabajos-grot.css"

/* Alterna el fondo de las cards: accent / negro / negro / accent. */
const CARD_TONES = ["accent", "dark", "dark", "accent"] as const

/**
 * Trabajos: la sección que se monta encima de la punchline pineada.
 * El contenido entra EN DIAGONAL scroll-linked: arranca rotado y
 * desplazado, y se endereza a medida que cubre la sección negra
 * (misma sensación que los heros internos de Academy / Redes /
 * Performance). El fondo de la sección queda derecho para tapar limpio;
 * lo que rota es el contenido interno.
 *
 * Marquee TRABAJOS gigante + grilla 2x2 halftone.
 */
export function TrabajosGrot() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.12"],
  })

  /* Solo rotate + y: agregar scale acá duplicaba el costo de raster
   * del layer gigante y contribuía al lag del scroll. */
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 0])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  const items = trabajos.slice(0, 4)

  return (
    <section className="grot-trabajos grot-cover" id="trabajos" ref={ref}>
      <motion.div
        className="grot-trabajos__tilt"
        style={reduce ? undefined : { rotate, y }}
      >
        <div className="grot-trabajos__head">
          <span>Trabajos</span>
          <span>Marcas que sostenemos</span>
        </div>

        <MarqueeGrot text="Trabajos" durationSec={13} />

        <div className="grot-trabajos__grid">
          {items.map((t, i) => (
            <article
              key={t.cliente}
              className={`grot-trabajos__card grot-trabajos__card--${CARD_TONES[i]}`}
            >
              <div className="grot-trabajos__media" aria-hidden />
              <span className="grot-trabajos__tag" aria-hidden>
                [ proyecto ]
              </span>
              <div className="grot-trabajos__meta">
                <span className="grot-trabajos__cliente">{t.cliente}</span>
                <span className="grot-trabajos__rubro">{t.rubro}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="grot-trabajos__more">
          <span className="grot-trabajos__more-link">
            Ver todos los trabajos ↗
          </span>
        </div>
      </motion.div>
    </section>
  )
}
