import { EMAIL, WHATSAPP_URL } from "@/data/content"
import "./cierre-grot.css"

/**
 * Cierre: bloque accent con el claim gigante y los 2 canales reales
 * (WhatsApp como CTA principal, email como link grande).
 */
export function CierreGrot() {
  return (
    <section className="grot-cierre grot-cover" id="contacto">
      <p className="grot-cierre__kicker">Hablemos</p>

      <h2 className="grot-cierre__claim">
        <span className="grot-cierre__row">Construyamos</span>
        <span className="grot-cierre__row">tu marca.</span>
      </h2>

      <div className="grot-cierre__actions">
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
