import { TypingPhrases } from "./TypingPhrases"
import "./hero-grot.css"

/**
 * Hero grotesco con sistema de grilla visible: strip superior de celdas
 * mono con el manifiesto corto, título gigante en 2 líneas (la segunda
 * es un typewriter de frases completas que alternan), y fila inferior
 * con la bajada + indicador de scroll.
 *
 * Sin etiquetas numeradas. Los bordes 1px negros son el esqueleto.
 */
export function HeroGrot() {
  return (
    <section className="grot-hero" id="inicio" aria-label="Inicio">
      <h1 className="grot-hero__sr">
        No solo hacemos contenido, construimos marcas.
      </h1>

      <div className="grot-hero__strip" aria-hidden>
        <div className="grot-hero__cell">No llegamos a cambiarte</div>
        <div className="grot-hero__cell">Llegamos a sostenerte</div>
        <div className="grot-hero__cell grot-hero__cell--right">
          <span>Buenos Aires</span>
          <span>EST. 2021</span>
        </div>
      </div>

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
        <div className="grot-hero__scroll" aria-hidden>
          <span className="grot-hero__scroll-circle">↓</span>
          Scroll
        </div>
      </div>
    </section>
  )
}
