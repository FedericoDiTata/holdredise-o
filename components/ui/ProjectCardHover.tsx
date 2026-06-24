"use client"

import { useEffect, useRef, useState } from "react"
import { BorderTrace } from "@/components/effects/BorderTrace"
import { Placeholder } from "@/components/ui/Placeholder"
import type { Trabajo } from "@/types"
import "./project-card-hover.css"

type Props = {
  trabajo: Trabajo
  /** Velocidad del cycle entre fotos en ms (default 800). */
  intervalMs?: number
  /** Delay del trace del borde accent al entrar al viewport. */
  traceDelay?: number
}

/**
 * Card de trabajo con N fotos placeholder apiladas absolute. Cuando el
 * usuario hace hover (desktop) o cuando la card está visible en mobile
 * (IntersectionObserver, sin hover possible en touch), las fotos
 * ciclan cada `intervalMs`. Al soltar el hover, vuelve a la foto 0.
 *
 * El border trace accent (BorderTrace) se renderiza solo sobre el media
 * (la foto), NO sobre el card entero — para que el recorrido bordee la
 * imagen sin pisar el body de texto.
 *
 * Cuando lleguen las fotos reales, reemplazar el `<Placeholder>` por
 * `<Image>` de next/image con `loading="lazy"`.
 */
export function ProjectCardHover({
  trabajo,
  intervalMs = 800,
  traceDelay = 0,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [autoplay, setAutoplay] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Detección de touch (sin hover) — solo client.
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches)
  }, [])

  // Mobile: trigger autoplay cuando la card es 60% visible.
  useEffect(() => {
    if (!isTouch || !ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => setAutoplay(entry.isIntersecting),
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isTouch])

  // Cycle de fotos cuando autoplay está activo.
  useEffect(() => {
    if (!autoplay || trabajo.fotos.length <= 1) return
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % trabajo.fotos.length)
    }, intervalMs)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [autoplay, intervalMs, trabajo.fotos.length])

  const handleMouseEnter = () => {
    if (isTouch) return
    setAutoplay(true)
  }

  const handleMouseLeave = () => {
    if (isTouch) return
    setAutoplay(false)
    setActiveIdx(0)
  }

  return (
    <article
      ref={ref}
      className="hold-project-card"
      data-active={autoplay ? "true" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hold-project-card__media">
        <span className="hold-project-card__logo">{trabajo.logo}</span>
        <BorderTrace delay={traceDelay} duration={0.7} fadeOut />

        {trabajo.fotos.map((label, i) => (
          <div
            key={label}
            className="hold-project-card__photo"
            data-visible={i === activeIdx ? "true" : undefined}
          >
            <Placeholder ratio="4/5" label={label} />
          </div>
        ))}

        {trabajo.fotos.length > 1 ? (
          <div className="hold-project-card__dots" aria-hidden>
            {trabajo.fotos.map((label, i) => (
              <span
                key={label}
                className="hold-project-card__dot"
                data-active={i === activeIdx ? "true" : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
