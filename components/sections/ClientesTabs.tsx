"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ServicioSlug, Testimonio } from "@/types"
import { TestimonialCard } from "./TestimonialCard"
import "./clientes-tabs.css"

type TabKey = "todos" | ServicioSlug

const TABS: { key: TabKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "academy", label: "Hold Academy" },
  { key: "redes-sociales", label: "Redes Sociales" },
  { key: "performance", label: "Performance" },
]

/* Cantidad de testimonios visibles antes de mostrar el botón "Ver más". */
const INITIAL_COUNT = 9

type Props = {
  testimonios: readonly Testimonio[]
}

/**
 * Filtro de testimonios por servicio + reveal progresivo. Por default
 * muestra 9 cards; al hacer click en "Ver más" se despliega el resto
 * con stagger fade-in. La tab "Todos" muestra el total filtrado.
 * Cambiar de tab resetea el contador a 9. */
export function ClientesTabs({ testimonios }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("todos")
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(() => {
    if (activeTab === "todos") return testimonios
    return testimonios.filter((t) => t.servicio === activeTab)
  }, [activeTab, testimonios])

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hidden = expanded ? [] : filtered.slice(INITIAL_COUNT)
  const hasMore = filtered.length > INITIAL_COUNT && !expanded

  const counts = useMemo(() => {
    const c: Record<TabKey, number> = {
      todos: testimonios.length,
      academy: 0,
      "redes-sociales": 0,
      performance: 0,
    }
    testimonios.forEach((t) => {
      c[t.servicio] += 1
    })
    return c
  }, [testimonios])

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key)
    setExpanded(false)
  }

  return (
    <div className="hold-clientes-tabs">
      <div
        className="hold-clientes-tabs__bar"
        role="tablist"
        aria-label="Filtrar testimonios por servicio"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            data-active={activeTab === tab.key ? "true" : undefined}
            className="hold-clientes-tabs__tab"
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
            <span className="hold-clientes-tabs__count">
              {String(counts[tab.key]).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <div className="hold-clientes-tabs__grid" role="tabpanel">
        {filtered.length === 0 ? (
          <p className="hold-clientes-tabs__empty">
            No hay testimonios para este servicio todavía.
          </p>
        ) : (
          <>
            {visible.map((t, i) => (
              <TestimonialCard
                key={`${activeTab}-${t.nombre}-${i}`}
                testimonio={t}
              />
            ))}
            <AnimatePresence>
              {expanded &&
                hidden.map((t, i) => (
                  <motion.div
                    key={`${activeTab}-extra-${t.nombre}-${i}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.2, 0.8, 0.2, 1],
                      delay: i * 0.06,
                    }}
                  >
                    <TestimonialCard testimonio={t} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </>
        )}
      </div>

      {hasMore ? (
        <div className="hold-clientes-tabs__more-wrap">
          <button
            type="button"
            className="hold-clientes-tabs__more"
            onClick={() => setExpanded(true)}
            aria-label={`Ver los ${filtered.length - INITIAL_COUNT} testimonios restantes`}
          >
            <span className="hold-clientes-tabs__more-label">
              Ver más
              <span className="hold-clientes-tabs__more-count">
                {`+${filtered.length - INITIAL_COUNT}`}
              </span>
            </span>
            <span className="hold-clientes-tabs__more-icon" aria-hidden>
              ↓
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
