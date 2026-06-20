import { serviciosGrupos } from "@/data/content"
import "./servicios-grupos.css"

/**
 * Tres macro-bloques de servicios (HOLD BRANDS / TALENTS / PERFORMANCE)
 * en grid 3-col. Cada grupo lista sus items como bullets con dot azul.
 * Copy REAL completo del PDF — sin lorem acá.
 */
export function ServiciosGrupos() {
  return (
    <div className="hold-grupos">
      {serviciosGrupos.map((grupo, i) => (
        <article
          key={grupo.titulo}
          className="hold-grupo"
          data-reveal
          data-reveal-delay={i === 0 ? undefined : i === 1 ? "0.1" : "0.2"}
        >
          <span className="hold-grupo__num">{grupo.numero}</span>
          <h3 className="hold-grupo__titulo">{grupo.titulo}</h3>
          <p className="hold-grupo__desc">{grupo.descripcion}</p>
          <ul className="hold-grupo__bullets" role="list">
            {grupo.bullets.map((b) => (
              <li key={b} className="hold-grupo__bullet">
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
