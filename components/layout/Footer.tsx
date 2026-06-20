import Link from "next/link"
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  OFICINA,
  TAGLINE,
  TEL_DISPLAY,
  TEL_HREF,
  WHATSAPP_URL,
} from "@/data/content"
import "./footer.css"

const SERVICIOS = [
  { label: "Hold Academy", href: "/academy" },
  { label: "Redes Sociales", href: "/redes-sociales" },
  { label: "Performance", href: "/performance" },
] as const

const SITIO = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Clientes", href: "/clientes" },
  { label: "Contacto", href: "/contacto" },
] as const

export function Footer() {
  return (
    <footer className="hold-footer">
      <div className="hold-footer__pattern" aria-hidden>
        h
      </div>

      <div className="hold-footer__inner">
        <div className="hold-footer__brand">
          <h2 className="hold-footer__logo">
            HOLD
            <span className="hold-footer__logo-r" aria-hidden>®</span>
          </h2>
          <span className="hold-footer__brand-tag">Agencia Creativa · Buenos Aires</span>
        </div>

        <div className="hold-footer__cols">
          <div>
            <h3 className="hold-footer__col-title">Servicios</h3>
            <ul className="hold-footer__col-list">
              {SERVICIOS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="hold-footer__col-title">Contacto</h3>
            <ul className="hold-footer__col-list">
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={TEL_HREF}>{TEL_DISPLAY}</a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <Link href="/trabaja-con-nosotros">Trabajá con nosotros</Link>
              </li>
              <li>
                <a
                  href={OFICINA.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Oficina: ${OFICINA.calle}, ${OFICINA.barrio}`}
                >
                  {OFICINA.calle} · {OFICINA.barrio}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="hold-footer__col-title">Sitio</h3>
            <ul className="hold-footer__col-list">
              {SITIO.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hold-footer__bottom">
          <span className="hold-footer__bottom-left">{TAGLINE}</span>
          <span>Buenos Aires · AR · v0.1</span>
        </div>

        <div className="hold-footer__legal">
          <span>HOLD® es marca registrada en el INPI.</span>
          <span>© {new Date().getFullYear()} HOLD Agencia Creativa</span>
        </div>
      </div>

      <div className="hold-footer__strip" aria-hidden />
    </footer>
  )
}
