"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./marquee-grot.css"

type Props = {
  text: string
  /** Fondo oscuro (footer). Default: claro. */
  dark?: boolean
  /** Duración de un loop completo en s. Menos = más rápido. */
  durationSec?: number
  /** Copias del texto por mitad. Subir si el texto es corto. */
  repeats?: number
}

/**
 * Marquee grotesca: texto GIGANTE en loop infinito seamless y rápido.
 * Alterna copias sólidas y en outline para textura tipográfica.
 *
 * Seamless garantizado: el track contiene 2 mitades idénticas y anima
 * translateX(-50%). Cada mitad tiene suficientes copias como para
 * superar 2x el ancho de viewport, así nunca queda banda vacía.
 *
 * Performance: la animación se PAUSA cuando la banda no está en
 * viewport (IntersectionObserver) — un track de miles de px animándose
 * fuera de pantalla es trabajo de compositor tirado a la basura.
 */
export function MarqueeGrot({
  text,
  dark = false,
  durationSec = 14,
  repeats = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const half = (
    <div className="grot-marquee__half">
      {Array.from({ length: repeats }).map((_, i) => (
        <span
          key={i}
          className={
            "grot-marquee__item" +
            (i % 2 === 1 ? " grot-marquee__item--outline" : "")
          }
        >
          {text}
          <span className="grot-marquee__sep" aria-hidden />
        </span>
      ))}
    </div>
  )

  return (
    <div
      ref={ref}
      className={
        "grot-marquee" +
        (dark ? " grot-marquee--dark" : "") +
        (visible ? "" : " grot-marquee--paused")
      }
      style={{ "--grot-mq-dur": `${durationSec}s` } as CSSProperties}
      aria-hidden
    >
      <div className="grot-marquee__track">
        {half}
        {half}
      </div>
    </div>
  )
}
