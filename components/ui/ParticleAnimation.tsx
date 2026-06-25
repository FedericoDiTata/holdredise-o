"use client"

import { useEffect, useRef } from "react"
import "./particle-animation.css"

/* Paleta HOLD: azules brand + blancos. Reemplaza el theme original
 * (cyan + grays) del componente 21st.dev. */
const HOLD_THEME = [
  "#2B63FF", // accent brand
  "#4F7FFF", // accent lighter
  "#FAFFFA", // star white
  "#2B63FF",
  "#FFFFFF",
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyP5 = any

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p5?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap?: any
  }
}

/**
 * ParticleAnimation — círculo de ~2000 partículas brand que pulsan
 * radialmente sin pausas y sin intervención del cursor.
 *
 * Cada partícula tiene su propio `baseRadius` + `pulseAmp` único →
 * nunca convergen a una pose estática ("columnas 3D"). El loop usa
 * un sine wave inline calculado en cada draw() (no GSAP timeline)
 * con `localProgress = (proxy.progress + i) % 1` para que cada
 * partícula esté en su propia fase del cycle.
 *
 * Adaptado de 21st.dev (Scottclayton3d) — paleta HOLD, fix className
 * duplicado del original, responsive al PADRE, CSS separado, sin
 * mouse/touch interaction.
 *
 * Dependencias externas (lazy-loaded del CDN solo client):
 *   - p5.js 1.7.0
 *   - GSAP 3.12.2
 */
export function ParticleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<AnyP5>(null)

  useEffect(() => {
    let cancelled = false

    const loadScripts = async () => {
      if (typeof window === "undefined") return

      if (!window.p5) {
        const p5Script = document.createElement("script")
        p5Script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"
        document.head.appendChild(p5Script)
        await new Promise<void>((resolve) => {
          p5Script.onload = () => resolve()
        })
      }

      if (!window.gsap) {
        const gsapScript = document.createElement("script")
        gsapScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        document.head.appendChild(gsapScript)
        await new Promise<void>((resolve) => {
          gsapScript.onload = () => resolve()
        })
      }

      if (cancelled) return
      initSketch()
    }

    const initSketch = () => {
      const container = containerRef.current
      const p5Lib = window.p5
      const gsapLib = window.gsap
      if (!container || !p5Lib || !gsapLib) return

      const sketch = (p: AnyP5) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const particles: any[] = []
        const amount =
          p.windowWidth < 600 || p.windowHeight < 600 ? 1000 : 2000
        /* Cycle linear de 8s — más calmado para que el "respiro" se
         * sienta suave, no movimiento agresivo. */
        const cycleDuration = 8

        const proxy = { progress: 0 }
        const TAU = Math.PI * 2

        class Particle {
          i: number
          cos: number
          sin: number
          r: number
          baseRadius: number
          pulseAmp: number
          color: string

          constructor(i: number) {
            this.i = i
            this.cos = p.cos(i * p.TWO_PI)
            this.sin = p.sin(i * p.TWO_PI)
            this.r = p.floor(p.random(2, 8))
            /* baseRadius levemente único por partícula (rango chico)
             * → leve dispersión sin que se vea explosión. */
            this.baseRadius = 0.36 + p.random(-0.018, 0.018)
            /* Amplitud MÍNIMA del pulse — las partículas "respiran" en
             * su lugar, no recorren la pantalla. Antes 0.18-0.42
             * (radio variaba 40%, vuelo amplio); ahora 0.03-0.08
             * (radio varía ~5%, oscilación contenida). */
            this.pulseAmp = p.random(0.03, 0.08)
            this.color = p.random(HOLD_THEME)
          }

          draw() {
            /* Cada partícula está en su propia fase del cycle (offset i).
             * Sine wave continuo entre -1 y 1 — siempre en movimiento,
             * sin pausas estáticas en los extremos. */
            const localProgress = (proxy.progress + this.i) % 1
            const val = Math.sin(localProgress * TAU)
            const r = p.width * this.baseRadius * (1 + val * this.pulseAmp)
            const x = this.cos * r + p.width / 2
            const y = this.sin * r + p.height / 2
            p.fill(this.color)
            p.circle(x, y, this.r)
          }
        }

        const getSize = () => {
          if (!container) return [p.windowWidth, p.windowHeight] as const
          const w = container.clientWidth
          const h = container.clientHeight
          /* Canvas cuadrado del tamaño MÁS grande del container — así
           * el círculo de partículas excede vertical/horizontal y se
           * ven solo los arcos visibles dentro del overflow:hidden. */
          const size = Math.max(w, h)
          return [size, size] as const
        }

        p.setup = () => {
          const [w, h] = getSize()
          const canvas = p.createCanvas(w, h)
          canvas.parent(container)
          p.noStroke()

          if (navigator.userAgent.indexOf("Firefox") < 0) {
            p.blendMode(p.SCREEN)
          }

          /* Tween linear que avanza proxy.progress de 0 a 1 en
           * `cycleDuration` segundos, en loop infinito. ease: "none"
           * para velocidad constante — cada partícula recorre el sine
           * wave a velocidad uniforme. */
          gsapLib.to(proxy, {
            progress: 1,
            ease: "none",
            duration: cycleDuration,
            repeat: -1,
          })

          for (let i = 0; i < amount; i++) {
            particles.push(new Particle(i / amount))
          }
        }

        p.windowResized = () => {
          const [w, h] = getSize()
          p.resizeCanvas(w, h)
        }

        /* Mouse / touch handlers removidos a propósito — la animación
         * va en loop continuo, no se interrumpe por el cursor. El
         * original (21st.dev) movía la fase del ciclo según el ángulo
         * del mouse desde el centro; nosotros queremos un pulse
         * radial limpio sin intervención del usuario. */

        p.draw = () => {
          p.clear()
          particles.forEach((particle) => particle.draw())
        }
      }

      sketchRef.current = new p5Lib(sketch)
    }

    loadScripts()

    return () => {
      cancelled = true
      if (sketchRef.current) {
        sketchRef.current.remove()
        sketchRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hold-particle-container"
      aria-hidden
    />
  )
}
