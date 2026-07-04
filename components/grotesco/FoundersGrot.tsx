import { founders } from "@/data/content"
import { SectionTag } from "./SectionTag"
import "./founders-grot.css"

/**
 * Founders: claim grande + 2 retratos halftone lado a lado con el
 * nombre gigante y el rol en mono accent. Placeholders de puntos hasta
 * que lleguen las fotos reales.
 */
export function FoundersGrot() {
  return (
    <section className="grot-founders grot-cover" id="founders">
      <SectionTag>Founders</SectionTag>

      <h2 className="grot-founders__claim">
        Decidimos construir lo que no{" "}
        <span className="grot-founders__claim-accent">encontrábamos.</span>
      </h2>

      <div className="grot-founders__grid">
        {founders.map((f, i) => (
          <article key={f.nombre} className="grot-founders__card">
            <div
              className={
                "grot-founders__photo " +
                (i === 0
                  ? "grot-founders__photo--dark"
                  : "grot-founders__photo--accent")
              }
              aria-hidden
            >
              <span className="grot-founders__tag">
                [ retrato · {f.nombre.split(" ")[0]} ]
              </span>
            </div>
            <div className="grot-founders__meta">
              <h3 className="grot-founders__nombre">{f.nombre}</h3>
              <p className="grot-founders__rol">{f.rol}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
