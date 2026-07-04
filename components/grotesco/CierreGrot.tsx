"use client"

import { motion } from "framer-motion"
import { EMAIL, WHATSAPP_URL } from "@/data/content"
import { SectionTag } from "./SectionTag"
import "./cierre-grot.css"

/**
 * Cierre: claim gigante con mask reveal por renglón (cada línea sube
 * desde su propio clip con spring), CTA con pop y datos reales.
 */
export function CierreGrot() {
  return (
    <section className="grot-cierre grot-cover" id="contacto">
      <SectionTag dark spot="center">
        Hablemos
      </SectionTag>

      <h2 className="grot-cierre__claim">
        {["Construyamos", "tu marca."].map((line, i) => (
          <span key={line} className="grot-cierre__row-clip">
            <motion.span
              className="grot-cierre__row"
              initial={{ y: "112%", rotate: 3 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 16,
                delay: i * 0.12,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        className="grot-cierre__actions"
        initial={{ scale: 0.85, opacity: 0, rotate: -1.5 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 14,
          delay: 0.25,
        }}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="grot-cierre__cta"
        >
          Hablemos por WhatsApp ↗
        </a>
        <a href={`mailto:${EMAIL}`} className="grot-cierre__mail">
          {EMAIL}
        </a>
      </motion.div>

      <div className="grot-cierre__foot">
        <span>Buenos Aires · Argentina</span>
        <span>Te respondemos en menos de 24 hs hábiles</span>
      </div>
    </section>
  )
}
