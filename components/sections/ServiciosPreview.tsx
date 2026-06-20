import { ServiceCard } from "@/components/sections/ServiceCard"
import { servicios } from "@/data/content"
import "./servicios-preview.css"

/**
 * Sección de servicios sobre fondo negro plano.
 * Las cards se autoexplican (eyebrow + nombre + precio + incluye + CTA),
 * por eso no hay header de sección — directo al grid.
 *
 * Reveal entrance: cada card emerge desde abajo con blur que se desblurea
 * (efecto liquid glass) en stagger.
 */
export function ServiciosPreview() {
  return (
    <section
      id="servicios"
      className="hold-servicios"
      aria-label="Servicios"
    >
      <div className="hold-servicios__inner">
        <div className="hold-servicios__grid">
          {servicios.map((s, i) => (
            <div
              key={s.slug}
              className="hold-servicios__card-wrap"
              data-reveal
              data-reveal-delay={`0.${i + 1}`}
            >
              <ServiceCard servicio={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
