"use client"

import { useEffect, useRef } from "react"

type Color3 = [number, number, number]

/** Convierte "#E96951" → [0.91, 0.41, 0.32]. */
function hexToVec3(hex: string): Color3 {
  const clean = hex.trim().replace("#", "")
  if (clean.length !== 6) return [1, 1, 1]
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  return [r, g, b]
}

function readAccent(): string {
  if (typeof document === "undefined") return "#E96951"
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim()
  return v || "#E96951"
}

type Props = {
  /** Color principal. Si no se pasa, lee --accent del DOM y reacciona al AccentSwitcher. */
  colorA?: string
  /** Color secundario (default: Star White HOLD). */
  colorB?: string
  /** Color terciario (default: Soft Pink HOLD #EBBDD9). */
  colorC?: string
  /** Intensidad global del shader (0-1). Default 0.65 — editorial. */
  intensity?: number
  className?: string
}

/**
 * Shader Three.js de líneas concéntricas animadas. Adaptado del shader
 * de aliimam (21st.dev) para usar la paleta HOLD en lugar de RGB
 * cromático separado.
 *
 * Perf:
 * - Three.js se importa async dentro del effect → no engrosa el JS
 *   inicial de la página (el chunk de ~600KB se descarga después del
 *   first paint, con el bg negro ya visible).
 * - DPR cap a 1.5 (ahorra ~50% fragments en pantallas 4K).
 * - Pausa el renderLoop cuando el container sale del viewport.
 * - Respeta prefers-reduced-motion (no inicializa WebGL).
 *
 * Reactivo al AccentSwitcher via MutationObserver sobre style de :root.
 */
export function ShaderAnimation({
  colorA,
  colorB = "#FAFFFA",
  colorC = "#EBBDD9",
  intensity = 0.65,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Respeta reduced-motion: no monta WebGL.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    let cancelled = false
    let cleanup: (() => void) | null = null

    /* Async import de three: el chunk se descarga después del first
       paint, no bloquea el TTI inicial. Mientras carga, el bg negro
       del wrapper se ve instantáneo. */
    void (async () => {
      const THREE = await import("three")
      if (cancelled || !containerRef.current) return

      const initialA = colorA ?? readAccent()
      const vecA = hexToVec3(initialA)
      const vecB = hexToVec3(colorB)
      const vecC = hexToVec3(colorC)

      const vertexShader = /* glsl */ `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `

      /* Fragment shader: 3 capas concéntricas con offsets temporales
         distintos. Cada capa se multiplica por un color brand y se
         suman con blend additivo. */
      const fragmentShader = /* glsl */ `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        uniform float intensity;

        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) /
                    min(resolution.x, resolution.y);
          float t = time * 0.05;
          float lineWidth = 0.0018;

          float layerA = 0.0;
          float layerB = 0.0;
          float layerC = 0.0;

          for (int i = 0; i < 5; i++) {
            float fi = float(i);
            float r = length(uv);
            float modSum = mod(uv.x + uv.y, 0.2);
            layerA += lineWidth * fi * fi /
                      abs(fract(t + fi * 0.01) * 5.0 - r + modSum);
            layerB += lineWidth * fi * fi /
                      abs(fract(t - 0.01 + fi * 0.01) * 5.0 - r + modSum);
            layerC += lineWidth * fi * fi /
                      abs(fract(t - 0.02 + fi * 0.01) * 5.0 - r + modSum);
          }

          vec3 color = colorA * layerA + colorB * layerB * 0.6 + colorC * layerC * 0.7;
          color *= intensity;

          gl_FragColor = vec4(color, 1.0);
        }
      `

      const camera = new THREE.Camera()
      camera.position.z = 1

      const scene = new THREE.Scene()
      const geometry = new THREE.PlaneGeometry(2, 2)

      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
        colorA: { value: new THREE.Vector3(vecA[0], vecA[1], vecA[2]) },
        colorB: { value: new THREE.Vector3(vecB[0], vecB[1], vecB[2]) },
        colorC: { value: new THREE.Vector3(vecC[0], vecC[1], vecC[2]) },
        intensity: { value: intensity },
      }

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
      })
      // Cap DPR a 1.5 para perf en pantallas 4K.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      container.appendChild(renderer.domElement)

      const onResize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        renderer.setSize(w, h)
        uniforms.resolution.value.x = renderer.domElement.width
        uniforms.resolution.value.y = renderer.domElement.height
      }
      onResize()
      window.addEventListener("resize", onResize)

      // Pausa el render cuando el container sale del viewport.
      let isVisible = true
      const visibilityObs = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting
        },
        { threshold: 0 },
      )
      visibilityObs.observe(container)

      let animationId = 0
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        if (!isVisible) return
        uniforms.time.value += 0.05
        renderer.render(scene, camera)
      }
      animate()

      // Si colorA no fue forzado por prop, escuchamos cambios de --accent.
      let accentObs: MutationObserver | null = null
      if (!colorA) {
        accentObs = new MutationObserver(() => {
          const next = readAccent()
          const [r, g, b] = hexToVec3(next)
          uniforms.colorA.value.set(r, g, b)
        })
        accentObs.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["style"],
        })
      }

      cleanup = () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener("resize", onResize)
        visibilityObs.disconnect()
        accentObs?.disconnect()
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
        renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [colorA, colorB, colorC, intensity])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}
