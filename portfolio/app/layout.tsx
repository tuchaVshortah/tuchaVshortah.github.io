import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata = {
  title: "Nurkanat Baisenkul — Platform, Solutions & Security Engineer",
  description:
    "Portfolio of Nurkanat Baisenkul — a platform- and security-focused engineer building secure delivery platforms with CI/CD, HashiCorp Vault, Kubernetes, and AWS.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive" src="/theme-script.js" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
