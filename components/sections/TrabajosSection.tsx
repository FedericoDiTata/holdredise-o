"use client"

import { motion } from "framer-motion"
import { BorderTrace } from "@/components/effects/BorderTrace"
import { MarqueeBand } from "@/components/effects/MarqueeBand"
import { ProjectCardHover } from "@/components/ui/ProjectCardHover"
import { trabajos } from "@/data/content"
import { cardReveal3D, makeStagger, VIEWPORT_DEFAULT } from "@/lib/motion"
import "./trabajos-section.css"

/**
 * Sección de TRABAJOS de la home. Arriba: marquee infinito con la
 * palabra "TRABAJOS" en italic gigante. Abajo: grid 3-col de project
 * cards que entran con un rotateX 3D + spring stagger — el grid tiene
 * `perspective` en CSS para que el tilt se vea. Sensación cinematográfica
 * editorial al entrar al viewport.
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
        variants={makeStagger(0.11, 0.08)}
        style={{ position: "relative" }}
      >
        {trabajos.map((t, i) => (
          <motion.div
            key={t.cliente}
            className="hold-trabajos__card"
            variants={cardReveal3D}
          >
            <BorderTrace delay={0.25 + i * 0.08} duration={1.4} fadeOut />
            <ProjectCardHover trabajo={t} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
