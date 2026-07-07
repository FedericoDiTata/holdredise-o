import "./birra-grot.css"

/**
 * La historia de la birra (va justo después de Founders, según el doc
 * de las chicas): la cita en grande + 2 fotos UNIDAS en horizontal con
 * palabras gigantes encima ("la birra 2021" / "equipo").
 *
 * Las fotos son placeholders halftone por ahora; las palabras overlay
 * ya quedan maquetadas como en la referencia para cuando lleguen las
 * imágenes reales.
 */
export function BirraGrot() {
  return (
    <section className="grot-birra grot-cover" aria-label="Nuestra historia">
      <blockquote className="grot-birra__quote" data-reveal="up">
        <p className="grot-birra__line">
          Las mejores decisiones se toman con una birra de por medio.
        </p>
        <p className="grot-birra__line grot-birra__line--accent">
          La nuestra fue dejar de buscar la agencia que queríamos y
          construirla nosotras.
        </p>
      </blockquote>

      {/* Host: el observer mira el strip (sin clip) y el CSS abre cada
          panel con wipe desde su lado cuando llega el .in. */}
      <div className="grot-birra__strip" data-reveal="host">
        <figure className="grot-birra__panel grot-birra__panel--dark">
          <span className="grot-birra__tag" aria-hidden>
            [ foto · la birra ]
          </span>
          <span
            className="grot-birra__word grot-birra__word--left"
            aria-hidden
          >
            la birra
            <br />
            2021
          </span>
        </figure>

        <figure className="grot-birra__panel grot-birra__panel--dark">
          <span className="grot-birra__tag" aria-hidden>
            [ foto · equipo ]
          </span>
          <span
            className="grot-birra__word grot-birra__word--right"
            aria-hidden
          >
            equipo
          </span>
        </figure>
      </div>
    </section>
  )
}
