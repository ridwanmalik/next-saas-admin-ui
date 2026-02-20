"use client"

import { useEffect, useState } from "react"
import { type ColorTheme } from "@/lib/themes"

const STORAGE_KEY = "color-theme"
const DEFAULT: ColorTheme = "zinc"

const applyTheme = (theme: ColorTheme) => {
  if (theme === DEFAULT) {
    document.documentElement.removeAttribute("data-color-theme")
  } else {
    document.documentElement.setAttribute("data-color-theme", theme)
  }
}

export const useColorTheme = () => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(DEFAULT)

  // Sync from localStorage on mount (after FOUC script has already set the attribute)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ColorTheme | null
    if (stored) setColorThemeState(stored)
  }, [])

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme)
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  return { colorTheme, setColorTheme }
}
