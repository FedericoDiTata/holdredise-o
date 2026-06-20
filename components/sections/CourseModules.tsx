import type { Curso } from "@/types"
import "./course-modules.css"

type Props = {
  curso: Curso
}

/**
 * Bloque de "Qué vas a aprender" para el detalle de curso.
 * Split: izquierda lista de módulos numerados editorial,
 * derecha sidebar con destinatario + qué incluye + próxima fecha.
 */
export function CourseModules({ curso }: Props) {
  const modulos = curso.modulos ?? []
  const incluye = curso.incluye ?? []

  return (
    <section
      id="modulos"
      className="hold-course-modules"
      style={{ scrollMarginTop: "var(--hold-header-h, 72px)" }}
    >
      <div className="hold-course-modules__main">
        <div className="hold-course-modules__head">
          <p className="hold-course-modules__label">Contenido</p>
          <h2 className="hold-course-modules__title">
            Qué vas a <em>aprender.</em>
          </h2>
        </div>

        {modulos.length > 0 ? (
          <ol className="hold-course-modules__list" role="list">
            {modulos.map((modulo, i) => (
              <li key={modulo} className="hold-course-modules__item">
                <span className="hold-course-modules__item-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="hold-course-modules__item-text">{modulo}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <aside className="hold-course-modules__side">
        {curso.destinatario ? (
          <div className="hold-course-modules__side-block">
            <p className="hold-course-modules__side-label">Para quién es</p>
            <p className="hold-course-modules__destinatario">
              {curso.destinatario}
            </p>
          </div>
        ) : null}

        {incluye.length > 0 ? (
          <div className="hold-course-modules__side-block">
            <p className="hold-course-modules__side-label">Qué incluye</p>
            <ul className="hold-course-modules__incluye" role="list">
              {incluye.map((item) => (
                <li key={item} className="hold-course-modules__incluye-row">
                  <span
                    className="hold-course-modules__incluye-bullet"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {curso.proximaFecha ? (
          <div className="hold-course-modules__fecha">
            <p className="hold-course-modules__side-label">Próxima fecha</p>
            <p className="hold-course-modules__fecha-value">
              {curso.proximaFecha}
            </p>
          </div>
        ) : null}
      </aside>
    </section>
  )
}
