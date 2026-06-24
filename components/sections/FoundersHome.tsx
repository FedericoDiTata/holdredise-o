"use client"

import { motion } from "framer-motion"
import { blurFadeUp, VIEWPORT_DEFAULT } from "@/lib/motion"
import { Founders } from "./Founders"

/**
 * Wrapper de Founders para la home: pasa `showBio=false` y `compact`
 * para una variante más densa (foto cuadrada, gaps menores). Envuelve
 * con motion fade-up al entrar al viewport.
 */
export function FoundersHome() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={blurFadeUp}
    >
      <Founders showBio={false} compact />
    </motion.div>
  )
}
