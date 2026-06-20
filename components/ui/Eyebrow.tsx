import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  /** Color del dot opcional al inicio (hex / token). Si se omite, no hay dot. */
  dotColor?: string
  /** Color del texto. Default: muted. */
  tone?: "default" | "muted" | "fg"
  className?: string
  as?: "p" | "span" | "div"
}

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  default: "var(--fg)",
  muted: "var(--muted)",
  fg: "var(--fg)",
}

export function Eyebrow({
  children,
  dotColor,
  tone = "muted",
  className,
  as: Tag = "p",
}: Props) {
  return (
    <Tag
      className={cn("t-micro", className)}
      style={{
        color: TONE[tone],
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
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
      {children}
    </Tag>
  )
}
