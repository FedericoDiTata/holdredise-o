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

/**
 * Nav grotesca: barra fija mínima (wordmark + botón MENÚ) y un menú
 * fullscreen accent con los links gigantes alineados a la derecha.
 *
 * El toque propio: al hacer hover sobre un link, una versión fantasma
 * gigante en outline aparece en el espacio vacío de la izquierda,
 * levemente rotada. El link activo pasa a outline (fill transparente
 * con stroke) — vocabulario grotesco puro, sin gadgets.
 *
 * Sin etiquetas numeradas ni ornamentos: solo tipografía y color.
 */
export function NavGrotesco() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  /* Lock del scroll del body mientras el menú está abierto. */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  /* Escape cierra. */
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
        </a>
        <button
          type="button"
          className="grot-nav__burger"
          onClick={() => setOpen(true)}
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

      <AnimatePresence>
        {open ? (
          <motion.div
            className="grot-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE_WIPE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="grot-menu__bar">
              <span className="grot-menu__logo">
                hold<span>.</span>
              </span>
              <button
                type="button"
                className="grot-menu__close"
                onClick={() => setOpen(false)}
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
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setHovered(link.label)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.55,
                      ease: EASE_WIPE,
                      delay: 0.15 + i * 0.06,
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
              exit={{ opacity: 0 }}
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
