import type { Servicio } from "@/types"
import { Button } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/data/content"
import "./service-plan-feature.css"

type Props = {
  servicio: Servicio
}

const PERIODO_LABEL: Record<NonNullable<Servicio["precioPeriodo"]>, string> = {
  mes: "/mes",
  curso: "/curso",
  campaña: "/campaña",
}

/**
 * Pricing editorial split: panel oscuro a la izquierda con el monto
 * gigante en color de acento + panel claro a la derecha con incluye
 * numerado y CTA. Mucho más impactante que la versión "todo plano".
 */
export function ServicePlanFeature({ servicio }: Props) {
  const periodo = servicio.precioPeriodo
    ? PERIODO_LABEL[servicio.precioPeriodo]
    : null

  return (
    <section className="hold-plan-feature" aria-label="Inversión y plan">
      <div className="hold-plan-feature__price">
        <p className="hold-plan-feature__price-label">Inversión</p>

        <div className="hold-plan-feature__price-stack">
          <div className="hold-plan-feature__price-row">
            <span className="hold-plan-feature__from">Desde</span>
            <span className="hold-plan-feature__currency">USD</span>
            <span className="hold-plan-feature__amount">
              {servicio.precioDesde}
            </span>
            {periodo ? (
              <span className="hold-plan-feature__period">{periodo}</span>
            ) : null}
          </div>
          <p className="hold-plan-feature__note">
            Cada propuesta se arma a medida después de una primera charla.
            El monto base sirve como referencia para ubicarte.
          </p>
        </div>

        <div className="hold-plan-feature__meta">
          <span className="hold-plan-feature__meta-dot" aria-hidden />
          <span>Sin permanencia · Sin contratos eternos</span>
        </div>
      </div>

      <div className="hold-plan-feature__details">
        <p className="hold-plan-feature__details-label">Qué incluye</p>
        <h3 className="hold-plan-feature__details-title">
          Todo lo necesario para <em>arrancar bien.</em>
        </h3>

        <ul className="hold-plan-feature__includes" role="list">
          {servicio.incluye.map((item, i) => (
            <li key={item} className="hold-plan-feature__include">
              <span className="hold-plan-feature__include-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="hold-plan-feature__cta">
          <Button
            size="large"
            href={WHATSAPP_URL}
            external
            ariaLabel="Hablemos por WhatsApp"
          >
            Hablemos
          </Button>
        </div>
      </div>
    </section>
  )
}
