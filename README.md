# HOLD · Sitio Web

Sitio institucional de HOLD Agencia Creativa. Multi-página, editorial,
con foco en estrategia, contenido y performance digital. Sin formularios,
sin backend: cada conversación arranca por WhatsApp, mail o Instagram.

## Stack

- **Next.js 16** (App Router) · TypeScript strict
- **Tailwind v4** con `@theme` + custom properties semánticas
- **Framer Motion** para transiciones de página
- **GSAP + Lenis** para scroll suave y micro-interacciones
- **lucide-react** para iconos
- Fuente: **Inter** (next/font) como fallback de Helvetica Neue

## Estructura

```
app/
├── page.tsx                 # Home
├── academy/                 # Hold Academy + tabla de cursos
├── redes-sociales/          # Detalle servicio
├── performance/             # Detalle servicio
├── nosotros/                # Founders + equipo + galería
├── clientes/                # Tabs por servicio + testimonios + casos
├── contacto/                # WhatsApp · Email · Instagram
├── trabaja-con-nosotros/    # Postulación (placeholder)
├── design-system/           # Solo dev: referencia de átomos
├── sitemap.ts               # SEO
└── robots.ts                # SEO

components/
├── ui/                      # Button, Eyebrow, Chip, Badge, PageHero, SectionHeader, Placeholder
├── layout/                  # Header (sticky + dark mode detection), Footer
├── sections/                # Bloques composables: ServiceItems, ServiceProcess, ServicePlan, CoursesTable, CTABand, Founders, TeamRoster, PhotoGallery, ClientesTabs, CasosGrid, ContactMethods, etc.
└── effects/                 # SmoothScroll, RevealOnScroll, PageTransition, MagneticHover, FloatingWhatsApp, MarqueeBand

data/content.ts              # WhatsApp/IG/mail · servicios · cursos · testimonios · founders · team
types/index.ts               # Tipos TS
```

## Scripts

```bash
npm run dev      # Dev server con Turbopack
npm run build    # Build de producción
npm start        # Servir build local
npm run lint     # ESLint
```

Local: [http://localhost:3000](http://localhost:3000)

## Tokens de marca

Todo el diseño parte de los Pantone HOLD declarados en `app/globals.css`:

- `--bg`: Star White `#FAFFFA`
- `--fg`: Black `#1D1D1B`
- `--accent`: controlado por el `AccentSwitcher` (paleta: Coral, Tangerine,
  Warm Red, Bright Blue, Soft Pink). Persiste en `localStorage` bajo
  `hold:accent`.

Tipografía con escala fija (`t-display`, `t-h1` … `t-micro`) — usar esas
clases en vez de tamaños hardcodeados.

Easing único: `cubic-bezier(0.2, 0.8, 0.2, 1)` · duraciones `0.25 – 0.5s`
(la marca también se reconoce por su tempo).

## SEO

- `app/sitemap.ts` y `app/robots.ts` generan `/sitemap.xml` y `/robots.txt`
  automáticamente.
- Setear `NEXT_PUBLIC_SITE_URL` en Vercel cuando se defina el dominio final
  (default: `https://holdagencia.com`).

## Accesibilidad

- Skip-to-content link al inicio del `<body>` (focus-visible only).
- Aria-labels en CTAs e íconos decorativos.
- `prefers-reduced-motion` respetado en `RevealOnScroll` y animaciones del hero.

## Convenciones

- Server Components por default. `"use client"` solo donde hace falta
  (interactividad, observers).
- Imports con alias `@/*` (configurado en `tsconfig.json`).
- CSS scoped por componente: `Component.tsx` + `component.css` con
  prefijo de clase (`hold-*`).
- Texto en español argentino, voseo. CTAs siempre "Hablemos" o "Quiero
  saber más" — nunca "Contáctenos".

## Deploy

Deploy automático en Vercel desde la rama `main`.

```
Repo: github.com/brodhia222-dotcom/Hold
```

## Contacto

- WhatsApp: [+54 9 11 2710 8165](https://wa.me/5491127108165)
- Email: holdagenciadigital@gmail.com
- Instagram: [@hold.agencia](https://instagram.com/hold.agencia)
