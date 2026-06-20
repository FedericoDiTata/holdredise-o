import type { ServicioSlug, Testimonio } from "@/types"
import "./testimonial-card.css"

const SERVICIO_NOMBRE: Record<ServicioSlug, string> = {
  academy: "Hold Academy",
  "redes-sociales": "Redes Sociales",
  performance: "Performance",
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

type Props = {
  testimonio: Testimonio
}

/**
 * Card editorial uniforme para grilla de testimonios. Comilla decorativa
 * grande en --accent, quote, autor con avatar de iniciales y chip de
 * servicio arriba.
 */
export function TestimonialCard({ testimonio }: Props) {
  return (
    <article className="hold-testimonial">
      <span className="hold-testimonial__chip">
        {SERVICIO_NOMBRE[testimonio.servicio]}
      </span>

      <span className="hold-testimonial__quote-mark" aria-hidden>
        “
      </span>

      <p className="hold-testimonial__quote">{testimonio.texto}</p>

      <div className="hold-testimonial__author">
        <span className="hold-testimonial__avatar" aria-hidden>
          {getInitials(testimonio.nombre)}
        </span>
        <span className="hold-testimonial__meta">
          <span className="hold-testimonial__name">
            {testimonio.marca && testimonio.marca !== testimonio.nombre
              ? `${testimonio.nombre} · ${testimonio.marca}`
              : testimonio.nombre}
          </span>
          <span className="hold-testimonial__rol">{testimonio.rubro}</span>
        </span>
      </div>
    </article>
  )
}
