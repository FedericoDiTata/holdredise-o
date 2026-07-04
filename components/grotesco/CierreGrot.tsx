import { EMAIL, WHATSAPP_URL } from "@/data/content"
import { SectionTag } from "./SectionTag"
import "./cierre-grot.css"

/**
 * Cierre: claim gigante con MASK reveal por renglón (cada línea sube
 * desde su propio clip, data-reveal="mask") + CTA con pop.
 */
export function CierreGrot() {
  return (
    <section className="grot-cierre grot-cover" id="contacto">
      <SectionTag dark spot="center">
        Hablemos
      </SectionTag>

      <h2 className="grot-cierre__claim">
        {["Construyamos", "tu marca."].map((line, i) => (
          <span key={line} className="grot-cierre__row-clip">
            <span
              className="grot-cierre__row"
              data-reveal="mask"
              data-reveal-delay={i === 1 ? "0.15" : undefined}
            >
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div
        className="grot-cierre__actions"
        data-reveal="scale"
        data-reveal-delay="0.3"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="grot-cierre__cta"
        >
          Hablemos por WhatsApp ↗
        </a>
        <a href={`mailto:${EMAIL}`} className="grot-cierre__mail">
          {EMAIL}
        </a>
      </div>

      <div className="grot-cierre__foot">
        <span>Buenos Aires · Argentina</span>
        <span>Te respondemos en menos de 24 hs hábiles</span>
      </div>
    </section>
  )
}
