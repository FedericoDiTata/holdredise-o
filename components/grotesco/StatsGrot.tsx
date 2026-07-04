"use client"

import { useEffect, useRef, useState } from "react"
import { contadoresHome } from "@/data/content"
import "./stats-grot.css"

/**
 * Cuenta de 0 al target con requestAnimationFrame + easeOutCubic al
 * entrar al viewport. Una sola vez. Respeta prefers-reduced-motion.
 */
function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
          const progress = Math.min((now - start) / durationMs, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(target * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, durationMs])

  return { value, ref }
}

const DELAYS = [undefined, "0.15", "0.3"] as const

function StatCell({
  valor,
  suffix,
  label,
  accent,
  index,
}: {
  valor: number
  suffix?: string
  label: string
  accent?: boolean
  index: number
}) {
  const { value, ref } = useCountUp(valor)
  return (
    <div className="grot-stats__cell">
      {/* SLAM via data-reveal: el número cae desde arriba y aterriza
          con overshoot (curva y transición en globals.css). */}
      <div
        className="grot-stats__cell-inner"
        data-reveal="slam"
        data-reveal-delay={DELAYS[index]}
      >
        <span
          ref={ref}
          className={
            "grot-stats__num" + (accent ? " grot-stats__num--accent" : "")
          }
        >
          {value}
          {suffix ?? ""}
        </span>
        <span className="grot-stats__label">{label}</span>
      </div>
    </div>
  )
}

/**
 * Grilla de 3 stats con números gigantes que caen con SLAM. La intro
 * de la agencia vive ahora dentro de la transición del hero.
 */
export function StatsGrot() {
  return (
    <section className="grot-stats grot-cover" aria-label="Números de HOLD">
      <div className="grot-stats__grid">
        {contadoresHome.map((c, i) => (
          <StatCell
            key={c.label}
            valor={c.valor}
            suffix={c.suffix}
            label={c.label}
            accent={i === 1}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
