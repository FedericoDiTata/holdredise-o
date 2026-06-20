import type { Metadata } from "next"
import { Button } from "@/components/ui/Button"
import { PageHero } from "@/components/ui/PageHero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ClientesTabs } from "@/components/sections/ClientesTabs"
import { CasosGrid } from "@/components/sections/CasosGrid"
import { CTABand } from "@/components/sections/CTABand"
import { testimonios, WHATSAPP_URL } from "@/data/content"

export const metadata: Metadata = {
  title: "Clientes | HOLD",
  description:
    "Marcas y creadores que confiaron en HOLD. Testimonios reales, filtrados por servicio.",
}

export default function ClientesPage() {
  return (
    <main>
      <section className="section-container section-container--tight">
        <PageHero
          eyebrow="Clientes · 05"
          titulo={
            <>
              Lo que dicen{" "}
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>
                quienes ya pasaron por acá.
              </em>
            </>
          }
          intro="Cada testimonio es de un proyecto real. Cero filtros, cero edición: el resultado de trabajar con un foco claro y a largo plazo."
          actions={
            <>
              <Button
                size="large"
                href={WHATSAPP_URL}
                external
                ariaLabel="Hablemos por WhatsApp"
              >
                Sumate
              </Button>
              <Button size="large" variant="secondary" href="#testimonios" arrow={false}>
                Ver testimonios
              </Button>
            </>
          }
        />
      </section>

      <section
        id="testimonios"
        className="section-container section-container--tight"
        style={{ scrollMarginTop: "var(--hold-header-h, 72px)" }}
      >
        <SectionHeader
          titulo="Las voces detrás de cada proyecto."
          intro="Filtrá por servicio o explorá todos. Lo que vas a leer son citas literales de nuestros clientes."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <ClientesTabs testimonios={testimonios} />
        </div>
      </section>

      <section className="section-container section-container--tight">
        <SectionHeader
          titulo="Algunos proyectos que cuentan mejor que las palabras."
          intro="Una selección de trabajos representativos. Próximamente cada caso con su historia completa."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <CasosGrid />
        </div>
      </section>

      <CTABand
        eyebrow="Tu marca, próxima"
        title={
          <>
            ¿Querés sumarte a la <em>lista</em>?
          </>
        }
        sub="Charlemos sobre tu proyecto. Te respondemos en menos de 24 hs hábiles."
      />
    </main>
  )
}
