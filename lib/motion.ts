import type { Variants } from "framer-motion"

/* Curva única del sistema HOLD · "siempre igual" del DS. */
export const EASE_HOLD = [0.2, 0.8, 0.2, 1] as const

/* Duraciones del DS · "firme, no pesado" (0.25–0.5s). */
export const DUR = {
  fast: 0.25,
  base: 0.4,
  slow: 0.5,
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_HOLD },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE_HOLD },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EASE_HOLD },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EASE_HOLD },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_HOLD },
  },
}

export const tabSwap: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.fast, ease: EASE_HOLD },
  },
  exit: {
    opacity: 0,
    x: -16,
    transition: { duration: DUR.fast, ease: EASE_HOLD },
  },
}
