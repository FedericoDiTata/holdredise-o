"use client"

import { useState } from "react"
import type { ServicioSlug, Testimonio } from "@/types"
import "./testimonios-accordion.css"

const SERVICIO_NOMBRE: Record<ServicioSlug, string> = {
  academy: "Hold Academy",
  "redes-sociales": "Redes Sociales",
  performance: "Performance",
}

type Props = {
  testimonios: readonly Testimonio[]
}

function getInitials(nombre: string): string {
  return nombre
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .filter(Boolean)
    .join("")
    .replace(/\W/g, "")
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Accordion horizontal: 6 cards alineadas que muestran solo el avatar +
 * eyebrow en estado base. Al hover (desktop) o tap (mobile), la card se
 * expande y revela quote + nombre + rol. Inspirado en interactive-image-
 * accordion de 21st.dev, adaptado al DS HOLD (hatch del acento, sin
 * border-radius, paleta monocroma).
 */
export function TestimoniosAccordion({ testimonios }: Props) {
  // null = ninguna activa (todas con flex igual, ancho parejo).
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className="hold-test-acc"
      onMouseLeave={() => setActive(null)}
    >
      {testimonios.map((t, i) => {
        const initials = getInitials(t.nombre)
        const isActive = active === i
        /* Label cerrado: marca si la hay, sino el nombre — junto al rubro.
           Pedido explícito: "cuando las tarjetas están cerradas, mostrar
           el nombre del cliente o la marca y rubro". */
        const baseLabel = `${t.marca ?? t.nombre} · ${t.rubro}`
        return (
          <button
            type="button"
            key={`${t.servicio}-${i}`}
            className="hold-test-acc__card"
            data-active={isActive || undefined}
            aria-label={`Testimonio de ${t.nombre}, ${t.rubro}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <div className="hold-test-acc__media" aria-hidden />
            <div className="hold-test-acc__overlay" aria-hidden />

            {/* Estado base: rotated label vertical con marca/nombre + rubro. */}
            <span className="hold-test-acc__base-label" aria-hidden>
              {baseLabel}
            </span>

            {/* Contenido completo (visible cuando active). */}
            <div className="hold-test-acc__content">
              <span className="hold-test-acc__chip">
                {SERVICIO_NOMBRE[t.servicio]}
              </span>
              <p className="hold-test-acc__quote">"{t.texto}"</p>
              <div className="hold-test-acc__person">
                <span className="hold-test-acc__avatar" aria-hidden>
                  {initials}
                </span>
                <span className="hold-test-acc__person-meta">
                  <span className="hold-test-acc__name">{t.nombre}</span>
                  <span className="hold-test-acc__rol">{t.rubro}</span>
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
