# Next SaaS Admin UI

A clean, production-ready admin dashboard template for indie SaaS products. Built with Next.js 16, Tailwind CSS v4, and shadcn/ui v4.

Ship your admin panel in hours, not days.

---

## Features

- **Sidebar + topbar layout** — collapsible, mobile-friendly
- **Dark / light / system mode** — via `next-themes`, no flash on load
- **6 accent color themes** — Zinc, Blue, Violet, Rose, Orange, Emerald; persisted to `localStorage`
- **DataTable** — sorting, pagination, global search, column visibility, filter chips with keyboard navigation
- **Settings page** — profile, appearance (theme + accent), preferences, notifications
- **Reusable components** — `EmptyState`, `ErrorState`, stat cards, SVG charts
- **404 + error boundary** — wired to Next.js `not-found.tsx` and `error.tsx`
- **TypeScript throughout** — strict mode, no `any`

---

## Quick Start

```bash
git clone https://github.com/ridwanmalik/next-saas-admin-ui.git
cd next-saas-admin-ui
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard` automatically.

**Requirements:** Node.js 20+, Yarn 4 (via Corepack)

---

## Folder Structure

```
app/
├── (admin)/          # Authenticated pages — sidebar + topbar applied automatically
│   ├── dashboard/
│   ├── users/
│   ├── analytics/
│   ├── billing/
│   ├── reports/
│   ├── notifications/
│   ├── security/
│   ├── settings/
│   ├── layout.tsx    # Wraps every admin page with sidebar + topbar
│   └── error.tsx     # 500 error boundary (Next.js)
├── (auth)/
│   └── login/        # Public pages — no sidebar
├── not-found.tsx     # 404 page
├── layout.tsx        # Root layout: fonts, ThemeProvider, TooltipProvider
├── globals.css       # Tailwind v4 config + CSS variables + color themes
│
components/
├── layout/           # AdminSidebar, Topbar, ModeToggle, UserDropdown
├── providers/        # ThemeProvider wrapper
└── ui/               # shadcn primitives + custom components
    ├── data-table.tsx # Sortable table with search, pagination, filters
    ├── empty-state.tsx
    └── error-state.tsx
│
hooks/
├── use-color-theme.ts  # Accent color persistence
└── use-mobile.ts
│
lib/
├── constants.ts      # NAV_GROUPS — sidebar navigation config
├── themes.ts         # Color theme definitions
└── utils.ts          # cn() utility
```

---

## Customization

### Add a page

Create `app/(admin)/your-page/page.tsx` — the sidebar and topbar are applied automatically.

### Add a nav item

Edit `lib/constants.ts`:

```ts
import { YourIcon } from "lucide-react"

{ icon: YourIcon, title: "Your Page", href: "/your-page" }
// Optional badge:
{ icon: YourIcon, title: "Your Page", href: "/your-page", badge: "3" }
```

### Change the accent color palette

Each theme lives in `app/globals.css` as a `html[data-color-theme]` block. Only `--primary`, `--ring`, and `--sidebar-primary` are swapped — backgrounds stay neutral (60-30-10 rule).

```css
html[data-color-theme="blue"] {
  --primary: oklch(0.546 0.245 262.881);
}
html.dark[data-color-theme="blue"] {
  --primary: oklch(0.623 0.214 259.815);
}
```

Add a new entry to `lib/themes.ts` to expose it in the Settings UI.

### Change the app name

```ts
// lib/constants.ts
export const APP_NAME = "Your App"
```

```ts
// app/layout.tsx
export const metadata = { title: "Your App" }
```

### Use EmptyState

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { Users } from "lucide-react"

<EmptyState
  icon={Users}
  title="No users yet"
  description="Invite your first team member to get started."
  actions={[{ label: "Invite user", onClick: () => {} }]}
  size="md" // "sm" | "md" | "lg"
/>
```

### Use DataTable

```tsx
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"

const columns: DataTableColumn<Item>[] = [
  { key: "name",    header: "Name",   sortable: true, hideable: false },
  { key: "status",  header: "Status", sortable: true, hideBelow: "md",
    render: row => <span>{row.status}</span> },
]

<DataTable
  columns={columns}
  data={items}
  searchPlaceholder="Search..."
  toolbarFilters={<YourFilterChip />}  // left of spacer
  toolbarActions={<Button>Add</Button>} // right of Columns button
/>
```

> Pages that pass `render` functions to DataTable must include `"use client"`.

### Replace mock auth

`components/layout/user-dropdown.tsx` uses a hardcoded `MOCK_USER`. Swap it for your auth session:

```tsx
// NextAuth
const { data: session } = useSession()

// Clerk
const { user } = useUser()
```

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui v4 (new-york) |
| Icons | Lucide React |
| Dark mode | next-themes |
| Language | TypeScript (strict) |

---

## Scripts

```bash
yarn dev      # Dev server with Turbopack
yarn build    # Production build
yarn lint     # ESLint
```

---

## License

MIT — use it for your product, no attribution required.
