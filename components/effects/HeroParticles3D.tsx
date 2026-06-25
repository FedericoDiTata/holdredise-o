"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import "./hero-particles-3d.css"

const PARTICLE_COUNT = 1400
/* Accent azul brand (Bright Blue Pantone 285) — mismo que --accent. */
const ACCENT_COLOR = 0x2b63ff

/**
 * Background 3D del hero: ~1400 partículas accent azul flotando en un
 * espacio 3D que rota lentamente. La rotación responde sutilmente al
 * movimiento del mouse (parallax editorial, no overload).
 *
 * Three.js raw — sin React Three Fiber para no inflar el bundle.
 * Lazy-loaded desde HeroShader vía next/dynamic { ssr: false } para
 * que NO se ejecute en server-side ni bloquee el initial paint.
 *
 * Respeta prefers-reduced-motion: no monta el renderer.
 * Cleanup completo en unmount (geometry/material/renderer dispose +
 * cancelAnimationFrame + remove event listeners).
 */
export function HeroParticles3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* Skip si el usuario prefiere menos motion — no inicializamos nada. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    /* Geometría: partículas distribuidas uniforme en un box 3D. */
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    /* CanvasTexture con radial gradient → cada partícula se renderiza
     * como círculo con alpha suave, NO como cuadrado (el default de
     * PointsMaterial es un sprite cuadrado). */
    const sprite = document.createElement("canvas")
    sprite.width = 64
    sprite.height = 64
    const sCtx = sprite.getContext("2d")
    if (sCtx) {
      const grad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, "rgba(255,255,255,1)")
      grad.addColorStop(0.45, "rgba(255,255,255,0.65)")
      grad.addColorStop(1, "rgba(255,255,255,0)")
      sCtx.fillStyle = grad
      sCtx.fillRect(0, 0, 64, 64)
    }
    const particleTexture = new THREE.CanvasTexture(sprite)

    const material = new THREE.PointsMaterial({
      color: ACCENT_COLOR,
      size: 0.06,
      sizeAttenuation: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      alphaTest: 0.001,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    /* Parallax sutil de mouse — clamped, no overreactive. */
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    let raf = 0
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.045 + mouseX
      points.rotation.x = Math.sin(t * 0.025) * 0.06 + mouseY * 0.5
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      geometry.dispose()
      material.dispose()
      particleTexture.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hold-hero-particles-3d"
      aria-hidden
    />
  )
}
