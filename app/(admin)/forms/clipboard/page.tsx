"use client"

import * as React from "react"
import { Copy, Scissors, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const CONTAINER_TEXT =
  "Lorem ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá, depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga."

const useCopy = () => {
  const [copied, setCopied] = React.useState(false)

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return { copied, copy }
}

// ─── Demo 1: Copy from TextField ──────────────────────────────────────────────
const CopyFromTextField = () => {
  const [value, setValue] = React.useState("https://berrydashboard.com/")
  const { copied, copy } = useCopy()

  return (
    <div className="space-y-2">
      <Label>Website</Label>
      <div className="relative flex items-center">
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          className="pr-10"
          placeholder="Enter a URL…"
        />
        <button
          onClick={() => copy(value)}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

// ─── Demo 2: Copy from Textarea ───────────────────────────────────────────────
const CopyFromTextarea = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  )
  const { copy } = useCopy()
  const [cutDone, setCutDone] = React.useState(false)

  const handleCut = () => {
    copy(value)
    setValue("")
    setCutDone(true)
    setTimeout(() => setCutDone(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>Copy text</Label>
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => copy(value)} className="gap-1.5">
          <Copy className="h-3.5 w-3.5" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handleCut} className="gap-1.5">
          <Scissors className="h-3.5 w-3.5" />
          {cutDone ? "Cut!" : "Cut"}
        </Button>
      </div>
    </div>
  )
}

// ─── Demo 3: Copy from Container ─────────────────────────────────────────────
const CopyFromContainer = () => {
  const { copied, copy } = useCopy()

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold">Copy text</span>
        <button
          onClick={() => copy(CONTAINER_TEXT)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy container text"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <Separator />
      <p className="px-4 py-4 text-sm text-muted-foreground leading-relaxed">{CONTAINER_TEXT}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const ClipboardPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Clipboard</h2>
      <p className="text-muted-foreground">
        Copy and cut text to the clipboard from inputs, textareas, and arbitrary content.
      </p>
    </div>

    {/* TextField */}
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Copy from TextField</h3>
        <p className="text-muted-foreground text-sm">
          An icon button inside the input copies its current value to the clipboard.
        </p>
      </div>
      <Separator />
      <CopyFromTextField />
    </div>

    {/* Textarea */}
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Copy from Textarea</h3>
        <p className="text-muted-foreground text-sm">
          Copy preserves the text; Cut copies and clears the field.
        </p>
      </div>
      <Separator />
      <CopyFromTextarea />
    </div>

    {/* Container */}
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Copy from Container</h3>
        <p className="text-muted-foreground text-sm">
          A copy button in the card header copies the entire block of static text.
        </p>
      </div>
      <Separator />
      <CopyFromContainer />
    </div>
  </div>
)

export default ClipboardPage
