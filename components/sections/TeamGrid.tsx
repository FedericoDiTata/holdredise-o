import { team } from "@/data/content"
import "./team-grid.css"

/**
 * Grilla del equipo extendido (sin dividir por áreas). Cada card tiene
 * foto placeholder (3/4) + nombre + rol. Hover: card sube + foto escala
 * + overlay del accent + nombre pasa a accent. Inspirado en pairlab.co
 * pero adaptado al DS HOLD: paleta b/n/azul, border 0, sin transiciones
 * complejas — la UX se queda simple y editorial.
 */
export function TeamGrid() {
  return (
    <div className="hold-team-grid">
      {team.map((member, i) => (
        <article key={member.nombre} className="hold-team-grid__card">
          <div className="hold-team-grid__photo-wrap">
            <span className="hold-team-grid__initial" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="hold-team-grid__photo" aria-hidden />
            <div className="hold-team-grid__overlay" aria-hidden />
          </div>
          <div className="hold-team-grid__meta">
            <h3 className="hold-team-grid__name">{member.nombre}</h3>
            <p className="hold-team-grid__role">{member.rol}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
