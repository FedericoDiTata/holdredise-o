import { Placeholder } from "@/components/ui/Placeholder"
import { HISTORIA_BIRRA } from "@/data/content"
import "./historia-birra.css"

/**
 * Bloque de cierre narrativo de la home: cita REAL del PDF ("Las
 * mejores decisiones se toman con una birra de por medio…") + 2 fotos
 * placeholder side-by-side con etiquetas de año (2021 = birra original,
 * 2026 = equipo actual). Reemplazar `<Placeholder>` por `<img>`/`<Image>`
 * cuando lleguen las fotos reales.
 */
export function HistoriaBirra() {
  return (
    <section className="hold-birra">
      <div className="hold-birra__cita-wrap" data-reveal>
        <p className="hold-birra__eyebrow">El origen</p>
        <p className="hold-birra__cita">
          Las mejores decisiones se toman con una birra de por medio.{" "}
          <em>La nuestra fue dejar de buscar la agencia que queríamos y construirla nosotras.</em>
        </p>
      </div>

      <div
        className="hold-birra__fotos"
        data-reveal
        data-reveal-delay="0.2"
      >
        <div className="hold-birra__foto-wrap">
          <div className="hold-birra__foto">
            <Placeholder ratio="4/5" label={HISTORIA_BIRRA.fotoBirra} />
          </div>
          <div className="hold-birra__foto-label">
            <span>La birra</span>
            <span className="hold-birra__foto-year">2021</span>
          </div>
        </div>

        <div className="hold-birra__foto-wrap hold-birra__foto-wrap--ancha">
          <div className="hold-birra__foto">
            <Placeholder ratio="1/1" label={HISTORIA_BIRRA.fotoEquipo} />
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
