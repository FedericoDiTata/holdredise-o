/* Slugs de servicios — coinciden 1:1 con las rutas del navbar. */
export type ServicioSlug = "academy" | "redes-sociales" | "performance"

export interface Servicio {
  slug: ServicioSlug
  numero: string
  nombre: string
  eyebrow: string        // "Educación", "Marcas y negocios", "Resultados medibles"
  tagline: string
  descripcion: string
  items: string[]
  acento: string         // hex
  href: string           // ruta interna
  /** Monto desde, sin unidad. Ej: "250", "800". */
  precioDesde: string
  /** Período opcional: "mes". Si se omite, es one-shot. */
  precioPeriodo?: "mes" | "curso" | "campaña"
  /** Items que se incluyen, para mostrar en la card de Pricing. */
  incluye: string[]
}

/* Estado de cursos del DS — color de dot incluido. */
export type CursoEstado = "Inscripción abierta" | "Próximamente" | "Cupo limitado"

export interface Curso {
  id: string             // "ACA · 01"
  slug: string           // URL slug — ej "claude", "meta", "mentorias"
  nombre: string
  formato: string        // "4 sesiones · Online"
  estado: CursoEstado
  /** Precio de referencia. Si se omite, se muestra solo el formato. */
  precio?: string        // "USD 250" · "USD 1.200" · "Consultar"
  /** Descripción breve — visible en la celda hero del bento y en el lead del detalle. */
  descripcion?: string

  /* ─── Campos del detalle (solo página /academy/[curso]) ─────────────── */

  /** "4 sesiones de 90 minutos" */
  duracion?: string
  /** "Online en vivo" · "Híbrido (online + presencial)" · "Presencial" */
  modalidad?: string
  /** "Próximo grupo: marzo 2026" — texto libre para mostrar fechas. */
  proximaFecha?: string
  /** "Creadores que quieren acelerar su proceso sin perder voz propia." */
  destinatario?: string
  /** Módulos / contenido — qué vas a aprender. */
  modulos?: readonly string[]
  /** Qué incluye (más detallado que el helper genérico de Servicio.incluye). */
  incluye?: readonly string[]
}

export interface Testimonio {
  texto: string
  nombre: string
  /** Marca / empresa asociada al testimonio. Si la persona testifica
   *  como marca personal (sin empresa), se omite. */
  marca?: string
  /** Rubro / sector — "Estudio Jurídico", "Real Estate", etc. */
  rubro: string
  servicio: ServicioSlug
}

export interface MiembroEquipo {
  nombre: string
  rol: string
  iniciales: string
  /** Bio larga (solo founders por ahora). */
  bio?: readonly string[]
}

export interface NavLink {
  label: string
  href: string
}
