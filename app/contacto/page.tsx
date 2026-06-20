import type { Metadata } from "next"
import { PageHero } from "@/components/ui/PageHero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ContactMethods } from "@/components/sections/ContactMethods"
import { OFICINA } from "@/data/content"

export const metadata: Metadata = {
  title: "Contacto | HOLD",
  description:
    "Hablemos. Escribinos por WhatsApp, mail o Instagram. Oficina en Villa Urquiza, Buenos Aires.",
}

export default function ContactoPage() {
  return (
    <main>
      <section className="section-container section-container--tight">
        <PageHero
          eyebrow="Contacto · 06"
          titulo={
            <>
              Estamos a un mensaje{" "}
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>
                de distancia.
              </em>
            </>
          }
          intro="No usamos formularios para esquivarte: escribinos por el canal que prefieras y te responde una persona del equipo en menos de 24 hs hábiles."
        />
      </section>

      <section className="section-container section-container--tight">
        <SectionHeader
          titulo="Elegí el que te quede más cómodo."
          intro="WhatsApp para charlas rápidas, mail para propuestas más largas, Instagram para ver lo que estamos haciendo."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <ContactMethods />
        </div>
      </section>

      <section className="section-container section-container--tight">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            paddingTop: 48,
            borderTop: "1px solid var(--hairline)",
          }}
        >
          <div>
            <p
              className="t-micro"
              style={{ color: "var(--muted)", marginBottom: 12 }}
            >
              Oficina
            </p>
            <p className="t-h3" style={{ fontWeight: 400 }}>
              <a
                href={OFICINA.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--fg)", textDecoration: "none" }}
                aria-label={`Ver ${OFICINA.calle} en Google Maps`}
              >
                {OFICINA.calle}
                <br />
                {OFICINA.barrio} · {OFICINA.ciudad}
              </a>
            </p>
          </div>
          <div>
            <p
              className="t-micro"
              style={{ color: "var(--muted)", marginBottom: 12 }}
            >
              Atención
            </p>
            <p className="t-h3" style={{ fontWeight: 400 }}>
              Lunes a viernes
              <br />
              10 a 19 hs (UTC−3)
            </p>
          </div>
          <div>
            <p
              className="t-micro"
              style={{ color: "var(--muted)", marginBottom: 12 }}
            >
              Trabajá con nosotros
            </p>
            <p className="t-h3" style={{ fontWeight: 400 }}>
              <a
                href="/trabaja-con-nosotros"
                style={{ color: "var(--fg)", textDecoration: "none" }}
              >
                Postulate →
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
