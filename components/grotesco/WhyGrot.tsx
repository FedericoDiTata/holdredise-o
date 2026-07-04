"use client"

import { motion } from "framer-motion"
import { SectionTag } from "./SectionTag"
import "./why-grot.css"

const RAZONES = [
  {
    titulo: "Nos involucramos",
    texto:
      "Entramos en tu negocio como si fuera nuestro. No tercerizamos el cuidado.",
  },
  {
    titulo: "Estrategia antes que estética",
    texto:
      "Lo lindo sin un porqué no sirve. Cada decisión tiene una intención.",
  },
  {
    titulo: "Equipo multidisciplinario",
    texto: "Más de 15 personas, una sola visión sosteniendo cada proyecto.",
  },
  {
    titulo: "Sin humo",
    texto: "Resultados que se miden, no que se prometen.",
  },
] as const

/**
 * Por qué elegirnos: claim grande + 4 columnas de razones. El claim
 * entra ladeado y se acomoda; las columnas suben con spring alternando
 * el sentido de la rotación.
 */
export function WhyGrot() {
  return (
    <section className="grot-why grot-cover" aria-label="Por qué elegirnos">
      <SectionTag spot="center">Por qué elegirnos</SectionTag>

      <motion.h2
        className="grot-why__claim"
        initial={{ y: 60, opacity: 0, rotate: -1.5 }}
        whileInView={{ y: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        No somos un proveedor más.
      </motion.h2>

      <div className="grot-why__grid">
        {RAZONES.map((r, i) => (
          <motion.div
            key={r.titulo}
            className="grot-why__col"
            initial={{
              y: 60,
              opacity: 0,
              rotate: i % 2 === 0 ? -2 : 2,
            }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 15,
              delay: i * 0.1,
            }}
          >
            <span className="grot-why__marker" aria-hidden />
            <h3 className="grot-why__titulo">{r.titulo}</h3>
            <p className="grot-why__texto">{r.texto}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
