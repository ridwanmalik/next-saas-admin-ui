"use client"

import { InfoIcon } from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { Autocomplete, type AutocompleteOption } from "./_components/autocomplete"

// ─── Demo 1: Async Search ────────────────────────────────────────────────────

const AsyncExample = () => {
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState<AutocompleteOption[]>([])
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState("")
  const abortRef = React.useRef<AbortController | null>(null)

  const handleInputChange = async (val: string) => {
    setInputValue(val)
    abortRef.current?.abort()
    if (!val.trim()) { setOptions([]); setLoading(false); return }
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(val)}&limit=8`,
        { signal: controller.signal }
      )
      const data = await res.json()
      setOptions(data.products.map((p: { id: number; title: string }) => ({ value: String(p.id), label: p.title })))
    } catch {
      if (!controller.signal.aborted) setOptions([])
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      onValueChange={setValue}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      loading={loading}
      placeholder="Search products..."
      emptyMessage="No products found."
      className="w-full max-w-xs"
    />
  )
}

// ─── Demo 2: Creatable ───────────────────────────────────────────────────────

const INITIAL_TAGS: AutocompleteOption[] = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwind", label: "Tailwind" },
  { value: "typescript", label: "TypeScript" },
]

const CreatableExample = () => {
  const [options, setOptions] = React.useState<AutocompleteOption[]>(INITIAL_TAGS)
  const [value, setValue] = React.useState("")

  const handleValueChange = (val: string) => {
    setValue(val)
    const alreadyExists = options.some(o => o.value === val || o.label === val)
    if (!alreadyExists && val) {
      const newOption = { value: val.toLowerCase().replace(/\s+/g, "-"), label: val }
      setOptions(prev => [...prev, newOption])
    }
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      onValueChange={handleValueChange}
      creatable
      placeholder="Search or create a tag..."
      emptyMessage="No tags found."
      className="w-full max-w-xs"
    />
  )
}

// ─── Demo 3: Async + Creatable ───────────────────────────────────────────────

const AsyncCreatableExample = () => {
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState<AutocompleteOption[]>([])
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState("")
  const abortRef = React.useRef<AbortController | null>(null)

  const handleInputChange = async (val: string) => {
    setInputValue(val)
    abortRef.current?.abort()
    if (!val.trim()) { setOptions([]); setLoading(false); return }
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(val)}&limit=8`,
        { signal: controller.signal }
      )
      const data = await res.json()
      setOptions(data.products.map((p: { id: number; title: string }) => ({ value: String(p.id), label: p.title })))
    } catch {
      if (!controller.signal.aborted) setOptions([])
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  const handleValueChange = (val: string) => {
    setValue(val)
    const isNewOption = !options.some(o => o.value === val || o.label === val)
    if (isNewOption && val) {
      setOptions(prev => [...prev, { value: val.toLowerCase().replace(/\s+/g, "-"), label: val }])
    }
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      onValueChange={handleValueChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      loading={loading}
      creatable
      placeholder="Search or create a product..."
      emptyMessage="No products found."
      className="w-full max-w-xs"
    />
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

const AutocompletePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Autocomplete</h2>
      <p className="text-muted-foreground">Async search and creatable options built on top of Combobox primitives.</p>
    </div>

    {/* Callout */}
    <div className="bg-muted/50 text-muted-foreground flex gap-3 rounded-lg border p-4 text-sm">
      <InfoIcon className="mt-0.5 size-4 shrink-0" />
      <p>
        For most use cases — static lists, multi-select, groups, custom items — use the{" "}
        <Link href="/components/combobox" className="text-foreground font-medium underline underline-offset-4">
          Combobox
        </Link>{" "}
        component instead. This Autocomplete component covers the two patterns Combobox doesn&apos;t handle out of the
        box: async API search and creatable options.
      </p>
    </div>

    {/* Demo 1 */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Async Search</h3>
        <p className="text-muted-foreground text-sm">
          Fetches suggestions from an API as you type. Pass{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">loading</code> to show a spinner and disable
          client-side re-filtering while results load.
        </p>
      </div>
      <AsyncExample />
    </div>

    {/* Demo 2 */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Creatable</h3>
        <p className="text-muted-foreground text-sm">
          When no option matches the typed value, a{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">Create &ldquo;X&rdquo;</code> option appears. Pass{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">creatable</code> to enable it.
        </p>
      </div>
      <CreatableExample />
    </div>

    {/* Demo 3 */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Async + Creatable</h3>
        <p className="text-muted-foreground text-sm">
          Combine both: fetch suggestions server-side while still allowing the user to add values that don&apos;t exist
          in the dataset.
        </p>
      </div>
      <AsyncCreatableExample />
    </div>
  </div>
)

export default AutocompletePage
