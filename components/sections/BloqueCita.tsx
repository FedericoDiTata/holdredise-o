"use client"

import { motion } from "framer-motion"
import { Eye, Filter, MessageCircle } from "lucide-react"
import { SectionWipe } from "@/components/effects/SectionWipe"
import { SplitText } from "@/components/effects/SplitText"
import {
  cardReveal,
  fadeUp,
  makeStagger,
  VIEWPORT_DEFAULT,
} from "@/lib/motion"
import "./bloque-cita.css"

/* Las 3 buzzwords del bloque cita — con íconos editoriales que las
 * "anclan" sin caer en clichés tech (megáfono / cohete / gráfico). */
const KEYWORDS = [
  { Icon: Eye, label: "awareness" },
  { Icon: MessageCircle, label: "engagement" },
  { Icon: Filter, label: "funnel" },
] as const

/**
 * Sección editorial bajo el hero, rediseñada:
 *
 *   "Algún día alguien te va a querer cobrar caro por decirte"
 *
 *   [Eye · awareness]  [MessageCircle · engagement]  [Filter · funnel]
 *
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  Nosotras preferimos {no venderte humo},                │
 *   │  {nos involucramos en tu negocio}.                      │
 *   └─────────────────────────────────────────────────────────┘
 *
 * Las tarjetas de clientes salieron — eso ya está en TRABAJOS.
 */
export function BloqueCita() {
  return (
    <SectionWipe>
      <section className="hold-bloque-cita">
        <h2 className="hold-bloque-cita__titulo">
          <SplitText
            text="Algún día alguien te va a querer cobrar caro por decirte"
            granularity="word"
            stagger={0.055}
            delayChildren={0.1}
          />
        </h2>

      <motion.div
        className="hold-bloque-cita__keywords"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={makeStagger(0.12, 0.18)}
      >
        {KEYWORDS.map(({ Icon, label }) => (
          <motion.article
            key={label}
            className="hold-bloque-cita__keyword"
            variants={cardReveal}
          >
            <span className="hold-bloque-cita__keyword-icon" aria-hidden>
              <Icon size={28} strokeWidth={1.4} />
            </span>
            <span className="hold-bloque-cita__keyword-label">{label}</span>
          </motion.article>
        ))}
      </motion.div>

      <motion.aside
        className="hold-bloque-cita__panel"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_DEFAULT}
        variants={fadeUp}
      >
        <p className="hold-bloque-cita__panel-text">
          <span className="hold-bloque-cita__panel-line">
            Nosotras preferimos{" "}
            <em className="hold-bloque-cita__hl">no venderte humo</em>,
          </span>
          <span className="hold-bloque-cita__panel-line">
            <em className="hold-bloque-cita__hl">
              nos involucramos en tu negocio
            </em>
            .
          </span>
        </p>
      </motion.aside>
      </section>
    </SectionWipe>
  )
}
