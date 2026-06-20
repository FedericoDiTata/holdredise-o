import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import type { Servicio } from "@/types"
import { cn } from "@/lib/utils"
import "./service-card.css"

type Props = {
  servicio: Servicio
  className?: string
}

/**
 * Card pricing-style: TODA la card es la imagen de fondo (placeholder hatch).
 * Capas: media (hatch del acento) → gradient overlay para legibilidad →
 * contenido (eyebrow, título, precio, features, CTA) en blanco con
 * drop-shadow. Layout editorial editorial-style.
 */
export function ServiceCard({ servicio, className }: Props) {
  return (
    <article className={cn("hold-service-card", className)}>
      <div className="hold-service-card__media" aria-hidden />
      <div className="hold-service-card__overlay" aria-hidden />

      <div className="hold-service-card__content">
        <span className="hold-service-card__eyebrow">
          <span className="hold-service-card__eyebrow-dot" aria-hidden />
          {servicio.eyebrow}
        </span>

        <h3 className="hold-service-card__title">{servicio.nombre}</h3>

        <div className="hold-service-card__price">
          <span className="hold-service-card__price-from">Desde</span>
          <span className="hold-service-card__price-row">
            <span className="hold-service-card__price-amount">
              USD {servicio.precioDesde}
            </span>
            {servicio.precioPeriodo ? (
              <span className="hold-service-card__price-period">
                / {servicio.precioPeriodo}
              </span>
            ) : null}
          </span>
        </div>

        <ul className="hold-service-card__features">
          {servicio.incluye.map((item) => (
            <li key={item}>
              <Check size={14} strokeWidth={2.4} aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link
          href={servicio.href}
          className="hold-service-card__cta"
          aria-label={`Ver detalle de ${servicio.nombre}`}
        >
          <span>Quiero saber más</span>
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
    </article>
  )
}
