# Project Structure

```
next-saas-admin-ui/
├── app/
│   ├── (admin)/              # All authenticated admin pages
│   │   ├── layout.tsx        # Applies sidebar + topbar to every admin page
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
│   ├── layout.tsx            # Root layout: fonts, ThemeProvider, TooltipProvider
│   ├── page.tsx              # Redirects → /dashboard
│   └── globals.css           # Tailwind v4 + light/dark CSS variables
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
│   └── ui/                   # shadcn/ui primitives (auto-generated)
│
├── lib/
│   ├── constants.ts          # NAV_GROUPS — sidebar navigation config
│   └── utils.ts              # cn() utility (clsx + tailwind-merge)
│
├── types/
│   └── index.ts              # Shared TypeScript types
│
├── config/
│   └── index.ts              # App-level config (name, description)
│
├── hooks/
│   ├── index.ts
│   └── use-mobile.ts         # Mobile breakpoint detection hook
│
└── docs/                     # You are here
```

## Key Conventions

- **Route groups** `(admin)` and `(auth)` group routes without affecting the URL.
- **Page-local components** go in a `_components/` folder next to their page (e.g. `app/(admin)/users/_components/`).
- All components use **arrow functions** and **hooks** — no class components.
- `@/` path alias maps to the project root.
