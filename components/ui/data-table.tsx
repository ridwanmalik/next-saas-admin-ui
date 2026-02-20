"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Columns3,
  ListFilter,
  Search,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ─── MultiSelectFilter ────────────────────────────────────────────────────────

export interface MultiSelectOption {
  value: string
  label: string
  count?: number
}

export interface MultiSelectFilterProps {
  label: string
  options: MultiSelectOption[]
  value: Set<string>
  onChange: (next: Set<string>) => void
}

export function MultiSelectFilter({ label, options, value, onChange }: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the search input every time the dropdown opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])

  const toggle = (optValue: string) => {
    const next = new Set(value)
    if (next.has(optValue)) next.delete(optValue)
    else next.add(optValue)
    onChange(next)
  }

  const visible = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  )

  // Reset highlight to first item whenever the filtered list changes
  useEffect(() => { setActiveIndex(0) }, [search])

  const isActive = value.size > 0
  const activeLabels = options.filter(opt => value.has(opt.value)).map(opt => opt.label)
  const buttonLabel = isActive ? activeLabels.join(", ") : label

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); e.stopPropagation()
        setActiveIndex(i => Math.min(i + 1, visible.length - 1))
        break
      case "ArrowUp":
        e.preventDefault(); e.stopPropagation()
        setActiveIndex(i => Math.max(i - 1, 0))
        break
      case "Enter":
        e.preventDefault(); e.stopPropagation()
        if (visible[activeIndex]) toggle(visible[activeIndex].value)
        break
      default:
        e.stopPropagation()
    }
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={o => {
        setOpen(o)
        if (!o) { setSearch(""); setActiveIndex(0) }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs font-normal",
            isActive && "border-primary/60 bg-primary/5 text-primary hover:bg-primary/10",
          )}
        >
          {isActive
            ? <X className="h-3 w-3 shrink-0" onClick={e => { e.stopPropagation(); onChange(new Set()) }} />
            : <ListFilter className="h-3 w-3 shrink-0" />
          }
          {buttonLabel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48 p-0">

        {/* Search — keeps DOM focus throughout */}
        <div className="flex items-center gap-2 px-2 py-2 border-b">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            placeholder={`Search ${label.toLowerCase()}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Items — highlight driven by activeIndex, not DOM focus */}
        <div className="py-1">
          {visible.length === 0 ? (
            <p className="px-3 py-2 text-xs text-muted-foreground">No results.</p>
          ) : (
            visible.map((opt, i) => (
              <DropdownMenuItem
                key={opt.value}
                onSelect={e => { e.preventDefault(); toggle(opt.value) }}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "gap-2.5 px-3 py-1.5",
                  i === activeIndex && "bg-accent text-accent-foreground",
                )}
              >
                <Checkbox
                  checked={value.has(opt.value)}
                  onCheckedChange={() => toggle(opt.value)}
                  className="shrink-0"
                  id={`filter-${label}-${opt.value}`}
                />
                <label htmlFor={`filter-${label}-${opt.value}`} className="flex-1 text-sm cursor-pointer">
                  {opt.label}
                </label>
                {opt.count !== undefined && (
                  <span className="tabular-nums text-xs text-muted-foreground">{opt.count}</span>
                )}
              </DropdownMenuItem>
            ))
          )}
        </div>

        {isActive && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => onChange(new Set())}
              className="justify-center text-xs text-muted-foreground py-1.5"
            >
              Clear filter
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

type HideBelow = "sm" | "md" | "lg"
type Align = "left" | "center" | "right"

export interface DataTableColumn<T> {
  key: string
  header: string
  sortable?: boolean
  align?: Align
  /** Hide this column below the given breakpoint */
  hideBelow?: HideBelow
  /** Prevent this column from being hidden via the column visibility toggle (default: true) */
  hideable?: boolean
  render?: (row: T) => React.ReactNode
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  defaultPageSize?: number
  pageSizeOptions?: number[]
  searchPlaceholder?: string
  /** Filter chips rendered left of the spacer, after the search input */
  toolbarFilters?: React.ReactNode
  /** Action buttons rendered right of the spacer, before the Columns button */
  toolbarActions?: React.ReactNode
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const HIDE: Record<HideBelow, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
}

const ALIGN: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

const getPageNumbers = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total]
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total]
  return [1, "...", current - 1, current, current + 1, "...", total]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<T extends object>({
  columns,
  data,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  searchPlaceholder = "Search...",
  toolbarFilters,
  toolbarActions,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [search, setSearch] = useState("")
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set())

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(1)
  }

  const toggleCol = (key: string) => {
    setHiddenCols(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const visibleColumns = useMemo(
    () => columns.filter(col => !hiddenCols.has(col.key)),
    [columns, hiddenCols],
  )

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return data
    return data.filter(row =>
      columns.some(col => {
        const val = (row as Record<string, unknown>)[col.key]
        return val != null && String(val).toLowerCase().includes(q)
      }),
    )
  }, [data, columns, search])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey]
      const bVal = (b as Record<string, unknown>)[sortKey]
      if (aVal == null) return 1
      if (bVal == null) return -1
      const cmp =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal))
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filteredData, sortKey, sortDir])

  const total = sortedData.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const from = (safePage - 1) * pageSize
  const to = Math.min(from + pageSize, total)
  const rows = sortedData.slice(from, to)
  const pageNums = getPageNumbers(safePage, totalPages)
  const goTo = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)))

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>

      {/* ── Toolbar ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Left: search + filter chips */}
        <div className="relative shrink-0 w-52">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-8 h-8 text-sm"
          />
        </div>

        {toolbarFilters}

        {/* Right: columns + actions */}
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0">
              <Columns3 className="h-3.5 w-3.5 mr-1.5" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs">Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map(col => {
              const isHideable = col.hideable !== false
              return (
                <DropdownMenuCheckboxItem
                  key={col.key}
                  checked={!hiddenCols.has(col.key)}
                  onCheckedChange={() => toggleCol(col.key)}
                  disabled={!isHideable}
                  className="text-sm"
                >
                  {col.header}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
          </DropdownMenu>

          {toolbarActions}
        </div>{/* end right group */}
      </div>

      {/* ── Table ─────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {visibleColumns.map(col => {
                const isSorted = sortKey === col.key
                const align = col.align ?? "left"
                return (
                  <th
                    key={col.key}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                    className={cn(
                      "px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                      ALIGN[align],
                      col.hideBelow && HIDE[col.hideBelow],
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors group",
                    )}
                  >
                    <span className={cn("inline-flex items-center gap-1.5", align === "right" && "flex-row-reverse")}>
                      {col.header}
                      {col.sortable && (
                        <span className="shrink-0">
                          {isSorted ? (
                            sortDir === "asc"
                              ? <ChevronUp className="h-3 w-3" />
                              : <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-opacity" />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  {search ? `No results for "${search}".` : "No results found."}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  {visibleColumns.map(col => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3.5",
                        ALIGN[col.align ?? "left"],
                        col.hideBelow && HIDE[col.hideBelow],
                      )}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">

        {/* Entry count */}
        <p className="text-xs text-muted-foreground shrink-0 order-2 sm:order-1">
          {total === 0
            ? "No entries"
            : `Showing ${from + 1}–${to} of ${total} entries`}
        </p>

        <div className="flex items-center justify-between sm:justify-end gap-3 order-1 sm:order-2 flex-wrap">

          {/* Page number buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline" size="icon-sm"
              onClick={() => goTo(1)} disabled={safePage === 1}
              aria-label="First page"
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline" size="icon-sm"
              onClick={() => goTo(safePage - 1)} disabled={safePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            {pageNums.map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="size-8 inline-flex items-center justify-center text-xs text-muted-foreground"
                >
                  …
                </span>
              ) : (
                <Button
                  key={p}
                  size="icon-sm"
                  variant={p === safePage ? "default" : "outline"}
                  onClick={() => goTo(p as number)}
                  aria-label={`Page ${p}`}
                  aria-current={p === safePage ? "page" : undefined}
                >
                  {p}
                </Button>
              )
            )}

            <Button
              variant="outline" size="icon-sm"
              onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline" size="icon-sm"
              onClick={() => goTo(totalPages)} disabled={safePage === totalPages}
              aria-label="Last page"
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Rows per page */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground">Rows per page</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              {pageSizeOptions.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  )
}
