import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Curso } from "@/types"
import { Button } from "@/components/ui/Button"
import { waUrlCurso } from "@/data/content"
import "./course-hero.css"

type Props = {
  curso: Curso
}

/**
 * Hero editorial para el detalle de un curso de Academy. Split:
 * izquierda info (breadcrumb, título, lead, meta inline, CTAs),
 * derecha imagen placeholder vertical 4/5.
 *
 * No usa el shader del PageHeroTextured — los detail pages son
 * sub-páginas y necesitan un hero más sobrio para no competir.
 */
export function CourseHero({ curso }: Props) {
  return (
    <section className="hold-course-hero">
      <div className="hold-course-hero__main">
        <nav aria-label="Volver">
          <Link href="/academy" className="hold-course-hero__back-link">
            <ArrowLeft size={14} strokeWidth={1.75} aria-hidden />
            <span>Volver a Academy</span>
          </Link>
        </nav>

        <h1 className="hold-course-hero__title">{curso.nombre}</h1>

        {curso.descripcion ? (
          <p className="hold-course-hero__lead">{curso.descripcion}</p>
        ) : null}

        <div className="hold-course-hero__meta">
          <div className="hold-course-hero__meta-item">
            <span className="hold-course-hero__meta-label">Estado</span>
            <span className="hold-course-hero__meta-value hold-course-hero__meta-status">
              <span
                className="hold-course-hero__meta-dot"
                data-estado={curso.estado}
                aria-hidden
              />
              {curso.estado}
            </span>
          </div>
          {curso.duracion ? (
            <div className="hold-course-hero__meta-item">
              <span className="hold-course-hero__meta-label">Duración</span>
              <span className="hold-course-hero__meta-value">{curso.duracion}</span>
            </div>
          ) : null}
          {curso.modalidad ? (
            <div className="hold-course-hero__meta-item">
              <span className="hold-course-hero__meta-label">Modalidad</span>
              <span className="hold-course-hero__meta-value">{curso.modalidad}</span>
            </div>
          ) : null}
          {curso.precio ? (
            <div className="hold-course-hero__meta-item">
              <span className="hold-course-hero__meta-label">Inversión</span>
              <span className="hold-course-hero__meta-value">{curso.precio}</span>
            </div>
          ) : null}
        </div>

        <div className="hold-course-hero__cta">
          <Button
            size="large"
            href={waUrlCurso(curso)}
            external
            ariaLabel={`Inscribirme al curso ${curso.nombre}`}
          >
            Inscribirme
          </Button>
          <Button
            size="large"
            variant="secondary"
            href="#modulos"
            arrow={false}
          >
            Ver contenido
          </Button>
        </div>
      </div>

      <div className="hold-course-hero__media-wrap">
        <div className="hold-course-hero__media" aria-hidden />
      </div>
    </section>
  )
}
