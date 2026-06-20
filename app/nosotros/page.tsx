import type { Metadata } from "next"
import { Button } from "@/components/ui/Button"
import { PageHero } from "@/components/ui/PageHero"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Founders } from "@/components/sections/Founders"
import { TeamGrid } from "@/components/sections/TeamGrid"
import { PhotoGallery } from "@/components/sections/PhotoGallery"
import { WhyUs } from "@/components/sections/WhyUs"
import { CTABand } from "@/components/sections/CTABand"
import { WHATSAPP_URL } from "@/data/content"

export const metadata: Metadata = {
  title: "Nosotros | HOLD",
  description:
    "No somos la agencia que te dice que sí a todo. Equipo multidisciplinario que trabaja desde adentro hacia afuera, desde tu identidad.",
}

export default function NosotrosPage() {
  return (
    <main>
      <section className="section-container section-container--tight">
        <PageHero
          eyebrow="Nosotros · 04"
          titulo={
            <>
              No somos la agencia que te dice que sí <em>a todo.</em>
            </>
          }
          actions={
            <>
              <Button
                size="large"
                href={WHATSAPP_URL}
                external
                ariaLabel="Hablemos por WhatsApp"
              >
                Hablemos
              </Button>
              <Button size="large" variant="secondary" href="#equipo" arrow={false}>
                Conocer el equipo
              </Button>
            </>
          }
        />
      </section>

      <section className="section-container section-container--tight">
        <SectionHeader titulo="Las que arrancaron HOLD ;)" />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <Founders />
        </div>
      </section>

      <section
        id="equipo"
        className="section-container section-container--tight"
        style={{ scrollMarginTop: "var(--hold-header-h, 72px)" }}
      >
        <SectionHeader
          titulo="Un equipo multidisciplinario."
          intro="Especialistas en comunicación, diseño, performance y producción trabajando como una sola unidad detrás de cada proyecto."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <TeamGrid />
        </div>
      </section>

      <section className="section-container section-container--tight">
        <div data-reveal data-reveal-delay="0.2">
          <WhyUs />
        </div>
      </section>

      <section className="section-container section-container--tight">
        <SectionHeader titulo="Detrás de escena." />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <PhotoGallery />
        </div>
      </section>

      <CTABand
        eyebrow="Trabajemos juntos"
        title={<>¿Te interesa lo que <em>hacemos?</em></>}
      />
    </main>
  )
}
