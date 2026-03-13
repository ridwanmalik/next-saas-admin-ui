"use client"

import { useEffect, useState } from "react"
import { type SurfaceTheme } from "@/lib/themes"

const STORAGE_KEY = "surface-theme"
const DEFAULT: SurfaceTheme = "default"

const applyTheme = (theme: SurfaceTheme) => {
  if (theme === DEFAULT) {
    document.documentElement.removeAttribute("data-surface-theme")
  } else {
    document.documentElement.setAttribute("data-surface-theme", theme)
  }
}

export const useSurfaceTheme = () => {
  const [surfaceTheme, setSurfaceThemeState] = useState<SurfaceTheme>(DEFAULT)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SurfaceTheme | null
    if (stored) setSurfaceThemeState(stored)
  }, [])

  const setSurfaceTheme = (theme: SurfaceTheme) => {
    setSurfaceThemeState(theme)
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  return { surfaceTheme, setSurfaceTheme }
}
