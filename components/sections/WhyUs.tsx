import "./why-us.css"

/**
 * Sección "¿Por qué elegirnos?" — manifiesto editorial sin bloques.
 * Split sticky: label/heading a la izquierda (queda fijo en scroll en
 * desktop) + cuerpo en 4 párrafos a la derecha, último en bold con
 * "sostenerte" en italic accent. Reemplaza al ex-bento "Lo que nos
 * diferencia". */
export function WhyUs() {
  return (
    <section className="hold-whyus" aria-labelledby="whyus-heading">
      <div className="hold-whyus__head">
        <p className="hold-whyus__label">Lo que nos diferencia</p>
        <h2 id="whyus-heading" className="hold-whyus__heading">
          ¿Por qué <em>elegirnos?</em>
        </h2>
      </div>

      <div className="hold-whyus__body">
        <p>
          Porque conocemos el miedo de cualquiera que construyó algo de cero:
          que al delegar, se pierda lo que lo hace único.
        </p>
        <p>
          Lo difícil no es crear una identidad, es no perderla en el camino.
        </p>
        <p>
          Tu marca tiene algo que la hace única. Y nuestro trabajo es que no
          lo pierda.
        </p>
        <p>
          No llegamos a cambiarte. Llegamos a <em>sostenerte.</em>
        </p>
      </div>
    </section>
  )
}
