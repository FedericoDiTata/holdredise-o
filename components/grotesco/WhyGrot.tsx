"use client"

import { useState, type ComponentType } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CloudOff, Crosshair, Handshake, Users } from "lucide-react"
import { EASE_WIPE } from "@/lib/motion"
import { SectionTag } from "./SectionTag"
import "./why-grot.css"

type IconType = ComponentType<{ size?: number; strokeWidth?: number }>

/* Contenido PLACEHOLDER: el doc de las chicas todavía no define nada
 * para esta sección. Cuando llegue el contenido real, reemplazar acá. */
const RAZONES: readonly {
  titulo: string
  texto: string
  Icon: IconType
  tone: "dark" | "accent"
}[] = [
  {
    titulo: "Lorem ipsum",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    Icon: Handshake,
    tone: "dark",
  },
  {
    titulo: "Dolor sit amet",
    texto:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    Icon: Crosshair,
    tone: "accent",
  },
  {
    titulo: "Consectetur",
    texto:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    Icon: Users,
    tone: "dark",
  },
  {
    titulo: "Adipiscing elit",
    texto:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    Icon: CloudOff,
    tone: "accent",
  },
] as const

/**
 * Por qué elegirnos: tarjetas EXPANDIBLES estilo Nucleo Bariátrico
 * adaptadas al lenguaje HOLD (sin radius, bordes 1px negros, halftone
 * placeholder en vez de foto, cuadrados en vez de círculos).
 *
 * Mecánica: fila flex con flexGrow animado (1 colapsada, 3.2 activa).
 * Colapsada: título vertical + cuadrado con ícono. Al pasar el mouse
 * (o tap en mobile) se expande y revela el placeholder de foto, el
 * título horizontal y la descripción. Al salir el cursor de la card
 * se cierra: si el mouse no está sobre ninguna, ninguna queda abierta.
 */
export function WhyGrot() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="grot-why grot-cover" aria-label="Por qué elegirnos">
      <SectionTag spot="center">Por qué elegirnos</SectionTag>

      {/* PLACEHOLDER: el título real de la sección todavía no está
          definido en el doc. */}
      <h2 className="grot-why__claim" data-reveal="up">
        Titulo
      </h2>

      {/* Host: el observer mira la fila (sin transforms). El flip de
          cada card vive en el CSS del componente — si el observer
          mirara la card ya rotada en 3D, su proyección en pantalla
          sería una línea y el reveal dispararía tardísimo. */}
      <div className="grot-why__cards" data-reveal="host">
        {RAZONES.map((r, i) => {
          const isActive = active === i
          const Icon = r.Icon
          return (
            <motion.div
              key={r.titulo}
              className={`grot-why__card grot-why__card--${r.tone}`}
              data-active={isActive ? "true" : undefined}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((a) => (a === i ? null : a))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((a) => (a === i ? null : a))}
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
