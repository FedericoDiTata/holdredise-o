import { founders } from "@/data/content"
import { SectionTag } from "./SectionTag"
import "./founders-grot.css"

/**
 * Founders: claim grande + 2 retratos halftone que se revelan con
 * CORTINA (clip-path subiendo, data-reveal="curtain").
 */
export function FoundersGrot() {
  return (
    <section className="grot-founders grot-cover" id="founders">
      <SectionTag spot="right">Founders</SectionTag>

      <h2 className="grot-founders__claim" data-reveal="up">
        Decidimos construir lo que no{" "}
        <span className="grot-founders__claim-accent">encontrábamos.</span>
      </h2>

      {/* Host: el observer mira el grid y el CSS revela las cards con
          cortina (clip subiendo) cuando llega el .in. */}
      <div className="grot-founders__grid" data-reveal="host">
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
