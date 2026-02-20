// ─── Color theme definitions ──────────────────────────────────────────────────
//
// Only the accent/primary variables are swapped per theme.
// Backgrounds, surfaces, borders, and muted tones stay neutral (60-30-10 rule).
// ──────────────────────────────────────────────────────────────────────────────

export type ColorTheme = "zinc" | "blue" | "violet" | "rose" | "orange" | "emerald"

export interface ThemeConfig {
  id: ColorTheme
  label: string
  /** OKLCH value used to render the swatch circle in the UI */
  swatch: string
}

export const COLOR_THEMES: ThemeConfig[] = [
  { id: "zinc",    label: "Zinc",    swatch: "oklch(0.45 0.04 265)"        },
  { id: "blue",    label: "Blue",    swatch: "oklch(0.546 0.245 262.881)"  },
  { id: "violet",  label: "Violet",  swatch: "oklch(0.491 0.270 292.581)"  },
  { id: "rose",    label: "Rose",    swatch: "oklch(0.52  0.253 17.585)"   },
  { id: "orange",  label: "Orange",  swatch: "oklch(0.65  0.213 38.38)"    },
  { id: "emerald", label: "Emerald", swatch: "oklch(0.527 0.154 150.069)"  },
]
