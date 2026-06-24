"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { EASE_HOLD } from "@/lib/motion"
import "./split-text.css"

type Props = {
  text: string
  /** Granularidad: por palabra o por letra. Default "word". */
  granularity?: "word" | "char"
  /** Delay entre cada palabra/letra (s). */
  stagger?: number
  /** Delay inicial antes de arrancar el stagger (s). */
  delayChildren?: number
  className?: string
}

const itemVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_HOLD },
  },
}

/**
 * Divide un string en palabras (o letras) y aplica un wipe-up stagger
 * editorial cuando entra al viewport. Cada token va dentro de su propio
 * "row" con overflow:hidden — eso clipea el y:115% inicial y la entrada
 * se ve como un mask reveal por palabra.
 *
 * `prefers-reduced-motion`: devuelve un span plano sin animación.
 * `aria-label`: el string completo, accesible para screen readers
 * (los tokens individuales van `aria-hidden`).
 */
export function SplitText({
  text,
  granularity = "word",
  stagger = 0.07,
  delayChildren = 0,
  className,
}: Props) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>

  const tokens =
    granularity === "word" ? text.split(" ") : Array.from(text)

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }

  return (
    <motion.span
      className={"hold-split-text" + (className ? ` ${className}` : "")}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span key={i} className="hold-split-text__row" aria-hidden>
          <motion.span
            className="hold-split-text__item"
            variants={itemVariants}
          >
            {token}
            {granularity === "word" && i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
