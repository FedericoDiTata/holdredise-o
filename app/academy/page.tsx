import type { Metadata } from "next"
import { Button } from "@/components/ui/Button"
import { PageHeroTextured } from "@/components/ui/PageHeroTextured"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { HeroScroll } from "@/components/sections/HeroScroll"
import { CoursesBento } from "@/components/sections/CoursesBento"
import { CustomTraining } from "@/components/sections/CustomTraining"
import { CTABand } from "@/components/sections/CTABand"
import { servicios, WHATSAPP_URL } from "@/data/content"

export const metadata: Metadata = {
  title: "Hold Academy | HOLD",
  description:
    "Cursos, entrenamientos y mentorías para creadores de contenido, emprendedores y profesionales que quieren dejar de improvisar.",
}

const ACADEMY = servicios.find((s) => s.slug === "academy")!

export default function AcademyPage() {
  return (
    <main data-service="academy">
      <PageHeroTextured
        eyebrow={`${ACADEMY.eyebrow} · ${ACADEMY.numero}`}
        titulo={
          <>
            Aprendimos haciendo,{" "}
            <em>ahora lo enseñamos.</em>
          </>
        }
        intro={ACADEMY.descripcion}
        actions={
          <>
            <Button
              size="large"
              href={WHATSAPP_URL}
              external
              ariaLabel="Quiero asesoramiento por WhatsApp"
            >
              Quiero saber más
            </Button>
            <Button size="large" variant="secondary" href="#cursos" arrow={false}>
              Ver cursos
            </Button>
          </>
        }
      />

      <HeroScroll
        introEyebrow="La filosofía"
        introTitle={
          <>
            Aprendé como nosotros: <em>haciendo</em>.
          </>
        }
        introSub="Lo que enseñamos lo aprendimos antes con clientes reales. No es teoría empacada bonita — son procedimientos que vimos funcionar."
        galleryTitle={
          <>
            Detrás de cada curso, <em>una historia real</em>.
          </>
        }
        galleryMeta="Academy · 2025"
        images={["Clase", "Mentoría", "Workshop", "1:1"]}
      />

      <section
        id="cursos"
        className="section-container section-container--tight"
        style={{ scrollMarginTop: "var(--hold-header-h, 72px)" }}
      >
        <SectionHeader
          titulo="Formatos que se adaptan a tu momento."
          intro="Cada curso tiene formato, duración y precio claros. Tocá la tarjeta para coordinar tu inscripción por WhatsApp — te responde una persona del equipo."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <CoursesBento />
        </div>
      </section>

      <section className="section-container section-container--tight">
        <SectionHeader
          titulo="Capacitaciones Personalizadas."
          intro="Si tu equipo o tu empresa necesita una formación específica, armamos el programa desde cero."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <CustomTraining />
        </div>
      </section>

      <CTABand
        eyebrow="Próximo paso"
        title={
          <>
            ¿Querés sumarte a un curso o armar uno{" "}
            <em>a medida</em>?
          </>
        }
        sub="Te respondemos en menos de 24 hs hábiles."
      />
    </main>
  )
}
