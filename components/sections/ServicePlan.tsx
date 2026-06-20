import type { Servicio } from "@/types"
import { Button } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/data/content"
import "./service-plan.css"

type Props = {
  servicio: Servicio
}

const PERIODO_LABEL: Record<NonNullable<Servicio["precioPeriodo"]>, string> = {
  mes: "/mes",
  curso: "/curso",
  campaña: "/campaña",
}

/**
 * Bloque editorial de precio. Sin cards, sin sombras: solo tipografía
 * grande para el monto y un listado simple de "qué incluye" con bullets
 * en color de acento.
 */
export function ServicePlan({ servicio }: Props) {
  const periodo = servicio.precioPeriodo
    ? PERIODO_LABEL[servicio.precioPeriodo]
    : null

  return (
    <section className="hold-service-plan" aria-label="Plan e inversión">
      <div>
        <p className="hold-service-plan__label">Inversión</p>
        <p className="hold-service-plan__price">
          <span className="hold-service-plan__from">Desde</span>
          <span className="hold-service-plan__currency">USD</span>
          <span className="hold-service-plan__amount">
            {servicio.precioDesde}
          </span>
          {periodo ? (
            <span className="hold-service-plan__period">{periodo}</span>
          ) : null}
        </p>
        <p className="hold-service-plan__note">
          Cada propuesta se arma a medida después de una primera charla.
          El monto base sirve como referencia.
        </p>
      </div>

      <div>
        <p className="hold-service-plan__label">Incluye</p>
        <ul className="hold-service-plan__includes" role="list">
          {servicio.incluye.map((item) => (
            <li key={item} className="hold-service-plan__include-row">
              <span className="hold-service-plan__include-bullet" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="hold-service-plan__cta">
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
