"use client"

import { useEffect, useRef } from "react"
import "./shader-animation.css"

type Props = {
  /** Opacidad del canvas (0–1). Default 1. */
  opacity?: number
  className?: string
}

/* Vertex shader: full screen quad. */
const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

/* Fragment shader — paleta HOLD ESTRICTA (azul brand + negro brand +
 * blanco). El palette() original (a + b*cos(...)) generaba colores
 * cíclicos en magenta/cyan/rojo que no son de la marca; reemplazado
 * por una interpolación entre 3 colores brand (negro → azul → blanco)
 * controlada por un valor lineal de tiempo. */
const FRAGMENT_SHADER_SRC = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

/* Colores brand exactos:
 * - #1D1D1B (negro brand) ≈ vec3(0.114, 0.114, 0.106)
 * - #2B63FF (azul accent) ≈ vec3(0.169, 0.388, 1.0)
 * - #FAFFFA (star white) ≈ vec3(0.980, 1.0, 0.980) */
const vec3 BRAND_BLACK = vec3(0.114, 0.114, 0.106);
const vec3 BRAND_BLUE  = vec3(0.169, 0.388, 1.0);
const vec3 BRAND_WHITE = vec3(0.980, 1.0, 0.980);

vec3 palette(float t) {
  /* Interpolación negro → azul → blanco según un sine de t (no cos
   * cycling de colores que tiraba magentas y cyanes). */
  float v = 0.5 + 0.5 * sin(6.28318 * t);
  if (v < 0.5) {
    return mix(BRAND_BLACK, BRAND_BLUE, v * 2.0);
  } else {
    return mix(BRAND_BLUE, BRAND_WHITE, (v - 0.5) * 2.0);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 uv0 = uv;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  float d = length(uv);
  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 1.5) - 0.5;
    d = length(uv) * exp(-length(uv0));
    vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.01);
    d = sin(d * 4.0 + u_time) / 36.0;
    d = pow(0.005 / d, 1.5);

    col += color * d;
  }

  float wave = sin(uv0.x * 2.0 + u_time) * 0.008;
  col += vec3(wave);

  /* Gradient base negro → azul, mezclado generosamente para mantener
   * el ambient brand. */
  vec3 gradientMix = mix(BRAND_BLACK, BRAND_BLUE, uv0.y * 0.6 + sin(u_time * 0.3) * 0.15);
  col = mix(col, gradientMix, 0.42);

  gl_FragColor = vec4(col, 1.0);
}
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * ShaderAnimation — canvas WebGL con fragment shader animado de ondas
 * en paleta HOLD (azul brand + negro brand). Pensado como BACKGROUND
 * de paneles oscuros: position absolute inset 0, pointer-events none.
 *
 * Responsive al PADRE (ResizeObserver), no al viewport global.
 * Respeta prefers-reduced-motion: no monta el render loop.
 *
 * Adaptado de Scottclayton3d / 21st.dev — paleta brand, sin overlays
 * ni toggles, TypeScript estricto, cleanup completo en unmount.
 */
export function ShaderAnimation({
  opacity = 1,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported")
      return
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC)
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER_SRC,
    )
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")

    const parent = canvas.parentElement
    const updateSize = () => {
      const w = parent ? parent.clientWidth : window.innerWidth
      const h = parent ? parent.clientHeight : window.innerHeight
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    if (parent) resizeObserver.observe(parent)

    const startTime = Date.now()
    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, currentTime)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(positionBuffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={"hold-shader-canvas" + (className ? ` ${className}` : "")}
      style={{ opacity }}
      aria-hidden
    />
  )
}
