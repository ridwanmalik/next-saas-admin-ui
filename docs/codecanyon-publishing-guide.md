# CodeCanyon Publishing Guide: Next.js SaaS Admin UI Template

A comprehensive step-by-step preparation and submission checklist based on current Envato requirements and author community experience (as of early 2026).

---

## Important Context: Marketplace Health Warning

Before investing significant time, understand the current landscape:

- CodeCanyon sales **dropped ~70% between 2018 and 2023**
- Shutterstock acquired Envato in May 2024 for $245M — marketplace authors were not mentioned in investor materials
- Established Power Elite authors are quietly going non-exclusive and building their own storefronts
- **Recommendation:** Treat CodeCanyon as one channel, not your primary business. Build your own sales page in parallel (Gumroad, Lemon Squeezy, or your own site via Paddle/Stripe).

That said, CodeCanyon still has significant organic traffic and brand recognition. Next.js templates **are actively accepted** (confirmed: multiple Next.js 14/15/16 templates approved in 2024–2025).

---

## Part 1: Account Setup

### 1.1 Create an Envato Author Account

1. Go to [author.envato.com](https://author.envato.com)
2. Sign up for a free account — no upfront cost to register
3. During signup, choose your **exclusivity status** (see Part 5 for implications)
4. Complete your author profile: photo, bio, country, tax information
5. Set up payout method (PayPal, Payoneer, or bank transfer)
6. Submit tax forms (W-8BEN for non-US authors, W-9 for US authors) — required before first payout

### 1.2 Exclusivity Decision (Make This Early)

| Type | Author Fee | You Keep | Condition |
|---|---|---|---|
| Exclusive | 12.5% – 37.5% (tiered) | 62.5% – 87.5% | Cannot sell this item anywhere else |
| Non-Exclusive | 55% flat | 45% | Can sell on your own site, Gumroad, etc. |

**Tier progression for exclusive authors** (based on all-time earnings):
- $0 – $3,749: keep 62.5%
- $3,750 – $11,249: keep 65%
- $11,250 – $37,499: keep 70%
- $37,500+: keep 75%–87.5%

**Recommendation for a new template:** Start **non-exclusive**. The 45% take is lower initially, but you retain the right to sell on your own channels, which matters more as CodeCanyon's traffic declines. You can switch to exclusive later if sales justify it.

---

## Part 2: File Structure & Package Requirements

### 2.1 What Goes Into the Main ZIP

The uploadable package must be a single `.zip` file containing these folders (do NOT dump everything in root):

```
your-template-name.zip
├── main-files/
│   ├── (your full Next.js source code)
│   ├── package.json
│   ├── yarn.lock
│   ├── .env.example          ← never include .env with real keys
│   ├── next.config.ts
│   └── ...all source files
├── documentation/
│   ├── index.html            ← or documentation.pdf
│   └── assets/               ← screenshots, diagrams used in docs
├── changelog.txt             ← version history in plain text
└── readme.txt                ← quick-start in plain text
```

### 2.2 What to Exclude from the ZIP

- `node_modules/` — never include
- `.env` with real credentials
- `.next/` build output
- Any API keys, secrets, or tokens
- Unused assets / placeholder files

### 2.3 Code Quality Checklist

- [ ] No inline styles (all styling via Tailwind classes or CSS files)
- [ ] TypeScript strict mode — no `any` types where avoidable
- [ ] No console.log statements left in production code
- [ ] ESLint passes with zero errors
- [ ] All imports resolve correctly (no broken paths)
- [ ] `.env.example` documents every required env variable
- [ ] Code follows consistent formatting (Prettier configured)
- [ ] No hardcoded URLs, API endpoints, or credentials

---

## Part 3: Required Documentation

Documentation is **mandatory**. Missing or poor documentation is the single most common soft-reject reason.

### 3.1 documentation/index.html Structure

```
1. Introduction
   - What the template is
   - Tech stack (Next.js 16, Tailwind v4, shadcn/ui, TypeScript)
   - Browser/Node.js requirements

2. Getting Started
   - Prerequisites (Node 20+, Yarn 4)
   - Installation steps (yarn install → yarn dev)
   - Environment variables setup (.env.example walkthrough)

3. Folder Structure
   - Annotated tree of key directories
   - Where to add new pages (app/(admin)/your-page/page.tsx)
   - Where to add nav items (lib/constants.ts NAV_GROUPS)

4. Customization
   - Color themes (6 OKLCH presets, how to switch)
   - Adding/removing sidebar nav items
   - Typography / font changes

5. Pages Reference
   - List all included pages with screenshots
   - Dashboard, Users, Analytics, Billing, Reports, Notifications, Security, Settings, Forms/*, Components/*

6. Components Reference
   - DataTable, StatCard, Sparkline, EmptyState, ErrorState, etc.
   - Props table for each component

7. Deployment
   - Vercel (recommended)
   - Self-hosted Node.js
   - Docker (if applicable)

8. Credits
   - List all third-party libraries and their licenses
   - shadcn/ui, Recharts, Lucide, etc.

9. Support
   - How to contact you (Envato profile comments)
   - What support covers vs. does not cover
```

### 3.2 changelog.txt Format

```
Version 1.0.0 - March 2026
- Initial release
```

(Update this with every item update you push post-approval.)

### 3.3 readme.txt (Short Quick-Start)

Plain text, 1 page max:
- Item name, version, author
- Installation: `yarn install && yarn dev`
- Link to full documentation folder
- Support contact

---

## Part 4: Preview Assets

These are what buyers see on the marketplace listing — they directly drive sales and are evaluated during review.

### 4.1 Required Preview Images

| Asset | Dimensions | Notes |
|---|---|---|
| Main preview / thumbnail | 590 × 300 px (min) | Shown in search results |
| Screenshots | 1170 px wide | As many as needed |
| Cover image | 2340 × 1560 px | Used for featured/promoted slots |

- Use high-quality mockups (browser frame screenshots)
- Show multiple pages: dashboard, data table, charts, forms, dark mode
- No watermarks on preview images (Envato auto-watermarks)
- Thumbnails are auto-generated from your main preview

### 4.2 Live Demo (Strongly Recommended / Practically Required)

A working live demo is not technically mandatory but is **effectively required** in practice — reviewers check it, and buyers won't purchase without it.

- Deploy to Vercel: `vercel --prod`
- Demo URL must load within ~5 seconds (reviewer patience is low)
- All navigation must work — no broken routes or 404s
- Use realistic mock data (no "Lorem Ipsum" in data tables)
- Demo should showcase: all page types, dark/light mode toggle, color theme switcher, responsive layout

---

## Part 5: Submission Process

### 5.1 Item Upload Steps

1. Log in to your author dashboard at `codecanyon.net`
2. Click **"Upload"** → select category: **JavaScript → Application**
   (or: JavaScript → UI Templates — choose what best fits)
3. Upload your main `.zip` file
4. Add item title, tags (max 15), short description, and long description
5. Upload preview images
6. Set your price (see Part 6)
7. Add live demo URL
8. Submit for review

### 5.2 Choosing the Right Category

For a Next.js SaaS Admin UI:
- **Primary:** JavaScript → Application
- **Alternative:** JavaScript → UI Templates

Check existing approved Next.js admin templates (`codecanyon.net/search/nextjs+admin`) to see which category they used.

### 5.3 Writing a Strong Item Description

- Lead with the value proposition ("Production-ready SaaS admin dashboard built with Next.js 16 App Router")
- List all included pages with count
- List all features with bullet points
- Mention tech stack prominently (buyers search for these)
- Include a features table (HTML is supported in descriptions)
- End with support/update policy statement

---

## Part 6: Pricing

- You set your own price (Author Driven Pricing)
- Comparable Next.js admin templates on CodeCanyon: **$19 – $49**
- Recommended starting price: **$29** for a feature-rich template
- Do not underprice to undercut competitors — Envato discourages this and buyers associate low price with low quality
- You can adjust pricing after approval

---

## Part 7: Review Process

### 7.1 Timeline

- Initial review: typically **5–20 business days** for new authors
- Established authors: sometimes faster
- Check `forums.envato.com` for current review queue times

### 7.2 Soft Reject vs. Hard Reject

**Soft Reject** — Item is "almost ready." You receive specific feedback and can fix and resubmit.
- Common soft reject reasons for JS/React templates:
  - Demo URL not working or slow
  - Documentation missing or too thin
  - `node_modules` or `.next` included in ZIP
  - Broken links in the live demo
  - Missing or incorrect credits section
  - Inline styles instead of stylesheet classes
  - Console errors in the browser on demo

**Hard Reject** — Item cannot be resubmitted (that version). Reasons include:
  - Design quality not at commercial premium level
  - Too similar to existing items (not differentiated enough)
  - Fundamental code quality issues
  - Item not commercially viable / insufficient market demand
  - Policy violations

### 7.3 Avoiding Rejection: Pre-Submission Checklist

- [ ] Live demo is deployed and all routes work
- [ ] Zero browser console errors on demo
- [ ] Documentation is complete (installation through deployment)
- [ ] No `node_modules`, `.next`, or `.env` in ZIP
- [ ] All external assets are properly licensed (fonts, icons, images)
- [ ] Credits section lists all third-party dependencies
- [ ] TypeScript compiles with no errors (`yarn tsc --noEmit`)
- [ ] ESLint passes (`yarn lint`)
- [ ] Template is visually distinct from top sellers
- [ ] Responsive design verified on mobile/tablet
- [ ] Dark and light mode both work correctly
- [ ] All 6 color themes work

---

## Part 8: Envato Elements vs. CodeCanyon

| Factor | CodeCanyon | Envato Elements |
|---|---|---|
| Revenue model | Per-sale (you set price) | Subscriber pool share (~50% of net) |
| Earnings per download | $13–$44 (depending on price/tier) | $0.50–$5 typically (highly variable) |
| Buyer intent | High (paying per item) | Low (subscription downloaders) |
| Exposure | Lower (marketplace traffic) | Higher (massive subscriber base) |
| Listing on Elements | Not automatic — separate approval | Separate author program |
| Control | Author sets price and terms | Envato controls exposure/earnings |

**Verdict:** CodeCanyon is better for premium, higher-priced items where you want per-sale revenue. Envato Elements volume can be high but per-unit earnings are very low. Neither should be your only channel.

---

## Part 9: Alternatives to Consider in Parallel

Given CodeCanyon's trajectory post-Shutterstock acquisition, also list on:

| Platform | Notes |
|---|---|
| **Gumroad** | Simple, 10% fee, great for developers |
| **Lemon Squeezy** | VAT-compliant, subscription support, 5% + $0.50/sale |
| **Your own site** | Zero fees, full control — use Paddle or Stripe |
| **GitHub Sponsors / Polar** | If you also offer an open-source version |

---

## Quick Reference: Submission Checklist

### Before You Start
- [ ] Envato author account created
- [ ] Tax form submitted (W-8BEN / W-9)
- [ ] Exclusivity decision made

### Package
- [ ] Main ZIP has correct folder structure (no root-level dump)
- [ ] `node_modules/`, `.next/`, `.env` excluded
- [ ] `.env.example` included with all variables documented
- [ ] Changelog.txt written
- [ ] Readme.txt written

### Documentation
- [ ] Full HTML documentation in `documentation/index.html`
- [ ] Installation guide written for beginners
- [ ] All components documented with props tables
- [ ] All pages listed with screenshots
- [ ] Credits section complete

### Demo
- [ ] Live demo deployed (Vercel recommended)
- [ ] All routes functional
- [ ] No console errors
- [ ] Realistic mock data throughout
- [ ] Dark/light mode toggle works
- [ ] All 6 color themes work
- [ ] Mobile responsive

### Preview Assets
- [ ] Main preview image (590 × 300 px minimum)
- [ ] Multiple screenshots showing key pages
- [ ] No broken or placeholder images

### Code Quality
- [ ] `yarn tsc --noEmit` passes
- [ ] `yarn lint` passes (zero errors)
- [ ] No hardcoded credentials
- [ ] Consistent code style throughout

### Listing
- [ ] Strong item title with keywords (Next.js, Admin, Dashboard, SaaS)
- [ ] Tags filled (15 max) — use: nextjs, react, admin-dashboard, saas, tailwind, typescript, shadcn, dark-mode, etc.
- [ ] Description written with features table and tech stack
- [ ] Price set ($29 recommended)
- [ ] Live demo URL added

---

## Part 10: Current Project Gap Analysis

What this project has vs. what's needed for submission right now:

### ✅ Ready
- Next.js 16 App Router with full page set (134 pages audited & clean)
- TypeScript strict mode throughout
- Tailwind v4 + shadcn/ui v4 — modern, maintainable stack
- Dark/light mode + 6 color themes working
- Fully responsive layout
- All mock data (no real API calls or credentials)
- Existing docs in `docs/` folder (customization, getting-started, project-structure)

### ❌ Missing / Needs Action

| Item | What's Needed | Priority |
|---|---|---|
| `.env.example` | Create at project root — document any env vars | High |
| `documentation/index.html` | Full HTML doc (expand existing `docs/` content into Envato format) | High |
| `changelog.txt` | Plain text at project root: `Version 1.0.0 - March 2026 / Initial release` | High |
| `readme.txt` | Plain text quick-start at project root | High |
| Live demo | Deploy to Vercel, verify all 134 pages/routes load | High |
| Preview images | Browser mockup screenshots: dashboard, tables, charts, dark mode, mobile | High |
| `yarn lint` pass | Run `yarn lint` and fix any ESLint errors before submission | Medium |
| `yarn tsc --noEmit` pass | Confirm TypeScript compiles clean | Medium |
| No console.log | Grep for leftover `console.log` statements | Medium |
| Item listing copy | Write item title, tags (15), description with features table | Medium |

### Suggested Order of Work

1. `yarn lint` + `yarn tsc --noEmit` — fix any errors (do this first, cheapest)
2. Create `.env.example`, `changelog.txt`, `readme.txt` (30 min)
3. Build `documentation/index.html` from existing `docs/` files (2–4 hours)
4. Deploy live demo to Vercel and verify all routes (1–2 hours)
5. Take screenshots for preview assets (1–2 hours)
6. Create Envato author account + tax form while demo is being verified
7. Build the submission ZIP and upload

---

## Sources Consulted

- [Code Item Preparation & Technical Requirements – Envato](https://help.author.envato.com/hc/en-us/articles/360000471583-Code-Item-Preparation-Technical-Requirements)
- [Common Rejection Factors for Code Items – Envato](https://help.author.envato.com/hc/en-us/articles/360000536823-Common-Rejection-Factors-for-Code-Items)
- [Introduction to Earnings – Envato](https://help.author.envato.com/hc/en-us/articles/360000472943-Introduction-to-Earnings)
- [Item Presentation Requirements – Envato](https://help.author.envato.com/hc/en-us/articles/360000424863-Item-Presentation-Requirements)
- [CodeCanyon in 2026: Is the World's Biggest Code Marketplace Already Dead? – Medium](https://medium.com/write-a-catalyst/codecanyon-in-2026-is-the-worlds-biggest-code-marketplace-already-dead-52fbba799295)
- [ThemeForest Rejections: Types and Reasons – Upqode](https://upqode.com/themeforest-rejections-types-reasons/)
- [Collection of Soft Reject Reasons – GitHub/robertbiswas](https://github.com/robertbiswas/Collection-of-Soft-Reject-Reasons-HTML-Template-for-Themeforest/blob/master/html-soft-reject-reasons.md)
- [Envato/Themeforest Cons and Alternatives 2026 – WPIndigo](https://wpindigo.com/never-buy-sell-envato-themeforest/)
- [Is CodeCanyon a Good Place to Sell? – Freemius](https://freemius.com/blog/codecanyon-sell-premium-plugin/)
