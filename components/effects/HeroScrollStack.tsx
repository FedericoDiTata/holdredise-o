"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import "./hero-scroll-stack.css"

type Props = {
  hero: ReactNode
  next: ReactNode
}

/**
 * Stack scroll: el hero queda fixed/sticky a 100svh y la sección "next" se
 * desliza por encima desde abajo a medida que se hace scroll. Mientras tanto
 * el hero se aleja sutilmente (scale + ligero blur) para sumar la sensación
 * de profundidad sin desaparecer abruptamente.
 *
 * Inspirado en hero-scroll-animation de 21st.dev (ui-layouts).
 */
export function HeroScrollStack({ hero, next }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const c = containerRef.current
        if (!c) return
        const rect = c.getBoundingClientRect()
        const vh = window.innerHeight
        // Progress 0 → 1 mientras el container atraviesa el viewport.
        // Solo nos interesa el primer 100vh de scroll desde que arrancó.
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / Math.max(1, vh)))
        setProgress(p)
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  const heroStyle = reduced
    ? undefined
    : {
        transform: `scale(${1 - progress * 0.06})`,
        opacity: 1 - progress * 0.35,
      }

  return (
    <div ref={containerRef} className="hold-scroll-stack">
      <div className="hold-scroll-stack__sticky">
        <div
          ref={heroRef}
          className="hold-scroll-stack__hero"
          style={heroStyle}
        >
          {hero}
        </div>
      </div>
      <div className="hold-scroll-stack__next">{next}</div>
    </div>
  )
}
