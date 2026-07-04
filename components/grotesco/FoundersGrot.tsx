"use client"

import { motion } from "framer-motion"
import { founders } from "@/data/content"
import { SectionTag } from "./SectionTag"
import "./founders-grot.css"

/**
 * Founders: claim grande + 2 retratos halftone. El claim entra con
 * spring; cada card sube ladeada en sentidos opuestos y se acomoda.
 */
export function FoundersGrot() {
  return (
    <section className="grot-founders grot-cover" id="founders">
      <SectionTag spot="right">Founders</SectionTag>

      <motion.h2
        className="grot-founders__claim"
        initial={{ y: 60, opacity: 0, rotate: 1.2 }}
        whileInView={{ y: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        Decidimos construir lo que no{" "}
        <span className="grot-founders__claim-accent">encontrábamos.</span>
      </motion.h2>

      <div className="grot-founders__grid">
        {founders.map((f, i) => (
          <motion.article
            key={f.nombre}
            className="grot-founders__card"
            initial={{
              y: 90,
              opacity: 0,
              rotate: i === 0 ? -2.5 : 2.5,
            }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 15,
              delay: i * 0.15,
            }}
          >
            <div
              className={
                "grot-founders__photo " +
                (i === 0
                  ? "grot-founders__photo--dark"
                  : "grot-founders__photo--accent")
              }
              aria-hidden
            >
              <span className="grot-founders__tag">
                [ retrato · {f.nombre.split(" ")[0]} ]
              </span>
            </div>
            <div className="grot-founders__meta">
              <h3 className="grot-founders__nombre">{f.nombre}</h3>
              <p className="grot-founders__rol">{f.rol}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
