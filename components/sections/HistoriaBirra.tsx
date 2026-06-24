"use client"

import { motion } from "framer-motion"
import { Placeholder } from "@/components/ui/Placeholder"
import { HISTORIA_BIRRA } from "@/data/content"
import { cardReveal, makeStagger, VIEWPORT_DEFAULT, wipeUp } from "@/lib/motion"
import "./historia-birra.css"

/**
 * Bloque de cierre narrativo de la home: cita REAL del PDF en 2 líneas
 * separadas (una negra normal, otra italic accent), + 2 placeholders
 * side-by-side con etiquetas de año (2021 = birra original, 2026 =
 * equipo actual). La cita entra con wipe vertical editorial escalonado.
 */
export function HistoriaBirra() {
  return (
    <section className="hold-birra">
      <motion.div
        className="hold-birra__cita-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={makeStagger(0.2, 0)}
      >
        <p className="hold-birra__eyebrow">El origen</p>
        <h3 className="hold-birra__cita">
          <span className="hold-birra__cita-clip">
            <motion.span
              className="hold-birra__cita-line"
              variants={wipeUp}
            >
              Las mejores decisiones se toman con una birra de por medio.
            </motion.span>
          </span>
          <span className="hold-birra__cita-clip">
            <motion.span
              className="hold-birra__cita-line hold-birra__cita-line--accent"
              variants={wipeUp}
            >
              La nuestra fue dejar de buscar la agencia que queríamos y
              construirla nosotras.
            </motion.span>
          </span>
        </h3>
      </motion.div>

      <motion.div
        className="hold-birra__fotos"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={makeStagger(0.18, 0.1)}
      >
        <motion.div
          className="hold-birra__foto-wrap"
          variants={cardReveal}
        >
          <div className="hold-birra__foto">
            <Placeholder ratio="3/2" label={HISTORIA_BIRRA.fotoBirra} />
          </div>
          <div className="hold-birra__foto-label">
            <span>La birra</span>
            <span className="hold-birra__foto-year">2021</span>
          </div>
        </motion.div>

        <motion.div
          className="hold-birra__foto-wrap hold-birra__foto-wrap--ancha"
          variants={cardReveal}
        >
          <div className="hold-birra__foto">
            <Placeholder ratio="3/2" label={HISTORIA_BIRRA.fotoEquipo} />
          </div>
          <div className="hold-birra__foto-label">
            <span>El equipo</span>
            <span className="hold-birra__foto-year">2026</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
