# Project Structure

```
next-saas-admin-ui/
├── app/
│   ├── (admin)/              # All authenticated admin pages
│   │   ├── layout.tsx        # Applies sidebar + topbar to every admin page
│   │   ├── error.tsx         # Next.js error boundary (500) — "use client"
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── analytics/
│   │   ├── billing/
│   │   ├── reports/
│   │   ├── notifications/
│   │   ├── security/
│   │   └── settings/
│   ├── (auth)/               # Public auth pages (no sidebar)
│   │   └── login/
│   ├── layout.tsx            # Root layout: fonts, ThemeProvider, TooltipProvider, FOUC script
│   ├── not-found.tsx         # Next.js 404 page (no sidebar)
│   ├── page.tsx              # Redirects → /dashboard
│   └── globals.css           # Tailwind v4 + light/dark CSS variables + accent color themes
│
├── components/
│   ├── layout/               # Core layout components
│   │   ├── admin-layout.tsx  # SidebarProvider wrapper
│   │   ├── admin-sidebar.tsx # Collapsible sidebar with nav groups
│   │   ├── topbar.tsx        # Header: trigger + mode toggle + user menu
│   │   ├── mode-toggle.tsx   # Light/dark toggle button
│   │   └── user-dropdown.tsx # Avatar + account dropdown
│   ├── providers/
│   │   └── theme-provider.tsx
│   └── ui/                   # shadcn/ui primitives + custom components
│       ├── data-table.tsx    # Custom: sortable table, pagination, search, column toggle
│       ├── empty-state.tsx   # Custom: reusable empty state (sm/md/lg sizes)
│       └── error-state.tsx   # Custom: error display with code watermark + dot-grid bg
│
├── lib/
│   ├── constants.ts          # NAV_GROUPS — sidebar navigation config, APP_NAME
│   ├── themes.ts             # COLOR_THEMES — 6 accent color presets
│   └── utils.ts              # cn() utility (clsx + tailwind-merge)
│
├── hooks/
│   ├── index.ts              # Re-exports all hooks
│   ├── use-color-theme.ts    # Accent color persistence (localStorage + data-color-theme attr)
│   └── use-mobile.ts         # Mobile breakpoint detection hook
│
├── types/
│   └── index.ts              # Shared TypeScript types
│
├── config/
│   └── index.ts              # App-level config (name, description)
│
└── docs/                     # You are here
```

## Key Conventions

- **Route groups** `(admin)` and `(auth)` group routes without affecting the URL.
- **Page-local components** go in a `_components/` folder next to their page (e.g. `app/(admin)/users/_components/`).
- All components use **arrow functions** and **hooks** — no class components.
- `@/` path alias maps to the project root.
- Color themes are applied via `data-color-theme` attribute on `<html>`, set before first paint to prevent FOUC.
