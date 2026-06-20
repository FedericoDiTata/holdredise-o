import type { MetadataRoute } from "next"

/* Configurable por env. Setear NEXT_PUBLIC_SITE_URL en producción
   (ej. Vercel) cuando se defina el dominio final. */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://holdagencia.com"

type Route = {
  path: string
  priority: number
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly"
}

const ROUTES: readonly Route[] = [
  { path: "/",                     priority: 1.0, changeFrequency: "weekly" },
  { path: "/academy",              priority: 0.9, changeFrequency: "monthly" },
  { path: "/redes-sociales",       priority: 0.9, changeFrequency: "monthly" },
  { path: "/performance",          priority: 0.9, changeFrequency: "monthly" },
  { path: "/nosotros",             priority: 0.7, changeFrequency: "yearly" },
  { path: "/clientes",             priority: 0.8, changeFrequency: "monthly" },
  { path: "/contacto",             priority: 0.6, changeFrequency: "yearly" },
  { path: "/trabaja-con-nosotros", priority: 0.5, changeFrequency: "yearly" },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
