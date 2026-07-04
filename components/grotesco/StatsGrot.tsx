"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
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
      {/* SLAM: el número cae desde arriba sobredimensionado y aterriza
          con un golpe seco (spring duro), cada celda con su delay. */}
      <motion.div
        className="grot-stats__cell-inner"
        initial={{
          y: -140,
          opacity: 0,
          scale: 1.3,
          rotate: index % 2 === 0 ? -3 : 3,
        }}
        whileInView={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          type: "spring",
          stiffness: 230,
          damping: 14,
          mass: 1.1,
          delay: index * 0.11,
        }}
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
      </motion.div>
    </div>
  )
}

/**
 * Grilla de 3 stats con bordes 1px: números gigantes bold que cuentan
 * al entrar al viewport. El del medio en accent para romper el ritmo.
 */
export function StatsGrot() {
  return (
    <section className="grot-stats" aria-label="Números de HOLD">
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
    </section>
  )
}
