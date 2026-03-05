# Component Showcase Sync

Sync `app/(admin)/components/[slug]/page.tsx` ShowCards to match shadcn docs exactly.

## Steps per component

1. `browser_navigate` URL → snapshot loads page + all refs in one shot
2. Click hero "View Code" (first button before Installation), then each example "View Code" sequentially.
3. **First "View Code" button is the hero/default example** at the top of the page (before Installation). Click it — render it as a `<ShowCard>` with no title (title is optional). Then click each example "View Code" under the Examples heading.
4. Read current page.tsx; rewrite with new examples
5. Add new lucide icons to existing import block (no `Icon` suffix)
6. **Immediately after writing the page, mark `[x]` in the list below — do not batch updates**

## Rules

- No `className="size-4"` on icons inside shadcn components (they handle sizing internally)
- Width: keep `max-w-md` / `max-w-sm` if shadcn adds it; add to all variants of same component for consistency
- Separate named data array per example (not shared across examples with different data)
- `next/image` for Aspect Ratio: `fill` prop, `avatar.vercel.sh` already in remotePatterns
- Radix DropdownMenu typeahead workaround: `e.stopPropagation()` on non-arrow keys in inputs inside DropdownMenuContent

## Components

- [x] Alert — `https://ui.shadcn.com/docs/components/radix/alert`
- [x] Accordion — `https://ui.shadcn.com/docs/components/radix/accordion`
- [x] Alert Dialog — `https://ui.shadcn.com/docs/components/radix/alert-dialog`
- [x] Aspect Ratio — `https://ui.shadcn.com/docs/components/radix/aspect-ratio`
- [x] Avatar — `https://ui.shadcn.com/docs/components/radix/avatar`
- [x] Badge — `https://ui.shadcn.com/docs/components/radix/badge`
- [x] Breadcrumb — `https://ui.shadcn.com/docs/components/radix/breadcrumb`
- [x] Button — `https://ui.shadcn.com/docs/components/radix/button`
- [x] Button Group — `https://ui.shadcn.com/docs/components/radix/button-group`
- [x] Kbd — `https://ui.shadcn.com/docs/components/radix/kbd`
- [x] Calendar — `https://ui.shadcn.com/docs/components/radix/calendar`
- [x] Card — `https://ui.shadcn.com/docs/components/radix/card`
- [x] Carousel — `https://ui.shadcn.com/docs/components/radix/carousel`
- [x] Chart — `https://ui.shadcn.com/docs/components/radix/chart`
- [x] Checkbox — `https://ui.shadcn.com/docs/components/radix/checkbox`
- [x] Collapsible — `https://ui.shadcn.com/docs/components/radix/collapsible`
- [x] Combobox — `https://ui.shadcn.com/docs/components/radix/combobox`
- [x] Command — `https://ui.shadcn.com/docs/components/radix/command`
- [x] Context Menu — `https://ui.shadcn.com/docs/components/radix/context-menu`
- [x] Data Table — `https://ui.shadcn.com/docs/components/data-table`
- [x] Date Picker — `https://ui.shadcn.com/docs/components/date-picker`
- [x] Dialog — `https://ui.shadcn.com/docs/components/radix/dialog`
- [x] Direction — `https://ui.shadcn.com/docs/components/direction`
- [x] Drawer — `https://ui.shadcn.com/docs/components/radix/drawer`
- [x] Dropdown Menu — `https://ui.shadcn.com/docs/components/radix/dropdown-menu`
- [x] Empty — `https://ui.shadcn.com/docs/components/radix/empty`
- [ ] Field — `https://ui.shadcn.com/docs/components/radix/field`
- [ ] Hover Card — `https://ui.shadcn.com/docs/components/radix/hover-card`
- [ ] Input — `https://ui.shadcn.com/docs/components/radix/input`
- [ ] Input Group — `https://ui.shadcn.com/docs/components/radix/input-group`
- [ ] Input OTP — `https://ui.shadcn.com/docs/components/radix/input-otp`
- [ ] Item — `https://ui.shadcn.com/docs/components/radix/item`
- [ ] Label — `https://ui.shadcn.com/docs/components/radix/label`
- [ ] Menubar — `https://ui.shadcn.com/docs/components/radix/menubar`
- [ ] Native Select — `https://ui.shadcn.com/docs/components/radix/native-select`
- [ ] Navigation Menu — `https://ui.shadcn.com/docs/components/radix/navigation-menu`
- [ ] Pagination — `https://ui.shadcn.com/docs/components/radix/pagination`
- [ ] Popover — `https://ui.shadcn.com/docs/components/radix/popover`
- [ ] Progress — `https://ui.shadcn.com/docs/components/radix/progress`
- [ ] Radio Group — `https://ui.shadcn.com/docs/components/radix/radio-group`
- [ ] Resizable — `https://ui.shadcn.com/docs/components/radix/resizable`
- [ ] Scroll Area — `https://ui.shadcn.com/docs/components/radix/scroll-area`
- [ ] Select — `https://ui.shadcn.com/docs/components/radix/select`
- [ ] Separator — `https://ui.shadcn.com/docs/components/radix/separator`
- [ ] Sheet — `https://ui.shadcn.com/docs/components/radix/sheet`
- [ ] Sidebar — `https://ui.shadcn.com/docs/components/sidebar`
- [ ] Skeleton — `https://ui.shadcn.com/docs/components/radix/skeleton`
- [ ] Slider — `https://ui.shadcn.com/docs/components/radix/slider`
- [ ] Sonner — `https://ui.shadcn.com/docs/components/radix/sonner`
- [ ] Spinner — `https://ui.shadcn.com/docs/components/radix/spinner`
- [ ] Switch — `https://ui.shadcn.com/docs/components/radix/switch`
- [ ] Table — `https://ui.shadcn.com/docs/components/radix/table`
- [ ] Tabs — `https://ui.shadcn.com/docs/components/radix/tabs`
- [ ] Textarea — `https://ui.shadcn.com/docs/components/radix/textarea`
- [ ] Toast — `https://ui.shadcn.com/docs/components/toast`
- [ ] Toggle — `https://ui.shadcn.com/docs/components/radix/toggle`
- [ ] Toggle Group — `https://ui.shadcn.com/docs/components/radix/toggle-group`
- [ ] Tooltip — `https://ui.shadcn.com/docs/components/radix/tooltip`
- [ ] Typography — `https://ui.shadcn.com/docs/components/radix/typography`

## Playwright browsing log

- button-group: navigated + read snapshot, clicked View Code for Popover (e802), Dropdown Menu (e755), Select (e780)
