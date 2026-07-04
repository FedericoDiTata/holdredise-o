import { MarqueeBand } from "@/components/effects/MarqueeBand"
import { trabajos } from "@/data/content"
import "./trabajos-grot.css"

/* Alterna el fondo de las cards: accent / negro / negro / accent. */
const CARD_TONES = ["accent", "dark", "dark", "accent"] as const

/**
 * Trabajos en grilla 2x2 con placeholders halftone (patrón de puntos)
 * hasta que lleguen las fotos reales. Marquee TRABAJOS gigante arriba.
 * Cada card: fondo con dots + nombre del cliente y rubro abajo a la
 * izquierda. Hover: el fondo escala apenas (contenido dentro de
 * overflow hidden).
 */
export function TrabajosGrot() {
  const items = trabajos.slice(0, 4)

  return (
    <section className="grot-trabajos grot-cover" id="trabajos">
      <div className="grot-trabajos__head">
        <span>Trabajos</span>
        <span>Marcas que sostenemos</span>
      </div>

      <MarqueeBand items={["TRABAJOS"]} italic durationSec={32} />

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
    </section>
  )
}
