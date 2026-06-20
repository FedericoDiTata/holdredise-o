"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASE_HOLD } from "@/lib/motion"

interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Columnas en breakpoint default (xl+). Si no se pasa, el componente decide
   * según viewport (1/2/3/4 según width).
   */
  columns?: number
  /** Gap entre items (multiplicado x 0.25rem, como Tailwind spacing). */
  gap?: number
  children: React.ReactNode
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_HOLD },
  },
}

function getResponsiveColumns(width: number): number {
  if (width < 640) return 1
  if (width < 1024) return 2
  return 3
}

/**
 * Grid masonry con CSS column-count: items con altura variable se acomodan
 * en columnas tipo Pinterest/Instagram. Cada child se envuelve en un motion
 * div con whileInView para reveal individual con blur fade-in.
 *
 * Si no se pasa `columns`, se calcula responsive según window.innerWidth.
 */
export function MasonryGrid({
  columns: columnsOverride,
  gap = 4,
  children,
  className,
  style,
  ...props
}: MasonryGridProps) {
  const [columns, setColumns] = React.useState(columnsOverride ?? 4)

  React.useEffect(() => {
    if (columnsOverride !== undefined) return
    const onResize = () => setColumns(getResponsiveColumns(window.innerWidth))
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [columnsOverride])

  const masonryStyle: React.CSSProperties = {
    columnCount: columns,
    columnGap: `${gap * 0.25}rem`,
    ...style,
  }

  return (
    <div
      className={cn("hold-masonry", className)}
      style={masonryStyle}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          className="hold-masonry__item"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={i}
          style={{
            marginBottom: `${gap * 0.25}rem`,
            breakInside: "avoid",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
