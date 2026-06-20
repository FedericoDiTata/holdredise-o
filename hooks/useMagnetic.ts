"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring, type MotionValue } from "framer-motion"

/**
 * Magnetic hover effect — el cursor "atrae" al elemento dentro de un radio.
 *
 * Sigue la regla del DS HOLD: "El botón principal cambia al color de acento al
 * pasar el mouse y se mueve apenas hacia el cursor (efecto magnético)."
 *
 * - threshold: radio en px desde el centro donde el efecto se activa.
 * - strength: cuánto se mueve el elemento (0 = nada, 1 = sigue al cursor 1:1).
 *   "Apenas" → 0.2 por defecto.
 * - Spring firme (stiffness 400, damping 100) para honrar "firme, no pesado".
 */

type Options = {
  threshold?: number
  strength?: number
}

const SPRING = { stiffness: 400, damping: 100, mass: 0.4 } as const

export function useMagnetic<T extends HTMLElement>(
  options: Options = {},
): {
  ref: React.RefObject<T | null>
  x: MotionValue<number>
  y: MotionValue<number>
} {
  const { threshold = 140, strength = 0.2 } = options
  const ref = useRef<T | null>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof window === "undefined") return
    if (window.matchMedia("(hover: none)").matches) return // mobile/touch: no magnetic

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < threshold) {
        const falloff = 1 - dist / threshold
        rawX.set(dx * strength * falloff)
        rawY.set(dy * strength * falloff)
      } else {
        rawX.set(0)
        rawY.set(0)
      }
    }

    const handleLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
    }
  }, [threshold, strength, rawX, rawY])

  return { ref, x, y }
}
