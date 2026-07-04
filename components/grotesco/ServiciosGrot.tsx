"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { serviciosGrupos } from "@/data/content"
import { EASE_HOLD } from "@/lib/motion"
import { SectionTag } from "./SectionTag"
import "./servicios-grot.css"

/**
 * Servicios en formato tabla grotesca: solo las 3 unidades (Brands /
 * Talents / Performance, sin el prefijo HOLD en el nombre visible).
 * Cada fila: nombre gigante + descripción + indicador. Click expande
 * el desglose completo (bullets reales del PDF). Hover: fila accent.
 */
export function ServiciosGrot() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="grot-servicios grot-cover" id="servicios">
      <SectionTag>Servicios</SectionTag>

      <div role="list">
        {serviciosGrupos.map((grupo, i) => {
          const isOpen = openIdx === i
          const nombre = grupo.titulo.replace(/^HOLD\s+/i, "")
          return (
            <div
              key={grupo.titulo}
              className="grot-servicios__item"
              data-open={isOpen ? "true" : undefined}
              role="listitem"
              data-reveal={i % 2 === 0 ? "skew-l" : "skew-r"}
              data-reveal-delay={
                i === 1 ? "0.1" : i === 2 ? "0.2" : undefined
              }
            >
              <button
                type="button"
                className="grot-servicios__row"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="grot-servicios__nombre">{nombre}</span>
                <span className="grot-servicios__desc">
                  {grupo.descripcion}
                </span>
                <span className="grot-servicios__toggle" aria-hidden>
                  {isOpen ? "×" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="panel"
                    className="grot-servicios__panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_HOLD }}
                  >
                    <ul className="grot-servicios__bullets" role="list">
                      {grupo.bullets.map((b) => (
                        <li key={b} className="grot-servicios__bullet">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
