"use client"

import { motion } from "framer-motion"
import { MarqueeBand } from "@/components/effects/MarqueeBand"
import { ProjectCardHover } from "@/components/ui/ProjectCardHover"
import { trabajos } from "@/data/content"
import { cardReveal, makeStagger, VIEWPORT_DEFAULT } from "@/lib/motion"
import "./trabajos-section.css"

/**
 * Sección de TRABAJOS de la home. Arriba: marquee infinito con la
 * palabra "TRABAJOS" en italic gigante (reutiliza MarqueeBand). Abajo:
 * grid 3-col de project cards con hover-cycle de fotos placeholder.
 * Cards entran con spring stagger cuando la sección es visible.
 */
export function TrabajosSection() {
  return (
    <section className="hold-trabajos">
      <MarqueeBand
        items={["TRABAJOS"]}
        italic
        durationSec={36}
      />

      <motion.div
        className="hold-trabajos__grid"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={makeStagger(0.09, 0.05)}
      >
        {trabajos.map((t) => (
          <motion.div key={t.cliente} variants={cardReveal}>
            <ProjectCardHover trabajo={t} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
