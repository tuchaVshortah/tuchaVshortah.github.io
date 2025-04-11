'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}