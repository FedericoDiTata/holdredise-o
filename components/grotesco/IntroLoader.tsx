"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { EASE_WIPE } from "@/lib/motion"
import "./intro-loader.css"

/**
 * Intro loader: pantalla accent con el wordmark + barra de progreso +
 * "Sosteniendo" en mono. Dura ~1.6s y se va con un wipe hacia arriba.
 * Solo se muestra una vez por sesión (sessionStorage) y se saltea si
 * el usuario prefiere menos motion.
 */
export function IntroLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (sessionStorage.getItem("hold:intro")) return

    sessionStorage.setItem("hold:intro", "1")
    setShow(true)

    const t = setTimeout(() => setShow(false), 1700)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="grot-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: EASE_WIPE }}
          aria-hidden
        >
          <div className="grot-loader__logo">
            hold<span>.</span>
          </div>
          <div className="grot-loader__bar">
            <div className="grot-loader__bar-fill" />
          </div>
          <div className="grot-loader__label">Sosteniendo</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
