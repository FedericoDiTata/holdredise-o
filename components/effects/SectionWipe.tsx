"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"
import "./section-wipe.css"

type Props = {
  children: ReactNode
  /** Color del blob accent. Default: --accent. */
  color?: string
  /** Delay del bloom en s. */
  delay?: number
  className?: string
}

/**
 * SectionWipe — solo BG bloom decorativo.
 *
 * Un blob accent difuso crece detrás del contenido y se desvanece al
 * entrar al viewport. NO anima el content directamente — eso lo hacen
 * los componentes internos vía `data-reveal` (CSS + IntersectionObserver,
 * sistema más robusto que framer-motion + SSR para reveals de scroll).
 *
 * Respeta prefers-reduced-motion (sin bloom).
 */
export function SectionWipe({
  children,
  color = "var(--accent)",
  delay = 0,
  className,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <div className={"hold-section-wipe" + (className ? ` ${className}` : "")}>
      {!reduce ? (
        <motion.div
          className="hold-section-wipe__bloom"
          style={
            {
              "--bloom-color": color,
              x: "-50%",
              y: "-50%",
            } as React.CSSProperties
          }
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{
            scale: [0.4, 1.3, 1.8, 2.1],
            opacity: [0, 0.7, 0.4, 0],
          }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1.6,
            times: [0, 0.35, 0.7, 1],
            ease: [0.4, 0, 0.2, 1],
            delay,
          }}
          aria-hidden
        />
      ) : null}
      <div className="hold-section-wipe__content">{children}</div>
    </div>
  )
}
