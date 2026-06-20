import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cursos } from "@/data/content"
import "./courses-bento.css"

/**
 * Bento de cursos para Academy. Cada celda linkea a /academy/{slug}
 * (la única forma de acceder a las páginas de detalle de curso).
 * Bento asimétrico 12-col: hero (col 1-7, row 1-2) + 5 celdas
 * acompañando. La celda hero muestra además la descripción.
 */
export function CoursesBento() {
  return (
    <div className="hold-courses-bento">
      {cursos.map((curso) => (
        <Link
          key={curso.slug}
          href={`/academy/${curso.slug}`}
          className="hold-courses-bento__card"
          aria-label={`Ver detalle del curso ${curso.nombre}`}
        >
          <div className="hold-courses-bento__media" aria-hidden />
          <div className="hold-courses-bento__overlay" aria-hidden />

          <div className="hold-courses-bento__head">
            <span className="hold-courses-bento__status">
              <span
                className="hold-courses-bento__status-dot"
                data-estado={curso.estado}
                aria-hidden
              />
              {curso.estado}
            </span>
          </div>

          <div className="hold-courses-bento__body">
            <h3 className="hold-courses-bento__nombre">{curso.nombre}</h3>

            {curso.descripcion ? (
              <p className="hold-courses-bento__desc">{curso.descripcion}</p>
            ) : null}

            <div className="hold-courses-bento__meta">
              <div className="hold-courses-bento__precio">
                {curso.precio ? (
                  <span className="hold-courses-bento__precio-amount">
                    {curso.precio}
                  </span>
                ) : null}
                <span className="hold-courses-bento__precio-formato">
                  {curso.formato}
                </span>
              </div>
              <ArrowUpRight
                className="hold-courses-bento__arrow"
                size={20}
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
