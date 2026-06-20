import { BLOQUE_CITA, trabajos } from "@/data/content"
import "./bloque-cita.css"

/**
 * Sección editorial que arranca debajo del hero. Cita REAL del PDF a
 * la izquierda, grilla de 4 ejemplos de cliente + rubro a la derecha
 * (placeholders por ahora — labels lorem). Sin animaciones complejas:
 * se apoya en `data-reveal` global para el fade-up al entrar al
 * viewport.
 */
export function BloqueCita() {
  const ejemplos = trabajos.slice(0, 4)

  return (
    <section className="hold-bloque-cita">
      <div className="hold-bloque-cita__main" data-reveal>
        <p className="hold-bloque-cita__eyebrow">Manifiesto</p>
        <h2 className="hold-bloque-cita__titulo">{BLOQUE_CITA.titulo}</h2>
        <p className="hold-bloque-cita__bajada">
          Nosotras preferimos <em>no venderte humo</em>, nos involucramos en
          tu negocio.
        </p>
      </div>

      <div
        className="hold-bloque-cita__grid"
        data-reveal
        data-reveal-delay="0.2"
      >
        {ejemplos.map((ej, i) => (
          <article key={ej.cliente} className="hold-bloque-cita__card">
            <span className="hold-bloque-cita__card-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="hold-bloque-cita__card-meta">
              <span className="hold-bloque-cita__card-cliente">
                {ej.cliente}
              </span>
              <span className="hold-bloque-cita__card-rubro">{ej.rubro}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
