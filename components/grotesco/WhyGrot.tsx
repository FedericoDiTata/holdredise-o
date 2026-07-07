"use client"

import { useState, type ComponentType } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CloudOff, Crosshair, Handshake, Users } from "lucide-react"
import { EASE_WIPE } from "@/lib/motion"
import { SectionTag } from "./SectionTag"
import "./why-grot.css"

type IconType = ComponentType<{ size?: number; strokeWidth?: number }>

const RAZONES: readonly {
  titulo: string
  texto: string
  Icon: IconType
  tone: "dark" | "accent"
}[] = [
  {
    titulo: "Nos involucramos",
    texto:
      "Entramos en tu negocio como si fuera nuestro. No tercerizamos el cuidado.",
    Icon: Handshake,
    tone: "dark",
  },
  {
    titulo: "Estrategia antes que estética",
    texto:
      "Lo lindo sin un porqué no sirve. Cada decisión tiene una intención.",
    Icon: Crosshair,
    tone: "accent",
  },
  {
    titulo: "Equipo multidisciplinario",
    texto: "Más de 15 personas, una sola visión sosteniendo cada proyecto.",
    Icon: Users,
    tone: "dark",
  },
  {
    titulo: "Sin humo",
    texto: "Resultados que se miden, no que se prometen.",
    Icon: CloudOff,
    tone: "accent",
  },
] as const

const DELAYS = [undefined, "0.15", "0.3", "0.4"] as const

/**
 * Por qué elegirnos: tarjetas EXPANDIBLES estilo Nucleo Bariátrico
 * adaptadas al lenguaje HOLD (sin radius, bordes 1px negros, halftone
 * placeholder en vez de foto, cuadrados en vez de círculos).
 *
 * Mecánica: fila flex con flexGrow animado (1 colapsada, 3.2 activa).
 * Colapsada: título vertical + cuadrado con ícono. Al pasar el mouse
 * (o tap en mobile) se expande y revela el placeholder de foto, el
 * título horizontal y la descripción.
 */
export function WhyGrot() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="grot-why grot-cover" aria-label="Por qué elegirnos">
      <SectionTag spot="center">Por qué elegirnos</SectionTag>

      <h2 className="grot-why__claim" data-reveal="up">
        No somos un proveedor más.
      </h2>

      <div className="grot-why__cards">
        {RAZONES.map((r, i) => {
          const isActive = active === i
          const Icon = r.Icon
          return (
            <motion.div
              key={r.titulo}
              className={`grot-why__card grot-why__card--${r.tone}`}
              data-reveal="flip"
              data-reveal-delay={DELAYS[i]}
              data-active={isActive ? "true" : undefined}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(isActive ? null : i)}
              animate={{ flexGrow: isActive ? 3.2 : 1 }}
              transition={{ duration: 0.7, ease: EASE_WIPE }}
              style={{ flexBasis: 0 }}
            >
              <div className="grot-why__card-bg" aria-hidden />
              <div className="grot-why__card-shade" aria-hidden />

              <div className="grot-why__card-content">
                <span className="grot-why__card-icon" aria-hidden>
                  <Icon size={20} strokeWidth={1.8} />
                </span>

                <AnimatePresence mode="wait" initial={false}>
                  {!isActive ? (
                    <motion.div
                      key="collapsed"
                      className="grot-why__card-hold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <h3 className="grot-why__card-title-v">{r.titulo}</h3>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      className="grot-why__card-open"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, ease: EASE_WIPE }}
                    >
                      <span className="grot-why__card-fototag" aria-hidden>
                        [ foto ]
                      </span>
                      <h3 className="grot-why__card-title">{r.titulo}</h3>
                      <p className="grot-why__card-texto">{r.texto}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
