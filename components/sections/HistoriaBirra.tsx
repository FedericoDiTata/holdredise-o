import { Placeholder } from "@/components/ui/Placeholder"
import { HISTORIA_BIRRA } from "@/data/content"
import "./historia-birra.css"

/**
 * Bloque de cierre narrativo de la home: cita REAL del PDF en 2 líneas
 * separadas (una negra normal, otra italic accent), + 2 placeholders
 * side-by-side con etiquetas de año.
 *
 * Animaciones via `data-reveal` (CSS + IntersectionObserver) — sistema
 * server-safe, no falla en SSR. Cada línea de la cita y cada foto entra
 * con stagger escalonado.
 */
export function HistoriaBirra() {
  return (
    <section className="hold-birra">
      <div className="hold-birra__cita-wrap">
        <h3 className="hold-birra__cita">
          <span
            className="hold-birra__cita-line"
            data-reveal="blur"
            data-reveal-delay="0.1"
          >
            Las mejores decisiones se toman con una birra de por medio.
          </span>
          <span
            className="hold-birra__cita-line hold-birra__cita-line--accent"
            data-reveal="blur"
            data-reveal-delay="0.3"
          >
            La nuestra fue dejar de buscar la agencia que queríamos y
            construirla nosotras.
          </span>
        </h3>
      </div>

      <div className="hold-birra__fotos">
        <div
          className="hold-birra__foto-wrap"
          data-reveal="up"
          data-reveal-delay="0.2"
        >
          <div className="hold-birra__foto">
            <Placeholder ratio="3/2" label={HISTORIA_BIRRA.fotoBirra} />
          </div>
          <div className="hold-birra__foto-label">
            <span>La birra</span>
            <span className="hold-birra__foto-year">2021</span>
          </div>
        </div>

        <div
          className="hold-birra__foto-wrap hold-birra__foto-wrap--ancha"
          data-reveal="up"
          data-reveal-delay="0.4"
        >
          <div className="hold-birra__foto">
            <Placeholder ratio="3/2" label={HISTORIA_BIRRA.fotoEquipo} />
          </div>
          <div className="hold-birra__foto-label">
            <span>El equipo</span>
            <span className="hold-birra__foto-year">2026</span>
          </div>
        </div>
      </div>
    </section>
  )
}
