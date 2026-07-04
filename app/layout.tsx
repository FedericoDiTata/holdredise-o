import type { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"
import { FooterGrot } from "@/components/grotesco/FooterGrot"
import { NavGrotesco } from "@/components/grotesco/NavGrotesco"
import { SmoothScroll } from "@/components/effects/SmoothScroll"
import { RevealOnScroll } from "@/components/effects/RevealOnScroll"
import { PageTransition } from "@/components/effects/PageTransition"
import { FloatingWhatsApp } from "@/components/effects/FloatingWhatsApp"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

/* Space Mono para labels y metadata del sistema grotesco. */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Hold Agencia Creativa | Estrategia, Contenido y Performance",
  description:
    "Acompañamos a marcas y creadores a comunicar con estrategia. Redes sociales, performance digital y formación. Buenos Aires, Argentina.",
  openGraph: {
    title: "Hold Agencia Creativa",
    description: "No solo hacemos contenido, construimos marcas.",
    url: "https://holdagencia.com",
    siteName: "Hold Agencia Creativa",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hold Agencia Creativa",
    description: "Estrategia, contenido y performance para marcas con propósito.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceMono.variable}`}>
      <body>
        <a href="#content" className="hold-skip-link">
          Saltar al contenido
        </a>
        <SmoothScroll />
        <RevealOnScroll />
        <NavGrotesco />
        <div
          id="content"
          className="hold-page"
          style={{ paddingTop: "var(--hold-header-h, 72px)" }}
        >
          <PageTransition>{children}</PageTransition>
        </div>
        <FooterGrot />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
