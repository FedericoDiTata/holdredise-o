"use client"

import { motion } from "framer-motion"
import { BLOQUE_CITA, trabajos } from "@/data/content"
import {
  blurFadeUp,
  cardReveal,
  fadeUp,
  makeStagger,
  VIEWPORT_DEFAULT,
} from "@/lib/motion"
import "./bloque-cita.css"

/**
 * Sección editorial bajo el hero. Cita REAL del PDF a la izquierda,
 * grilla de 4 ejemplos a la derecha. La cita entra con blur-fade-up
 * editorial; los 4 cards a la derecha con spring stagger.
 */
export function BloqueCita() {
  const ejemplos = trabajos.slice(0, 4)

  return (
    <section className="hold-bloque-cita">
      <motion.div
        className="hold-bloque-cita__main"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={makeStagger(0.12, 0)}
      >
        <motion.p
          className="hold-bloque-cita__eyebrow"
          variants={fadeUp}
        >
          Manifiesto
        </motion.p>
        <motion.h2
          className="hold-bloque-cita__titulo"
          variants={blurFadeUp}
        >
          {BLOQUE_CITA.titulo}
        </motion.h2>
        <motion.p
          className="hold-bloque-cita__bajada"
          variants={fadeUp}
        >
          Nosotras preferimos <em>no venderte humo</em>, nos involucramos en
          tu negocio.
        </motion.p>
      </motion.div>

      <motion.div
        className="hold-bloque-cita__grid"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={makeStagger(0.08, 0.25)}
      >
        {ejemplos.map((ej, i) => (
          <motion.article
            key={ej.cliente}
            className="hold-bloque-cita__card"
            variants={cardReveal}
          >
            <span className="hold-bloque-cita__card-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="hold-bloque-cita__card-meta">
              <span className="hold-bloque-cita__card-cliente">
                {ej.cliente}
              </span>
              <span className="hold-bloque-cita__card-rubro">{ej.rubro}</span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
