/**
 * fix-arbitrary-classes.mjs
 *
 * Finds Tailwind arbitrary pixel/rem values that have canonical scale equivalents
 * and replaces them in-place across all .tsx/.ts/.css files.
 *
 * Tailwind v4 spacing scale: 1 unit = 0.25rem = 4px
 *   [Npx]  → N/4   (only if N % 4 === 0)
 *   [Nrem] → N*4   (only if N*4 is an integer)
 *
 * Usage:
 *   node scripts/fix-arbitrary-classes.mjs          # dry-run (report only)
 *   node scripts/fix-arbitrary-classes.mjs --fix    # apply replacements
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join, extname } from "path"

const FIX = process.argv.includes("--fix")
const ROOT = new URL("..", import.meta.url).pathname

// ─── Spacing utilities that use the 4px scale ─────────────────────────────────
const SPACING_PREFIXES = [
  "w", "h", "min-w", "min-h", "max-w", "max-h",
  "p", "px", "py", "pt", "pr", "pb", "pl",
  "m", "mx", "my", "mt", "mr", "mb", "ml",
  "gap", "gap-x", "gap-y",
  "space-x", "space-y",
  "top", "right", "bottom", "left",
  "inset", "inset-x", "inset-y",
  "translate-x", "translate-y",
  "scroll-mt", "scroll-mb", "scroll-ml", "scroll-mr",
  "basis", "size",
]

// Build regex: matches e.g. w-[300px] or max-w-[180px] or h-[1.5rem]
// Captures: [prefix, value, unit]
const prefixPattern = SPACING_PREFIXES
  .sort((a, b) => b.length - a.length) // longest first to avoid partial matches
  .map(p => p.replace(/-/g, "\\-"))
  .join("|")

const ARBITRARY_RE = new RegExp(
  `(?<![\\w-])(${prefixPattern})-\\[(\\d+(?:\\.\\d+)?)(px|rem)\\]`,
  "g"
)

// ─── Conversion logic ──────────────────────────────────────────────────────────
const toUnit = (value, unit) => {
  const n = parseFloat(value)
  const units = unit === "px" ? n / 4 : n * 4
  // Must be a "nice" number: integer or .5 increments are valid in Tailwind v4
  if (Number.isInteger(units) || Math.abs(units - Math.round(units * 2) / 2) < 0.001) {
    // Format: drop trailing zeros
    const formatted = units % 1 === 0 ? String(units) : String(Math.round(units * 10) / 10)
    return formatted
  }
  return null
}

// ─── File walker ───────────────────────────────────────────────────────────────
const EXTENSIONS = new Set([".tsx", ".ts", ".css", ".mdx"])
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build"])

const walkFiles = (dir) => {
  const results = []
  for (const entry of readdirSync(dir)) {
    if (IGNORE_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) results.push(...walkFiles(full))
    else if (EXTENSIONS.has(extname(entry))) results.push(full)
  }
  return results
}

// ─── Main ──────────────────────────────────────────────────────────────────────
let totalFiles = 0
let totalMatches = 0
let totalReplaced = 0

for (const file of walkFiles(ROOT)) {
  const original = readFileSync(file, "utf8")
  const matches = []
  let updated = original

  for (const match of original.matchAll(ARBITRARY_RE)) {
    const [full, prefix, value, unit] = match
    const canonical = toUnit(value, unit)
    if (!canonical) continue
    const replacement = `${prefix}-${canonical}`
    if (full === replacement) continue // already canonical (shouldn't happen)
    matches.push({ from: full, to: replacement })
  }

  if (matches.length === 0) continue

  totalFiles++
  totalMatches += matches.length

  const relPath = file.replace(ROOT, "")
  console.log(`\n${relPath}`)

  for (const { from, to } of matches) {
    console.log(`  ${from}  →  ${to}`)
    if (FIX) {
      // Replace all occurrences (global replace)
      updated = updated.replaceAll(from, to)
      totalReplaced++
    }
  }

  if (FIX && updated !== original) {
    writeFileSync(file, updated, "utf8")
  }
}

console.log("\n" + "─".repeat(60))
if (FIX) {
  console.log(`Fixed ${totalReplaced} replacements across ${totalFiles} files.`)
} else {
  console.log(`Found ${totalMatches} replaceable classes across ${totalFiles} files.`)
  console.log(`Run with --fix to apply: node scripts/fix-arbitrary-classes.mjs --fix`)
}
