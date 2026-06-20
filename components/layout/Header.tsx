"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { NAV_LINKS, WHATSAPP_URL } from "@/data/content"
import { EASE_HOLD } from "@/lib/motion"
import "./header.css"

/** Hrefs neutros: nav no-de-servicio. Usan --fg como wipe color.
 *  Los demás (servicios) usan el --accent global (controlado por <AccentSwitcher>). */
const NEUTRAL_HREFS = new Set(["/nosotros", "/clientes"])

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Detecta si hay una sección con data-hero-theme="dark" cubriendo la
     zona del header. Combina check sync al mount + scroll listener para
     robustez — el IntersectionObserver tenía race conditions al cargar
     la página directamente sobre el hero oscuro. */
  useEffect(() => {
    const headerH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--hold-header-h",
        ),
      ) || 72

    const computeOnDark = () => {
      const darkSections = document.querySelectorAll<HTMLElement>(
        '[data-hero-theme="dark"]',
      )
      if (darkSections.length === 0) {
        setOnDark(false)
        return
      }
      /* Dark mode activo si CUALQUIER sección oscura cubre la zona del
         header (≥ 30% desde arriba). Permite tener múltiples secciones
         dark a lo largo del scroll — ej: hero textured arriba + section
         dark del HeroScroll más abajo. */
      const isAnyDark = Array.from(darkSections).some((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top <= 0 && rect.bottom > headerH * 0.3
      })
      setOnDark(isAnyDark)
    }

    computeOnDark()
    window.addEventListener("scroll", computeOnDark, { passive: true })
    window.addEventListener("resize", computeOnDark)
    return () => {
      window.removeEventListener("scroll", computeOnDark)
      window.removeEventListener("resize", computeOnDark)
    }
  }, [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <>
      <header
        className="hold-header"
        data-scrolled={scrolled}
        data-on-dark={onDark || undefined}
      >
        <Link href="/" className="hold-header__logo" aria-label="HOLD — Inicio">
          hold
          <span className="hold-header__logo-r" aria-hidden>®</span>
        </Link>

        <nav className="hold-header__nav" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => {
            const neutral = NEUTRAL_HREFS.has(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="hold-header__link"
                data-active={isActive(link.href) ? "true" : undefined}
                data-neutral={neutral ? "true" : undefined}
              >
                <span className="hold-header__link-dot" aria-hidden />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hold-header__cta">
          <Button
            href={WHATSAPP_URL}
            external
            ariaLabel="Hablemos por WhatsApp"
          >
            Hablemos
          </Button>
        </div>

        <button
          type="button"
          className="hold-header__burger"
          data-open={open ? "true" : undefined}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="hold-mobile-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="hold-header__burger-bar" />
          <span className="hold-header__burger-bar" />
          <span className="hold-header__burger-bar" />
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="hold-mobile-panel"
            key="hold-mobile-panel"
            className="hold-mobile-panel"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: EASE_HOLD }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
          >
            <motion.nav
              className="hold-mobile-panel__nav"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_HOLD } },
                  }}
                >
                  <Link
                    href={link.href}
                    className="hold-mobile-panel__link"
                    data-active={isActive(link.href) ? "true" : undefined}
                  >
                    <span className="hold-mobile-panel__link-num">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="hold-mobile-panel__cta"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_HOLD } },
                }}
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Hablemos →
                </a>
              </motion.div>
            </motion.nav>

            <div className="hold-mobile-panel__footer">
              <span>HOLD</span>
              <span>Buenos Aires · AR</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
