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

/* Wipe editorial — el padre debe tener overflow: hidden para que el
 * y: 110% inicial quede oculto y la frase aparezca "desde abajo". */
export const wipeUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: EASE_HOLD } },
}

/* Spring para cards — más orgánico que duration-based. */
export const cardReveal: Variants = {
  hidden: { y: 56, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 0.9 },
  },
}

/* Fade-up con blur — para bloques importantes (citas, subtítulos). */
export const blurFadeUp: Variants = {
  hidden: { y: 32, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_HOLD },
  },
}

/* Factory: stagger container con timings custom.
 * makeStagger(0.1, 0.15) = 100ms entre children, 150ms de delay inicial. */
export const makeStagger = (childDelay = 0.1, initial = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: childDelay, delayChildren: initial },
  },
})

/* Viewport por defecto del sitio — siempre `once: true` para no re-disparar
 * en scroll-up, con margin negativo para que arranque antes de entrar full. */
export const VIEWPORT_DEFAULT = { once: true, margin: "-80px" } as const

/* Card con rotateX + perspective para sensación 3D editorial. El padre
 * tiene que tener `perspective: 1200px` para que se vea el tilt. */
export const cardReveal3D: Variants = {
  hidden: { y: 64, opacity: 0, rotateX: -16 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 88, damping: 18, mass: 0.95 },
  },
}

/* Curva del wipe — más drámatica que la EASE_HOLD: arranca rápido, frena
 * en el peak (donde reveal el contenido), termina rápido. */
export const EASE_WIPE = [0.62, 0.04, 0.36, 0.97] as const

/* Letter / word reveal — stagger fino para SplitText. */
export const splitItem: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_HOLD },
  },
}
