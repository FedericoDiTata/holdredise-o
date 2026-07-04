import { MarqueeGrot } from "./MarqueeGrot"
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from "@/data/content"
import "./footer-grot.css"

/**
 * Footer grotesco: marquee "Sostener y contener" invertido + grilla de
 * contacto con los datos reales + strip de cierre.
 */
export function FooterGrot() {
  const whatsappPretty = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 3)} ${WHATSAPP_NUMBER.slice(3, 5)} ${WHATSAPP_NUMBER.slice(5, 9)} ${WHATSAPP_NUMBER.slice(9)}`

  return (
    <footer className="grot-footer grot-cover">
      <MarqueeGrot
        text="Sostener y contener"
        dark
        durationSec={18}
        repeats={5}
        tilt="right"
      />

      <div className="grot-footer__grid">
        <div className="grot-footer__brand">
          <span className="grot-footer__logo">
            hold<span>.</span>
          </span>
          <p className="grot-footer__tagline">
            No llegamos a cambiarte, llegamos a sostenerte.
          </p>
        </div>

        <div className="grot-footer__col">
          <span className="grot-footer__col-title">Contacto</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {whatsappPretty}
          </a>
          <span>Buenos Aires, AR</span>
        </div>

        <div className="grot-footer__col">
          <span className="grot-footer__col-title">Seguinos</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram {INSTAGRAM_HANDLE} ↗
          </a>
        </div>
      </div>

      <div className="grot-footer__strip">
        <span>© 2026 HOLD · Agencia Creativa</span>
        <span>Hecho con intención</span>
      </div>
    </footer>
  )
}
