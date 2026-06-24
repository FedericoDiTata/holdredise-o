import { HeroShader } from "@/components/sections/HeroShader"
import { BloqueCita } from "@/components/sections/BloqueCita"
import { ContadoresAnimados } from "@/components/sections/ContadoresAnimados"
import { TrabajosSection } from "@/components/sections/TrabajosSection"
import { ServiciosAccordion } from "@/components/sections/ServiciosAccordion"
import { ServiciosGrupos } from "@/components/sections/ServiciosGrupos"
import { FoundersHome } from "@/components/sections/FoundersHome"
import { HistoriaBirra } from "@/components/sections/HistoriaBirra"
import { CTABand } from "@/components/sections/CTABand"
import { MarqueeBand } from "@/components/effects/MarqueeBand"
import { SectionWipe } from "@/components/effects/SectionWipe"
import {
  CONTADORES_INTRO,
  MARQUEE_LO_QUE_HACEMOS,
  MARQUEE_QUIENES_SOMOS,
  contadoresHome,
  serviciosHome,
} from "@/data/content"

export default function Home() {
  return (
    <>
      <HeroShader />

      <section className="section-container section-container--tight">
        <BloqueCita />
      </section>

      <MarqueeBand items={[MARQUEE_LO_QUE_HACEMOS]} accent durationSec={28} />

      <section className="section-container section-container--tight">
        <ContadoresAnimados intro={CONTADORES_INTRO} items={contadoresHome} />
      </section>

      <section className="section-container section-container--tight">
        <TrabajosSection />
      </section>

      <section className="section-container section-container--tight">
        <ServiciosAccordion items={serviciosHome} />
      </section>

      <section className="section-container section-container--tight">
        <ServiciosGrupos />
      </section>

      <MarqueeBand items={[MARQUEE_QUIENES_SOMOS]} accent durationSec={28} />

      <section className="section-container section-container--tight">
        <SectionWipe>
          <FoundersHome />
        </SectionWipe>
      </section>

      <section className="section-container section-container--tight">
        <SectionWipe>
          <HistoriaBirra />
        </SectionWipe>
      </section>

      <SectionWipe>
        <CTABand
          title={
            <>
              ¿Hablamos sobre <em>tu marca?</em>
            </>
          }
          sub="Te respondemos en menos de 24 hs hábiles."
        />
      </SectionWipe>
    </>
  )
}
