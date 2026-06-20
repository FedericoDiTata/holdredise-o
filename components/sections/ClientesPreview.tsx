import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TestimoniosAccordion } from "@/components/sections/TestimoniosAccordion"
import { testimonios } from "@/data/content"
import type { ServicioSlug } from "@/types"
import "./clientes-preview.css"

/**
 * Sección de Clientes: 6 testimonios curados (2 por servicio) en accordion
 * horizontal interactivo. Hover/focus expande la card y revela el quote.
 * Estilo inspirado en interactive-image-accordion de 21st.dev.
 */

/* Cura: 2 testimonios por servicio para llenar 6 slots del accordion. */
function pickSixTestimonios(): typeof testimonios {
  const byService: Record<ServicioSlug, typeof testimonios[number][]> = {
    academy: [],
    "redes-sociales": [],
    performance: [],
  }
  testimonios.forEach((t) => {
    if (byService[t.servicio].length < 2) byService[t.servicio].push(t)
  })
  // Orden: 1 de cada → 2 de cada → alterna para mostrar mix de servicios.
  return [
    byService.academy[0],
    byService["redes-sociales"][0],
    byService.performance[0],
    byService.academy[1],
    byService["redes-sociales"][1],
    byService.performance[1],
  ].filter(Boolean) as typeof testimonios
}

export function ClientesPreview() {
  const six = pickSixTestimonios()

  return (
    <section className="hold-clientes" aria-label="Clientes">
      <div className="hold-clientes__inner">
        <header className="hold-clientes__header">
          <div data-reveal>
            <p className="hold-clientes__eyebrow">03 · Clientes</p>
            <h2 className="hold-clientes__title">
              Lo que dicen las marcas que <em>confiaron</em>.
            </h2>
          </div>
          <div
            className="hold-clientes__head-cta"
            data-reveal
            data-reveal-delay="0.2"
          >
            <Button variant="secondary" href="/clientes">
              Ver todos los casos
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
            </Button>
          </div>
        </header>

        <div data-reveal data-reveal-delay="0.3">
          <TestimoniosAccordion testimonios={six} />
        </div>
      </div>
    </section>
  )
}
