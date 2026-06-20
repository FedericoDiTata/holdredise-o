import type { ComponentType, SVGProps } from "react"
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react"
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TEL_DISPLAY,
  WHATSAPP_URL,
} from "@/data/content"
import "./contact-methods.css"

/* lucide-react 1.x no expone Instagram — SVG inline minimal con el
   mismo strokeWidth y proporciones que los demás iconos. */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width={20} height={20} x={2} y={2} rx={5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.5} cy={6.5} r={0.5} fill="currentColor" />
    </svg>
  )
}

type IconComponent = ComponentType<{ size?: number; strokeWidth?: number }>

type Method = {
  label: string
  value: string
  href: string
  external: boolean
  cta: string
  Icon: IconComponent
}

const METHODS: readonly Method[] = [
  {
    label: "WhatsApp",
    value: TEL_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
    cta: "Iniciar chat",
    Icon: MessageCircle,
  },
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    cta: "Escribir",
    Icon: Mail,
  },
  {
    label: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    external: true,
    cta: "Ver perfil",
    Icon: InstagramIcon,
  },
] as const

/**
 * Tres cards grandes para los canales de contacto. Hover: la card se
 * llena del acento desde abajo (wipe vertical) y el texto pasa a blanco.
 */
export function ContactMethods() {
  return (
    <div className="hold-contact-methods">
      {METHODS.map(({ label, value, href, external, cta, Icon }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="hold-contact-method"
          aria-label={`${label} — ${value}`}
        >
          <span className="hold-contact-method__icon" aria-hidden>
            <Icon size={32} strokeWidth={1.5} />
          </span>
          <div className="hold-contact-method__body">
            <p className="hold-contact-method__label">{label}</p>
            <p className="hold-contact-method__value">{value}</p>
            <span className="hold-contact-method__cta">{cta}</span>
          </div>
          <ArrowUpRight
            className="hold-contact-method__arrow"
            size={22}
            strokeWidth={1.5}
            aria-hidden
          />
        </a>
      ))}
    </div>
  )
}
