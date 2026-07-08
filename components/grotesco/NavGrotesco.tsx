"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/content"
import { EASE_WIPE } from "@/lib/motion"
import "./nav-grotesco.css"

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Founders", href: "#founders" },
  { label: "Contacto", href: "#contacto" },
] as const

type Origin = { x: number; y: number }

/* El menú se abre y se rompe en CÍRCULO desde el punto exacto donde se
 * hizo click (burger al abrir, link/cerrar al cerrar): la pantalla azul
 * colapsa en un círculo que se achica hacia el click y deja ver la
 * sección de destino detrás. */
const menuVariants = {
  open: (o: Origin) => ({
    clipPath: `circle(150% at ${o.x}px ${o.y}px)`,
  }),
  closed: (o: Origin) => ({
    clipPath: `circle(0% at ${o.x}px ${o.y}px)`,
  }),
}

/**
 * Nav grotesca: barra fija mínima + menú fullscreen accent con links
 * gigantes a la derecha y ghost outline a la izquierda al hover.
 * Hover de link: pasa a blanco. Apertura/cierre: círculo desde el
 * punto de click (clip-path animado).
 */
export function NavGrotesco() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 })

  const openFrom = (e: React.MouseEvent) => {
    setOrigin({ x: e.clientX, y: e.clientY })
    setOpen(true)
  }

  const closeFrom = (e?: React.MouseEvent) => {
    if (e) setOrigin({ x: e.clientX, y: e.clientY })
    setOpen(false)
    setHovered(null)
  }

  /* Lock del scroll del body mientras el menú está abierto. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  /* Escape cierra (colapsa hacia el último origin conocido). */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className="grot-nav">
        <a href="#inicio" className="grot-nav__logo" aria-label="HOLD inicio">
          hold<span>.</span>
          <sup>®</sup>
        </a>
        <button
          type="button"
          className="grot-nav__burger"
          onClick={openFrom}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className="grot-nav__burger-lines" aria-hidden>
            <span />
            <span />
          </span>
          Menú
        </button>
      </header>

      <AnimatePresence custom={origin}>
        {open ? (
          <motion.div
            className="grot-menu"
            custom={origin}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.65, ease: EASE_WIPE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="grot-menu__bar">
              <span className="grot-menu__logo">
                hold<span>.</span>
                <sup>®</sup>
              </span>
              <button
                type="button"
                className="grot-menu__close"
                onClick={closeFrom}
                aria-label="Cerrar menú"
              >
                Cerrar ×
              </button>
            </div>

            {/* Ghost gigante del link hovereado, en outline, a la izquierda */}
            <div className="grot-menu__ghost" aria-hidden>
              <AnimatePresence mode="wait">
                {hovered ? (
                  <motion.span
                    key={hovered}
                    className="grot-menu__ghost-word"
                    initial={{ opacity: 0, x: -40, rotate: -6 }}
                    animate={{ opacity: 1, x: 0, rotate: -4 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.35, ease: EASE_WIPE }}
                  >
                    {hovered}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>

            <nav className="grot-menu__links">
              {LINKS.map((link, i) => (
                <span key={link.href} className="grot-menu__row">
                  <motion.a
                    href={link.href}
                    className="grot-menu__link"
                    onClick={(e) => closeFrom(e)}
                    onMouseEnter={() => setHovered(link.label)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.55,
                      ease: EASE_WIPE,
                      delay: 0.2 + i * 0.06,
                    }}
                  >
                    {link.label}
                  </motion.a>
                </span>
              ))}
            </nav>

            <motion.div
              className="grot-menu__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <a href={`mailto:${EMAIL}`} className="grot-menu__mail">
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="grot-menu__social"
              >
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
