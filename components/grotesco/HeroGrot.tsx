import { TypingPhrases } from "./TypingPhrases"
import "./hero-grot.css"

/**
 * Hero grotesco: título gigante en 2 líneas (la segunda es un
 * typewriter de frases completas que alternan) + bajada. Limpio,
 * sin ornamentos: la tipografía es la protagonista.
 */
export function HeroGrot() {
  return (
    <section className="grot-hero" id="inicio" aria-label="Inicio">
      <h1 className="grot-hero__sr">
        No solo hacemos contenido, construimos marcas.
      </h1>

      <div className="grot-hero__title-wrap" aria-hidden>
        <p className="grot-hero__title">
          <span className="grot-hero__line">No solo hacemos contenido,</span>
          <span className="grot-hero__line grot-hero__line--typed">
            <TypingPhrases />
          </span>
        </p>
      </div>

      <div className="grot-hero__bottom">
        <p className="grot-hero__sub">
          Ayudamos a negocios y creadores a transformar su presencia digital
          en una marca con identidad, estrategia y resultados.{" "}
          <strong>Nos involucramos en tu negocio.</strong>
        </p>
      </div>
    </section>
  )
}
