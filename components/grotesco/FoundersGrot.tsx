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

      <div className="grot-founders__grid">
        {founders.map((f, i) => (
          <article
            key={f.nombre}
            className="grot-founders__card"
            data-reveal="curtain"
            data-reveal-delay={i === 1 ? "0.2" : undefined}
          >
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
