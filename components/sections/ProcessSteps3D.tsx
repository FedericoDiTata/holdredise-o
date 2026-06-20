"use client"

import { useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import "./process-steps-3d.css"

export type ProcessStep3D = {
  title: string
  desc: string
  /** URL de imagen de fondo (Unsplash u otra). Se desatura + tinta
   *  con el bg de la card para mantener coherencia con la paleta. */
  bgImage?: string
}

type StepProps = {
  step: ProcessStep3D
  index: number
}

function StepCard({ step, index }: StepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Tilt limitado a 4 grados — el efecto se quiere sutil, no mareante.
    setRotation({
      x: -(y / rect.height) * 4,
      y: (x / rect.width) * 4,
    })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    /* Wrapper externo: entrance animation (fade + slide + scale) con
       stagger por index. Solo corre una vez al entrar al viewport. */
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        delay: index * 0.14,
      }}
      style={{ perspective: 1200 }}
    >
      {/* Inner: tilt 3D dinámico por mousemove. Separado del wrapper de
          entrance para que ambas animaciones no peleen. */}
      <motion.article
        ref={ref}
        className="hold-step3d"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          y: hovered ? -4 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 22,
        }}
      >
        {step.bgImage ? (
          <div
            className="hold-step3d__bg"
            style={{ backgroundImage: `url(${step.bgImage})` }}
            aria-hidden
          />
        ) : null}
        <div className="hold-step3d__shade" aria-hidden />
        <div className="hold-step3d__glow" aria-hidden />
        <div className="hold-step3d__grain" aria-hidden />

        <div className="hold-step3d__content">
          <h3 className="hold-step3d__title">{step.title}</h3>
          <p className="hold-step3d__desc">{step.desc}</p>
        </div>

        <div className="hold-step3d__beam" aria-hidden />
      </motion.article>
    </motion.div>
  )
}

type Header = {
  title: ReactNode
  intro?: ReactNode
}

type Props = {
  steps: readonly ProcessStep3D[]
  /** Header opcional. Si se pasa, se renderiza dentro del wrapper
   *  oscuro/azul — así título + intro + cards comparten el bg de
   *  la sección sin "salto" visual al bg blanco anterior. */
  header?: Header
}

/**
 * Cuatro cards en grid 2x2 con tilt 3D, imagen de fondo opcional y
 * animación de entrada stagger. Adaptado del gradient-card de
 * ravikatiyar (21st) al DS HOLD: paleta b/n/azul, border 0.
 */
export function ProcessSteps3D({ steps, header }: Props) {
  return (
    <div className="hold-steps3d-wrap">
      {header ? (
        <motion.header
          className="hold-steps3d-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="hold-steps3d-header__title">{header.title}</h2>
          {header.intro ? (
            <p className="hold-steps3d-header__intro">{header.intro}</p>
          ) : null}
        </motion.header>
      ) : null}

      <div className="hold-steps3d">
        {steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </div>
  )
}
