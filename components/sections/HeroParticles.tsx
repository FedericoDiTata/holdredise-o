"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import { WHATSAPP_URL } from "@/data/content"
import "./hero-particles.css"

type RGB = { r: number; g: number; b: number }

/* ─── PALETA HOLD (cycle) ────────────────────────────────────────────────── */
/* Todos los colores Pantone del DS — esta animación es la única excepción a
   la regla "blanco + negro + 1 acento": acá juegan todos. */
const BLACK_RGB: RGB = { r: 29, g: 29, b: 27 }
const HOLD_COLOR_CYCLE: readonly RGB[] = [
  { r: 233, g: 105, b: 81 },  // Coral · Academy
  { r: 240, g: 138, b: 62 },  // Tangerine
  { r: 249, g: 66, b: 58 },   // Warm Red · Performance
  { r: 43,  g: 99,  b: 255 }, // Bright Blue · Redes
  { r: 235, g: 189, b: 217 }, // Soft Pink
] as const

/* ─── PALABRAS DE MARCA ──────────────────────────────────────────────────── */
/* HOLD primero (en negro, marca limpia). Después cicla copy editorial. */
const HOLD_WORDS = [
  "HOLD",
  "SOSTENER",
  "SIN PERDER",
  "LA ESENCIA",
  "ESTRATEGIA",
  "PERFORMANCE",
] as const

const FRAMES_PER_WORD = 110 // ~1.8s a 60fps — más ritmo, menos espera
const TRAIL_RGBA = "rgba(250, 255, 250, 0.32)" // var(--bg) con alpha. Más opaco = trail más corto = menos motion blur acumulado = mejor performance percibida.

/* ─── PARTICLE ───────────────────────────────────────────────────────────── */
class Particle {
  pos = { x: 0, y: 0 }
  vel = { x: 0, y: 0 }
  acc = { x: 0, y: 0 }
  target = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 4

  startColor: RGB = { r: 250, g: 255, b: 250 }
  targetColor: RGB = { r: 29, g: 29, b: 27 }
  colorWeight = 0
  colorBlendRate = 0.01

  isKilled = false

  move() {
    let proximityMult = 1
    const dx = this.pos.x - this.target.x
    const dy = this.pos.y - this.target.y
    const distance = Math.hypot(dx, dy)
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    let tx = this.target.x - this.pos.x
    let ty = this.target.y - this.pos.y
    const mag = Math.hypot(tx, ty)
    if (mag > 0) {
      tx = (tx / mag) * this.maxSpeed * proximityMult
      ty = (ty / mag) * this.maxSpeed * proximityMult
    }

    let sx = tx - this.vel.x
    let sy = ty - this.vel.y
    const sm = Math.hypot(sx, sy)
    if (sm > 0) {
      sx = (sx / sm) * this.maxForce
      sy = (sy / sm) * this.maxForce
    }

    this.acc.x += sx
    this.acc.y += sy
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1)
    }
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(this.pos.x, this.pos.y, this.particleSize, this.particleSize)
  }

  kill(width: number, height: number) {
    if (this.isKilled) return
    const dir = randomOuterPos(width / 2, height / 2, (width + height) / 2)
    this.target = dir
    this.startColor = blendNow(this.startColor, this.targetColor, this.colorWeight)
    this.targetColor = { r: 250, g: 255, b: 250 }
    this.colorWeight = 0
    this.isKilled = true
  }
}

function blendNow(a: RGB, b: RGB, w: number): RGB {
  return {
    r: a.r + (b.r - a.r) * w,
    g: a.g + (b.g - a.g) * w,
    b: a.b + (b.b - a.b) * w,
  }
}

function randomOuterPos(cx: number, cy: number, mag: number) {
  const rx = Math.random() * 1000 - 500
  const ry = Math.random() * 500 - 250
  const m = Math.hypot(rx, ry) || 1
  return { x: cx + (rx / m) * mag, y: cy + (ry / m) * mag }
}

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)
  const wordRef = useRef(0)
  /* Índice para HOLD_COLOR_CYCLE (rota una posición cada nueva palabra que no sea HOLD). */
  const cycleRef = useRef(0)
  const sizeRef = useRef({ w: 1200, h: 600 })
  const [reducedMotion, setReducedMotion] = useState(false)

  /* HOLD siempre se forma en negro; el resto cicla por la paleta de marca. */
  const colorForWord = (word: string): RGB => {
    if (word === "HOLD") return BLACK_RGB
    const c = HOLD_COLOR_CYCLE[cycleRef.current % HOLD_COLOR_CYCLE.length]
    cycleRef.current = (cycleRef.current + 1) % HOLD_COLOR_CYCLE.length
    return c
  }

  /* ─── Reset particles for a new word ─────────────────────────────────── */
  const renderWord = (word: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = sizeRef.current.w
    const h = sizeRef.current.h

    // Off-screen text canvas
    const off = document.createElement("canvas")
    off.width = w
    off.height = h
    const offCtx = off.getContext("2d")
    if (!offCtx) return

    // Helvetica Neue — medir el ancho real y ajustar fontSize para que la
    // palabra entre completa con margen del 8% a cada lado.
    const targetWidth = w * 0.84
    let fontSize = Math.min(w * 0.22, h * 0.5)
    offCtx.font = `700 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`
    let measured = offCtx.measureText(word).width
    if (measured > targetWidth) {
      fontSize = Math.floor(fontSize * (targetWidth / measured))
      offCtx.font = `700 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`
    }
    offCtx.fillStyle = "white"
    offCtx.textAlign = "center"
    offCtx.textBaseline = "middle"
    offCtx.fillText(word, w / 2, h / 2)

    const data = offCtx.getImageData(0, 0, w, h).data

    // Pixel step adaptativo: + grande = menos partículas = mejor performance.
    // Reducimos densidad respecto a la versión anterior para subir FPS percibido.
    const pixelStep = w < 640 ? 12 : w < 1024 ? 9 : 7

    const newColor = colorForWord(word)

    const particles = particlesRef.current
    let idx = 0

    const coords: number[] = []
    for (let i = 0; i < data.length; i += pixelStep * 4) coords.push(i)
    // Shuffle for fluid motion
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coords[i], coords[j]] = [coords[j], coords[i]]
    }

    for (const c of coords) {
      const alpha = data[c + 3]
      if (alpha <= 0) continue

      const x = (c / 4) % w
      const y = Math.floor(c / 4 / w)

      let p: Particle
      if (idx < particles.length) {
        p = particles[idx]
        p.isKilled = false
      } else {
        p = new Particle()
        const start = randomOuterPos(w / 2, h / 2, (w + h) / 2)
        p.pos.x = start.x
        p.pos.y = start.y
        p.maxSpeed = Math.random() * 8 + 12       // 12–20 (más rápido = forma más fluida)
        p.maxForce = p.maxSpeed * 0.12            // accel proporcional a velocidad
        p.particleSize = Math.random() * 2 + 2.5
        p.colorBlendRate = Math.random() * 0.07 + 0.06 // 0.06–0.13 (color settle rápido)
        particles.push(p)
      }

      p.startColor = blendNow(p.startColor, p.targetColor, p.colorWeight)
      p.targetColor = newColor
      p.colorWeight = 0
      p.target.x = x
      p.target.y = y
      idx++
    }

    // Kill remaining (palabra previa más larga)
    for (let i = idx; i < particles.length; i++) {
      particles[i].kill(w, h)
    }
  }

  /* ─── Animation loop ─────────────────────────────────────────────────── */
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Motion-blur trail con el bg del sitio (Star White con alpha)
    ctx.fillStyle = TRAIL_RGBA
    ctx.fillRect(0, 0, sizeRef.current.w, sizeRef.current.h)

    const ps = particlesRef.current
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i]
      p.move()
      p.draw(ctx)
      if (
        p.isKilled &&
        (p.pos.x < 0 ||
          p.pos.x > sizeRef.current.w ||
          p.pos.y < 0 ||
          p.pos.y > sizeRef.current.h)
      ) {
        ps.splice(i, 1)
      }
    }

    frameRef.current++
    if (frameRef.current % FRAMES_PER_WORD === 0) {
      wordRef.current = (wordRef.current + 1) % HOLD_WORDS.length
      renderWord(HOLD_WORDS[wordRef.current])
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  /* ─── Mount + resize observer ────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setReducedMotion(true)
      return
    }

    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const setupSize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(320, Math.floor(rect.width))
      const h = Math.max(200, Math.floor(rect.height))
      sizeRef.current = { w, h }
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      const ctx = canvas.getContext("2d")
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setupSize()
    renderWord(HOLD_WORDS[0])
    animationRef.current = requestAnimationFrame(animate)

    const ro = new ResizeObserver(() => {
      setupSize()
      // Re-render para que las partículas se reposicionen
      particlesRef.current = []
      wordRef.current = 0
      frameRef.current = 0
      cycleRef.current = 0
      renderWord(HOLD_WORDS[0])
    })
    ro.observe(wrap)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="hold-hero-particles" aria-label="Inicio">
      {/* h1 oculto pero leíble por screen readers + valor SEO */}
      <h1 className="hold-hero-particles__sr">Sostener sin perder la esencia.</h1>

      {/* Capa 0: canvas full-bleed (o fallback estático) */}
      <div ref={wrapRef} className="hold-hero-particles__canvas-wrap">
        {reducedMotion ? (
          <p className="hold-hero-particles__fallback">
            Sostener sin perder <em>la esencia.</em>
          </p>
        ) : (
          <canvas
            ref={canvasRef}
            className="hold-hero-particles__canvas"
            aria-hidden
          />
        )}
      </div>

      {/* Capa 1: contenido superpuesto */}
      <div className="hold-hero-particles__content">
        <p className="hold-hero-particles__eyebrow">HOLD · Agencia Creativa</p>

        <div className="hold-hero-particles__bottom">
          <div className="hold-hero-particles__ctas">
            <div className="hold-hero-particles__cta-float">
              <Button
                size="large"
                href={WHATSAPP_URL}
                external
                ariaLabel="Hablemos por WhatsApp"
              >
                Hablemos
              </Button>
            </div>
            <div className="hold-hero-particles__cta-float hold-hero-particles__cta-float--delayed">
              <Button
                size="large"
                variant="secondary"
                href="#servicios"
                arrow={false}
              >
                Servicios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
