import { MessageCircle, CreditCard, Code2, ShieldCheck, UserCircle } from "lucide-react"

export const FAQ_CATEGORIES = [
  {
    id: "general",
    label: "General",
    icon: MessageCircle,
    items: [
      {
        q: "What is this template?",
        a: "A production-ready SaaS admin dashboard built with Next.js 16, Tailwind CSS v4, and shadcn/ui. It gives you everything needed to ship a professional admin panel — dashboards, data tables, invoices, kanban boards, maps, and more.",
      },
      {
        q: "Is this a template or a full application?",
        a: "It's a UI template. All pages, components, and layouts are included, but there is no backend or database. You connect your own API, authentication, and data layer. All data shown is mock/static.",
      },
      {
        q: "Which frameworks and libraries does it use?",
        a: "Next.js 16 App Router, Tailwind CSS v4, shadcn/ui v4 (new-york), TypeScript strict, Recharts for charts, Lucide for icons, and Yarn 4 for package management.",
      },
      {
        q: "Does it support dark mode?",
        a: "Yes — dark and light mode are fully supported via next-themes. The toggle is accessible from the topbar on every page. Six OKLCH color themes are also included.",
      },
      {
        q: "How many pages are included?",
        a: "Over 134 pages — spanning 5 dashboard variants, e-commerce, invoices, kanban, blog, mail, chat, calendar, maps, 55+ component showcase pages, a full landing site, and more.",
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    items: [
      {
        q: "Is there a free trial?",
        a: "Every paid plan comes with a 14-day free trial. No credit card is required to start — you'll only be billed if you choose to continue after the trial period.",
      },
      {
        q: "Can I switch plans at any time?",
        a: "Yes. Upgrade or downgrade at any time from your account settings. Changes take effect immediately and any billing difference is prorated on your next invoice.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual enterprise contracts.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Absolutely. No lock-in contracts or cancellation fees. Cancel anytime from your account settings — your plan stays active until the end of the current billing period.",
      },
      {
        q: "Do you offer discounts for non-profits or students?",
        a: "Yes — 50% off for verified non-profit organisations and students. Contact our support team with proof of eligibility to apply.",
      },
      {
        q: "What happens to my data if I downgrade?",
        a: "Your data is always safe. If you exceed the limits of your new plan, you'll have 30 days to make adjustments before anything is restricted.",
      },
      {
        q: "Is there a limit on API calls?",
        a: "Each plan has a monthly API call limit. If you exceed your limit, requests are rate-limited rather than blocked. You can upgrade or purchase add-on credits at any time.",
      },
      {
        q: "Do you offer enterprise contracts and custom SLAs?",
        a: "Yes. Our Enterprise plan includes custom contracts, dedicated SLAs, and a named Customer Success Manager. Contact our sales team to discuss your requirements.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    icon: Code2,
    items: [
      {
        q: "What version of Node.js is required?",
        a: "Node.js 20 or higher. We recommend the latest LTS release. Yarn 4 is the package manager — npm and pnpm are not officially tested.",
      },
      {
        q: "Can I use this with my existing backend?",
        a: "Yes. The template is entirely frontend — replace the mock data with your own API calls. It works with any REST or GraphQL backend, or Next.js API routes.",
      },
      {
        q: "Is TypeScript required?",
        a: "The template is written in TypeScript strict mode throughout. While you could remove types, we strongly recommend keeping TypeScript to benefit from safety across all 134 pages.",
      },
      {
        q: "How do I add a new page?",
        a: "Create a file at app/(admin)/your-page/page.tsx — the sidebar and topbar layout apply automatically via layout.tsx. To add it to the sidebar nav, edit NAV_GROUPS in lib/constants.ts.",
      },
      {
        q: "Can I customise the color themes?",
        a: "Yes. Six OKLCH presets are included (Zinc, Blue, Violet, Rose, Orange, Emerald). Modify them in lib/themes.ts and app/globals.css. Each theme only changes accent tokens — backgrounds stay neutral.",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Privacy",
    icon: ShieldCheck,
    items: [
      {
        q: "How is user data handled?",
        a: "This is a UI template — it contains no backend, database, or data collection. Any authentication and data handling is implemented by you when integrating your own backend.",
      },
      {
        q: "Does it include authentication?",
        a: "Auth UI pages are included (login, register, forgot password) but no auth logic. Integrate your own provider — NextAuth.js, Clerk, Supabase Auth, or a custom JWT flow.",
      },
      {
        q: "Is the code audited for security vulnerabilities?",
        a: "The template uses only well-maintained, widely-adopted libraries. Dependencies are kept current with each release. Always audit your own auth and data-handling code before shipping to production.",
      },
      {
        q: "What is the license?",
        a: "The template is commercially licensed. You may use it in client projects and your own SaaS products, but you may not resell or redistribute the source code as a template.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: UserCircle,
    items: [
      {
        q: "How do I get support?",
        a: "Support is provided via the item comments section on CodeCanyon. We typically respond within 1 business day. Include your Order ID and a description of the problem for faster help.",
      },
      {
        q: "Are future updates included?",
        a: "Yes — all future updates are included with your purchase at no extra cost. Major updates with significant new pages and components are released periodically.",
      },
      {
        q: "Can I use this for client projects?",
        a: "Yes. A regular license covers one end product. If you're building a SaaS that charges end users, you'll need the Extended License. See the CodeCanyon license terms for full details.",
      },
      {
        q: "Do you offer custom development?",
        a: "We occasionally take on custom work for teams that need additional pages, integrations, or white-label builds. Reach out via the CodeCanyon profile to discuss your requirements.",
      },
    ],
  },
]
