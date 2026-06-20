"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE_HOLD } from "@/lib/motion"
import type { ServicioHomeItem } from "@/types"
import "./servicios-accordion.css"

type Props = {
  items: readonly ServicioHomeItem[]
}

/**
 * Accordion vertical de servicios. Solo uno abierto a la vez. Click
 * en el item abierto lo cierra. La animación de altura usa framer-
 * motion `AnimatePresence` + `height: auto ↔ 0` con easing HOLD.
 *
 * Si el item tiene `href`, agrega un link "Ver más →" en el detalle
 * que navega a la página interna del servicio.
 */
export function ServiciosAccordion({ items }: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const toggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug))
  }

  return (
    <div className="hold-acc" role="list">
      {items.map((item) => {
        const isOpen = openSlug === item.slug
        return (
          <div
            key={item.slug}
            className="hold-acc__item"
            data-open={isOpen ? "true" : undefined}
            role="listitem"
          >
            <button
              type="button"
              className="hold-acc__btn"
              onClick={() => toggle(item.slug)}
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${item.slug}`}
            >
              <span className="hold-acc__btn-name">{item.nombre}</span>
              <span className="hold-acc__chevron" aria-hidden />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={`acc-panel-${item.slug}`}
                  className="hold-acc__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_HOLD }}
                >
                  <div className="hold-acc__panel-inner">
                    <div>
                      <p className="hold-acc__desc">{item.descripcion}</p>
                      {item.href ? (
                        <Link href={item.href} className="hold-acc__link">
                          Ver más
                          <ArrowUpRight
                            size={14}
                            strokeWidth={2}
                            aria-hidden
                          />
                        </Link>
                      ) : null}
                    </div>
                    <ul className="hold-acc__bullets" role="list">
                      {item.bullets.map((b) => (
                        <li key={b} className="hold-acc__bullet">
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
