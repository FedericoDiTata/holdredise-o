import type { CursoEstado } from "@/types"
import { cn } from "@/lib/utils"

/** Mapeo de estado de curso del DS → color del dot. */
const ESTADO_DOT: Record<CursoEstado, string> = {
  "Inscripción abierta": "#1FAB54", // verde "En vivo" del DS
  "Próximamente": "#F9423A",       // warm-red
  "Cupo limitado": "#E96951",       // coral
}

type BaseProps = {
  className?: string
}

type CursoProps = BaseProps & {
  estado: CursoEstado
  children?: never
}

type CustomProps = BaseProps & {
  estado?: never
  children: React.ReactNode
  /** Color del dot — si se omite, no hay dot. */
  dotColor?: string
}

export function Badge(props: CursoProps | CustomProps) {
  const { className } = props
  const text = "estado" in props && props.estado ? props.estado : props.children
  const dotColor =
    "estado" in props && props.estado
      ? ESTADO_DOT[props.estado]
      : "dotColor" in props
        ? props.dotColor
        : undefined

  return (
    <span
      className={cn(className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        fontSize: 11,
        lineHeight: 1.2,
        fontWeight: 500,
        letterSpacing: "0.02em",
        border: "1px solid var(--hairline)",
        color: "var(--fg)",
        background: "transparent",
      }}
    >
      {dotColor ? (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            background: dotColor,
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
      ) : null}
      {text}
    </span>
  )
}
