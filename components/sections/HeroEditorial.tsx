import { Button } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/data/content"
import "./hero-editorial.css"

/**
 * Hero estilo magazine cover editorial.
 * Layout 2 columnas: izquierda bloque tipográfico principal con palabras
 * apareciendo en cascada; derecha composición visual con piezas del manual
 * de marca (h cursiva, palabras, color block, hatch). Animaciones 100% CSS.
 * Estado final estático.
 */
export function HeroEditorial() {
  return (
    <section className="hold-hero-ed" aria-label="Inicio">
      <h1 className="hold-hero-ed__sr">Sostener sin perder la esencia.</h1>

      {/* Líneas decorativas del marco tipo magazine cover. */}
      <div className="hold-hero-ed__top" aria-hidden>
        <span className="hold-hero-ed__index">N° 01 — HOME</span>
        <span className="hold-hero-ed__top-right">
          BUENOS AIRES · AGENCIA CREATIVA
        </span>
      </div>

      <div className="hold-hero-ed__inner">
        {/* COLUMNA IZQUIERDA — tipográfica protagonista */}
        <div className="hold-hero-ed__left">
          <p className="hold-hero-ed__eyebrow">
            <span className="hold-hero-ed__eyebrow-dot" aria-hidden />
            ESTRATEGIA · CONTENIDO · PERFORMANCE
          </p>

          <h2 className="hold-hero-ed__title" aria-hidden>
            <span className="hold-hero-ed__word" style={{ "--i": 0 } as React.CSSProperties}>
              Sostener
            </span>
            <span className="hold-hero-ed__word" style={{ "--i": 1 } as React.CSSProperties}>
              sin perder
            </span>
            <span className="hold-hero-ed__word" style={{ "--i": 2 } as React.CSSProperties}>
              la <em>esencia.</em>
            </span>
          </h2>

          <p className="hold-hero-ed__sub">
            Acá no te tiramos la posta:{" "}
            <em>te acompañamos a crear la tuya.</em>
          </p>

          <div className="hold-hero-ed__cta">
            <Button
              size="large"
              href={WHATSAPP_URL}
              external
              ariaLabel="Hablemos por WhatsApp"
            >
              Hablemos
            </Button>
            <Button
              size="large"
              variant="secondary"
              href="#servicios"
              arrow={false}
            >
              Servicios
            </Button>
          </div>
        </div>

        {/* COLUMNA DERECHA — composición visual */}
        <div className="hold-hero-ed__right" aria-hidden>
          {/* Card protagonista: h cursiva gigante en black */}
          <div
            className="hold-hero-ed__piece hold-hero-ed__piece--main"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <span className="hold-hero-ed__h">h</span>
          </div>

          {/* Card palabras de marca verticales */}
          <div
            className="hold-hero-ed__piece hold-hero-ed__piece--words"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <span>Comunidad</span>
            <span>Marcas</span>
            <span>Resultados</span>
          </div>

          {/* Card chica con color block del acento */}
          <div
            className="hold-hero-ed__piece hold-hero-ed__piece--accent"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <span className="hold-hero-ed__h hold-hero-ed__h--sm">h</span>
          </div>

          {/* Card hatch del manual */}
          <div
            className="hold-hero-ed__piece hold-hero-ed__piece--hatch"
            style={{ "--i": 4 } as React.CSSProperties}
            aria-hidden
          />

          {/* Número grande estilo magazine — index visual */}
          <div
            className="hold-hero-ed__piece hold-hero-ed__piece--num"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            <span>01</span>
          </div>
        </div>
      </div>

      {/* Pie del hero — tagline horizontal estilo magazine spine */}
      <div className="hold-hero-ed__bottom" aria-hidden>
        <span>HOLD</span>
        <span className="hold-hero-ed__bottom-line" />
        <span className="hold-hero-ed__tagline-final">
          Sostener sin perder la esencia
        </span>
        <span className="hold-hero-ed__bottom-line" />
        <span>BUENOS AIRES</span>
      </div>
    </section>
  )
}
