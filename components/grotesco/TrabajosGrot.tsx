"use client"

import { motion, type MotionStyle } from "framer-motion"
import { trabajos } from "@/data/content"
import { MarqueeGrot } from "./MarqueeGrot"
import { SectionTag } from "./SectionTag"
import "./trabajos-grot.css"

/* Alterna el fondo de las cards: accent / negro / negro / accent. */
const CARD_TONES = ["accent", "dark", "dark", "accent"] as const

type Props = {
  /** Transforms scroll-linked que inyecta PinScroll (scale + rotate). */
  style?: MotionStyle
}

/**
 * Trabajos: la sección que sube por encima de la punchline pineada,
 * enderezándose desde una rotación leve (transforms de PinScroll).
 * Marquee TRABAJOS gigante + grilla 2x2 halftone.
 */
export function TrabajosGrot({ style }: Props) {
  const items = trabajos.slice(0, 4)

  return (
    <motion.section
      className="grot-trabajos grot-cover"
      id="trabajos"
      style={style}
    >
      <SectionTag spot="right">Trabajos</SectionTag>

      <MarqueeGrot text="Trabajos" durationSec={13} />

      {/* Cada card es su PROPIO host: el observer mira el article (sin
          clip, siempre intersecta) y el clip del wipe vive en el
          wrapper interno. Así cada fila dispara cuando entra ELLA al
          viewport, no todas juntas cuando entra el grid. */}
      <div className="grot-trabajos__grid">
        {items.map((t, i) => (
          <article
            key={t.cliente}
            className={`grot-trabajos__card grot-trabajos__card--${CARD_TONES[i]}`}
            data-reveal="host"
          >
            <div className="grot-trabajos__card-in">
              <div className="grot-trabajos__media" aria-hidden />
              <span className="grot-trabajos__tag" aria-hidden>
                [ proyecto ]
              </span>
              <div className="grot-trabajos__meta">
                <span className="grot-trabajos__cliente">{t.cliente}</span>
                <span className="grot-trabajos__rubro">{t.rubro}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grot-trabajos__more">
        <span className="grot-trabajos__more-link">
          Ver todos los trabajos ↗
        </span>
      </div>
    </motion.section>
  )
}
