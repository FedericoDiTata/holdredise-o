import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { CourseHero } from "@/components/sections/CourseHero"
import { CourseModules } from "@/components/sections/CourseModules"
import { RelatedCourses } from "@/components/sections/RelatedCourses"
import { CTABand } from "@/components/sections/CTABand"
import { cursos, waUrlCurso } from "@/data/content"

interface Props {
  params: Promise<{ curso: string }>
}

/* Genera estáticamente las 6 páginas de curso en build time.
   Si alguien navega a /academy/no-existe, dispara notFound() abajo. */
export function generateStaticParams() {
  return cursos.map((c) => ({ curso: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { curso: slug } = await params
  const curso = cursos.find((c) => c.slug === slug)
  if (!curso) {
    return { title: "Curso no encontrado | Hold Academy" }
  }
  return {
    title: `${curso.nombre} | Hold Academy`,
    description:
      curso.descripcion ?? `${curso.nombre} — Curso de HOLD Academy.`,
    /* Páginas internas — solo se llega desde el grid de Academy.
       No queremos que aparezcan en buscadores como entrada directa. */
    robots: { index: false, follow: true },
  }
}

export default async function CursoPage({ params }: Props) {
  const { curso: slug } = await params
  const curso = cursos.find((c) => c.slug === slug)
  if (!curso) notFound()

  return (
    <main data-service="academy">
      <section className="section-container section-container--tight">
        <CourseHero curso={curso} />
      </section>

      <section className="section-container section-container--tight">
        <CourseModules curso={curso} />
      </section>

      <section className="section-container section-container--tight">
        <SectionHeader
          titulo="Otros cursos de Academy."
          intro="Mientras tanto, podés explorar el resto de la grilla."
        />
        <div style={{ marginTop: 48 }} data-reveal data-reveal-delay="0.2">
          <RelatedCourses currentSlug={curso.slug} />
        </div>
      </section>

      <CTABand
        eyebrow="Inscripción"
        title={
          <>
            ¿Tenés alguna duda antes de <em>sumarte?</em>
          </>
        }
        sub="Escribinos por WhatsApp y te respondemos en menos de 24 hs hábiles."
        ctaLabel="Inscribirme"
        ctaHref={waUrlCurso(curso)}
        ctaExternal
      />
    </main>
  )
}
