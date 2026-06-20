"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/useMagnetic"

type Props = {
  children: ReactNode
  threshold?: number
  strength?: number
  className?: string
}

export function MagneticHover({ children, threshold, strength, className }: Props) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>({ threshold, strength })
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
