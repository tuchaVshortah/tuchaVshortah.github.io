import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata = {
  title: "DevOps Engineer Portfolio",
  description:
    "Professional portfolio for a DevOps Engineer with expertise in AWS, Kubernetes, CI/CD, and Infrastructure as Code.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive" src="/app/theme-script.js" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
