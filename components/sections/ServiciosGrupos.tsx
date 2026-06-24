"use client"

import { motion } from "framer-motion"
import { serviciosGrupos } from "@/data/content"
import {
  fadeUp,
  makeStagger,
  staggerItem,
  VIEWPORT_DEFAULT,
} from "@/lib/motion"
import "./servicios-grupos.css"

/**
 * Tres macro-bloques de servicios (HOLD BRANDS / TALENTS / PERFORMANCE)
 * en grid 3-col con subgrid: títulos, descripciones y bullets quedan
 * perfectamente alineados por fila aunque "HOLD PERFORMANCE" rompa en
 * 2 líneas. Cards entran con stagger; bullets internos con stagger
 * secundario. Copy REAL completo del PDF.
 */
export function ServiciosGrupos() {
  return (
    <motion.div
      className="hold-grupos"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={makeStagger(0.14, 0.1)}
    >
      {serviciosGrupos.map((grupo) => (
        <motion.article
          key={grupo.titulo}
          className="hold-grupo"
          variants={fadeUp}
        >
          <h3 className="hold-grupo__titulo">
            <span className="hold-grupo__titulo-text">{grupo.titulo}</span>
          </h3>
          <p className="hold-grupo__desc">{grupo.descripcion}</p>
          <motion.ul
            className="hold-grupo__bullets"
            role="list"
            variants={makeStagger(0.05, 0.2)}
          >
            {grupo.bullets.map((b) => (
              <motion.li
                key={b}
                className="hold-grupo__bullet"
                variants={staggerItem}
              >
                <span>{b}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      ))}
    </motion.div>
  )
}
