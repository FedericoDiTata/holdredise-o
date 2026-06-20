import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
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
    <html lang="es" className={inter.variable}>
      <body>
        <a href="#content" className="hold-skip-link">
          Saltar al contenido
        </a>
        <SmoothScroll />
        <RevealOnScroll />
        <Header />
        <div
          id="content"
          className="hold-page"
          style={{ paddingTop: "var(--hold-header-h, 72px)" }}
        >
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
