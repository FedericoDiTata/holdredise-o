"use client"

import { useEffect, useRef, useState } from "react"
import type { Contador } from "@/types"
import "./contadores-animados.css"

/**
 * Hook custom: anima un valor de 0 al target con requestAnimationFrame
 * y easeOutCubic. Se dispara una sola vez cuando el elemento entra al
 * viewport (IntersectionObserver, threshold 0.4). Respeta
 * `prefers-reduced-motion` (muestra el target directo sin animar).
 */
function useCountUp(target: number, durationMs = 1500) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion → mostrar target directo, no animar.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return
        triggered.current = true
        observer.unobserve(entry.target)

        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / durationMs, 1)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(target * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4, rootMargin: "0px 0px -80px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, durationMs])

  return { value, ref }
}

function ContadorCard({ contador }: { contador: Contador }) {
  const { value, ref } = useCountUp(contador.valor)
  return (
    <div className="hold-contador" data-reveal>
      <span ref={ref} className="hold-contador__valor">
        {value}
        {contador.suffix ? (
          <span className="hold-contador__suffix">{contador.suffix}</span>
        ) : null}
      </span>
      <p className="hold-contador__label">{contador.label}</p>
    </div>
  )
}

type Props = {
  intro: string
  items: readonly Contador[]
}

/**
 * Sección de 3 contadores animados ("30+ Marcas / 15+ Profesionales /
 * 100+ Proyectos"). Cuenta de 0 al target con easeOutCubic una sola
 * vez al entrar al viewport. Server-safe: el valor inicial es 0
 * tanto en server como en client → sin hydration mismatch.
 */
export function ContadoresAnimados({ intro, items }: Props) {
  return (
    <section className="hold-contadores">
      <p className="hold-contadores__intro" data-reveal>
        {intro.replace("…", "")}
        <em>…</em>
      </p>

      <div className="hold-contadores__grid">
        {items.map((c) => (
          <ContadorCard key={c.label} contador={c} />
        ))}
      </div>
    </section>
  )
}
