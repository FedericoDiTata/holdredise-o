import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cursos, waUrl } from "@/data/content"
import "./related-courses.css"

type Props = {
  /** Slug del curso actual (se excluye del grid). */
  currentSlug: string
}

/**
 * Grid 3-col de "otros cursos" al final del detalle. Filtra el curso
 * actual y muestra los 5 restantes con su ID, nombre, formato y flecha.
 * La sexta celda es una card especial en azul brand que linkea al
 * WhatsApp para capacitaciones a medida — completa la fila y aprovecha
 * el slot para empujar al lead que no encontró su match.
 */
export function RelatedCourses({ currentSlug }: Props) {
  const otros = cursos.filter((c) => c.slug !== currentSlug)

  return (
    <div className="hold-related">
      {otros.map((curso) => (
        <Link
          key={curso.slug}
          href={`/academy/${curso.slug}`}
          className="hold-related__card"
          aria-label={`Ver curso ${curso.nombre}`}
        >
          <div className="hold-related__media" aria-hidden />
          <div className="hold-related__body">
            <h3 className="hold-related__nombre">{curso.nombre}</h3>
            <div className="hold-related__meta">
              <span>{curso.formato}</span>
              <ArrowUpRight
                className="hold-related__arrow"
                size={18}
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
          </div>
        </Link>
      ))}

      <a
        href={waUrl(
          "Hola, no encontré un curso que me cierre en HOLD Academy. Quiero charlar sobre algo a medida.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="hold-related__card hold-related__card--cta"
        aria-label="Consultar por una capacitación a medida por WhatsApp"
      >
        <div className="hold-related__cta-body">
          <span className="hold-related__cta-label">A medida</span>
          <h3 className="hold-related__cta-title">
            ¿Buscás algo <em>distinto?</em>
          </h3>
          <p className="hold-related__cta-text">
            Armamos capacitaciones a medida para equipos, empresas y
            necesidades específicas.
          </p>
          <span className="hold-related__cta-link">
            Hablemos
            <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden />
          </span>
        </div>
      </a>
    </div>
  )
}
