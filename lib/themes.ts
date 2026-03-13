// ─── Accent color theme definitions ───────────────────────────────────────────
//
// Only --primary, --ring, --sidebar-primary, --sidebar-ring are swapped.
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

// ─── Surface theme definitions ─────────────────────────────────────────────────
//
// Surface themes change --background, --card, --popover, --muted, --border, and
// most visibly --sidebar (giving the sidebar a distinct dark hue).
// They use data-surface-theme on <html> and work independently of dark/light mode.
// ──────────────────────────────────────────────────────────────────────────────

export interface SurfaceThemeConfig {
  id: SurfaceTheme
  label: string
  /** Sidebar panel color — the most distinctive part of the swatch */
  sidebarColor: string
  /** Page/content background color */
  bgColor: string
}

export type SurfaceTheme =
  | "default"
  | "slate" | "stone" | "forest" | "rose"
  | "ocean" | "violet" | "amber" | "teal" | "purple" | "indigo" | "navy"

export const SURFACE_THEMES: SurfaceThemeConfig[] = [
  {
    id: "default",
    label: "Default",
    sidebarColor: "oklch(0.984 0.003 247)",
    bgColor:      "oklch(1 0 0)",
  },
  {
    id: "slate",
    label: "Slate",
    sidebarColor: "oklch(0.235 0.046 245)",
    bgColor:      "oklch(0.956 0.010 243)",
  },
  {
    id: "ocean",
    label: "Ocean",
    sidebarColor: "oklch(0.30 0.16 232)",
    bgColor:      "oklch(0.954 0.018 232)",
  },
  {
    id: "violet",
    label: "Violet",
    sidebarColor: "oklch(0.28 0.20 288)",
    bgColor:      "oklch(0.954 0.018 285)",
  },
  {
    id: "stone",
    label: "Green",
    sidebarColor: "#0e4a1f",
    bgColor:      "oklch(0.956 0.014 148)",
  },
  {
    id: "amber",
    label: "Amber",
    sidebarColor: "oklch(0.38 0.16 50)",
    bgColor:      "oklch(0.955 0.018 48)",
  },
  {
    id: "forest",
    label: "Forest",
    sidebarColor: "oklch(0.218 0.055 152)",
    bgColor:      "oklch(0.957 0.012 152)",
  },
  {
    id: "teal",
    label: "Teal",
    sidebarColor: "oklch(0.30 0.16 192)",
    bgColor:      "oklch(0.954 0.018 192)",
  },
  {
    id: "rose",
    label: "Rose",
    sidebarColor: "oklch(0.32 0.20 340)",
    bgColor:      "oklch(0.954 0.018 340)",
  },
  {
    id: "purple",
    label: "Terra",
    sidebarColor: "oklch(0.73 0.175 50)",
    bgColor:      "oklch(0.956 0.012 50)",
  },
  {
    id: "indigo",
    label: "Indigo",
    sidebarColor: "oklch(0.44 0.24 264)",
    bgColor:      "oklch(0.955 0.015 264)",
  },
  {
    id: "navy",
    label: "Navy",
    sidebarColor: "oklch(0.21 0.073 257)",
    bgColor:      "oklch(0.955 0.012 257)",
  },
]
