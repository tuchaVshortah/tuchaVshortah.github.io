'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ThemeProviderProps {
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
