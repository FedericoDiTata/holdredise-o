"use client"

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { useRef, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import "./marquee.css"

type Props = {
  /** Items que se repiten en loop. Para un loop "frase + flecha" usar
   *  un solo item: ["Lo que hacemos ↓"] — la marquee se encarga de
   *  repetirlo seamless. */
  items: readonly string[]
  /** Duración base de un loop completo en segundos. Default 22s.
   *  Scroll-velocity puede acelerarlo temporalmente. */
  durationSec?: number
  /** Color del separador (cuadrado entre items). Default: --accent. */
  separatorColor?: string
  /** Variante invertida (fondo negro, texto blanco). */
  invert?: boolean
  /** Variante "accent" (fondo --accent, texto blanco bold). */
  accent?: boolean
  /** Items en italic 400 — más editorial. */
  italic?: boolean
  className?: string
}

const REPEATS = 6

/* Helper de wrap-around: keep v dentro de [min, max) modulo el rango. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * Marquee infinita seamless con scroll-velocity. La animación es
 * JS-driven (useAnimationFrame) para que pueda escuchar el `velocity` del
 * scroll del usuario y acelerar/decelerar la banda en consecuencia:
 *
 * - Scroll quieto → velocidad base (durationSec)
 * - Scroll rápido hacia abajo → la banda acelera en la dirección base
 * - Scroll hacia arriba → la banda invierte momentáneamente
 *
 * Es sutil pero da una sensación de "el sitio reacciona a tu cuerpo".
 *
 * Respeta `prefers-reduced-motion` (banda quieta).
 */
export function MarqueeBand({
  items,
  durationSec = 22,
  separatorColor,
  invert = false,
  accent = false,
  italic = false,
  className,
}: Props) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  /* Velocidad del scroll mapeada a un multiplier [-3, +3] sobre la
   * velocidad base. Se acumula, no reemplaza. */
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [-3, 0, 3],
    { clamp: false },
  )

  /* Velocidad base en %/ms — el track se mueve -50% en `durationSec`. */
  const baseSpeed = 50 / (durationSec * 1000)
  const directionFactor = useRef(-1) // marquee va hacia la izquierda

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = directionFactor.current * baseSpeed * delta
    /* Suma la contribución del scroll-velocity (acelera en la dir actual). */
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  /* Wrap entre -50% y 0% para loop seamless (la pista tiene 2 copias
   * del set duplicado, así -50% = punto de loop). */
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const repeated = Array.from({ length: REPEATS }, () => items).flat()

  const styleVars = {
    "--marquee-sep": separatorColor ?? undefined,
  } as CSSProperties

  return (
    <div
      className={cn(
        "hold-marquee",
        invert && "hold-marquee--invert",
        accent && "hold-marquee--accent",
        className,
      )}
      style={styleVars}
      aria-hidden
    >
      <div className="hold-marquee__viewport">
        <motion.div className="hold-marquee__track" style={{ x }}>
          {repeated.map((item, i) => (
            <span
              key={i}
              className={cn(
                "hold-marquee__item",
                italic && "hold-marquee__item--em",
              )}
            >
              {item}
              <span className="hold-marquee__sep" aria-hidden />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
