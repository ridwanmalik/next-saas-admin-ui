"use client"

import { useState, useMemo } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Columns3,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

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
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-8 h-8 text-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto shrink-0">
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
