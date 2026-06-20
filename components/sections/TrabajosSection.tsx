import { MarqueeBand } from "@/components/effects/MarqueeBand"
import { ProjectCardHover } from "@/components/ui/ProjectCardHover"
import { trabajos } from "@/data/content"
import "./trabajos-section.css"

/**
 * Sección de TRABAJOS de la home. Arriba: marquee infinito con la
 * palabra "TRABAJOS" en italic gigante (reutiliza MarqueeBand). Abajo:
 * grid 3-col de project cards con hover-cycle de fotos placeholder.
 */
export function TrabajosSection() {
  return (
    <section className="hold-trabajos">
      <MarqueeBand
        items={["TRABAJOS"]}
        italic
        durationSec={36}
      />

      <div
        className="hold-trabajos__grid"
        data-reveal
        data-reveal-delay="0.1"
      >
        {trabajos.map((t) => (
          <ProjectCardHover key={t.cliente} trabajo={t} />
        ))}
      </div>
    </section>
  )
}
