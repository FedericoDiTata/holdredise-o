import { Button } from "@/components/ui/Button"
import { waUrl } from "@/data/content"
import "./packs-grid.css"

type Pack = {
  nombre: string
  tag?: string
  precio: string
  periodo?: string
  lead: string
  incluye: readonly string[]
  destacado?: boolean
  ctaText: string
  ctaWaMessage: string
}

const PACKS_VERT: readonly Pack[] = [
  {
    nombre: "Esencial",
    tag: "Pack",
    precio: "600",
    periodo: "/mes",
    lead: "Para marcas que arrancan o necesitan retomar consistencia.",
    incluye: [
      "Estrategia y calendario mensual",
      "8 piezas de feed + stories",
      "Community management 5 días",
      "Reporte mensual con insights",
    ],
    ctaText: "Quiero el Esencial",
    ctaWaMessage: "Hola, me interesa el Pack Esencial de Redes Sociales.",
  },
  {
    nombre: "Pro",
    tag: "Más elegido",
    precio: "1.200",
    periodo: "/mes",
    lead: "El paquete completo para marcas que quieren crecer en serio.",
    incluye: [
      "Todo lo del Esencial",
      "16 piezas + producción audiovisual",
      "Community management 7 días",
      "Branding y dirección creativa",
    ],
    destacado: true,
    ctaText: "Quiero el Pro",
    ctaWaMessage: "Hola, me interesa el Pack Pro de Redes Sociales.",
  },
] as const

const PACK_CUSTOM: Pack = {
  nombre: "Pack Personalizado",
  tag: "A medida",
  precio: "Cotización",
  lead: "Si ya tenés equipo interno, una necesidad puntual o algo distinto a los packs estándar, lo armamos juntos según el alcance.",
  incluye: [],
  ctaText: "Cotizar a medida",
  ctaWaMessage:
    "Hola, quiero charlar sobre un pack personalizado de Redes Sociales.",
}

function PackCard({ pack }: { pack: Pack }) {
  return (
    <article
      className="hold-pack"
      data-destacado={pack.destacado ? "true" : undefined}
    >
      <div className="hold-pack__header">
        <h3 className="hold-pack__name">{pack.nombre}</h3>
        {pack.tag ? <span className="hold-pack__tag">{pack.tag}</span> : null}
      </div>

      <div className="hold-pack__price">
        <span className="hold-pack__from">Desde USD</span>
        <span className="hold-pack__amount">{pack.precio}</span>
        {pack.periodo ? (
          <span className="hold-pack__period">{pack.periodo}</span>
        ) : null}
      </div>

      <p className="hold-pack__lead">{pack.lead}</p>

      <div className="hold-pack__divider" aria-hidden />

      <ul className="hold-pack__includes" role="list">
        {pack.incluye.map((item) => (
          <li key={item} className="hold-pack__include-row">
            <span className="hold-pack__include-bullet" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="hold-pack__cta">
        <Button
          size="large"
          href={waUrl(pack.ctaWaMessage)}
          external
          ariaLabel={`${pack.ctaText} por WhatsApp`}
        >
          {pack.ctaText}
        </Button>
      </div>
    </article>
  )
}

function PackCardHorizontal({ pack }: { pack: Pack }) {
  return (
    <article className="hold-pack hold-pack--horizontal">
      <div className="hold-pack__main">
        <h3 className="hold-pack__name">{pack.nombre}</h3>
        <p className="hold-pack__lead">{pack.lead}</p>
      </div>

      <div className="hold-pack__side">
        {pack.tag ? <span className="hold-pack__tag">{pack.tag}</span> : null}
        <Button
          size="large"
          href={waUrl(pack.ctaWaMessage)}
          external
          ariaLabel={`${pack.ctaText} por WhatsApp`}
        >
          {pack.ctaText}
        </Button>
      </div>
    </article>
  )
}

/**
 * Grid de 3 packs para "Cotizá tu Propuesta" en /redes-sociales:
 * - Esencial (vertical) + Pro (vertical, destacado en azul brand) arriba
 * - Personalizado (horizontal full-width) abajo
 * Cada pack tiene CTA propio a WhatsApp con mensaje pre-armado.
 */
export function PacksGrid() {
  return (
    <div className="hold-packs">
      <div className="hold-packs__row">
        {PACKS_VERT.map((pack) => (
          <PackCard key={pack.nombre} pack={pack} />
        ))}
      </div>
      <PackCardHorizontal pack={PACK_CUSTOM} />
    </div>
  )
}
