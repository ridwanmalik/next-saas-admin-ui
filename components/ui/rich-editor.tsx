"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Minus,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type RichEditorVariant = "full" | "minimal" | "comment"

interface RichEditorProps {
  variant?: RichEditorVariant
  placeholder?: string
  defaultContent?: string
  readOnly?: boolean
  className?: string
}

// ─── Toolbar toggle ───────────────────────────────────────────────────────────

const ToolbarToggle = ({
  active,
  onToggle,
  disabled,
  children,
  tooltip,
}: {
  active?: boolean
  onToggle: () => void
  disabled?: boolean
  children: React.ReactNode
  tooltip?: string
}) => (
  <Toggle
    size="sm"
    pressed={active}
    onPressedChange={onToggle}
    disabled={disabled}
    title={tooltip}
    className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
  >
    {children}
  </Toggle>
)

// ─── Editor ───────────────────────────────────────────────────────────────────

export const RichEditor = ({
  variant = "full",
  placeholder = "Start writing something…",
  defaultContent,
  readOnly = false,
  className,
}: RichEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable: !readOnly,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: cn(
          "outline-none px-5 py-4",
          variant === "comment" ? "min-h-20" : "min-h-48",
        ),
      },
    },
  })

  if (!editor) return null

  const isComment = variant === "comment"
  const isFull    = variant === "full"

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>

      {/* Toolbar — hidden in read-only mode */}
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-0.5 border-b px-3 py-2 bg-muted/30">

          {/* History (full only) */}
          {isFull && (
            <>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()} title="Undo">
                <Undo2 className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()} title="Redo">
                <Redo2 className="h-3.5 w-3.5" />
              </Button>
              <Separator orientation="vertical" className="h-5 mx-1" />
            </>
          )}

          {/* Headings (full only) */}
          {isFull && (
            <>
              <ToolbarToggle active={editor.isActive("heading", { level: 1 })}
                onToggle={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} tooltip="Heading 1">
                <Heading1 className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive("heading", { level: 2 })}
                onToggle={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} tooltip="Heading 2">
                <Heading2 className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive("heading", { level: 3 })}
                onToggle={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} tooltip="Heading 3">
                <Heading3 className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <Separator orientation="vertical" className="h-5 mx-1" />
            </>
          )}

          {/* Inline formatting */}
          <ToolbarToggle active={editor.isActive("bold")}
            onToggle={() => editor.chain().focus().toggleBold().run()} tooltip="Bold">
            <Bold className="h-3.5 w-3.5" />
          </ToolbarToggle>
          <ToolbarToggle active={editor.isActive("italic")}
            onToggle={() => editor.chain().focus().toggleItalic().run()} tooltip="Italic">
            <Italic className="h-3.5 w-3.5" />
          </ToolbarToggle>
          {!isComment && (
            <>
              <ToolbarToggle active={editor.isActive("underline")}
                onToggle={() => editor.chain().focus().toggleUnderline().run()} tooltip="Underline">
                <UnderlineIcon className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive("strike")}
                onToggle={() => editor.chain().focus().toggleStrike().run()} tooltip="Strikethrough">
                <Strikethrough className="h-3.5 w-3.5" />
              </ToolbarToggle>
            </>
          )}
          {isFull && (
            <>
              <ToolbarToggle active={editor.isActive("highlight")}
                onToggle={() => editor.chain().focus().toggleHighlight().run()} tooltip="Highlight">
                <Highlighter className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive("code")}
                onToggle={() => editor.chain().focus().toggleCode().run()} tooltip="Inline code">
                <Code className="h-3.5 w-3.5" />
              </ToolbarToggle>
            </>
          )}

          {/* Alignment (full only) */}
          {isFull && (
            <>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <ToolbarToggle active={editor.isActive({ textAlign: "left" })}
                onToggle={() => editor.chain().focus().setTextAlign("left").run()} tooltip="Align left">
                <AlignLeft className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive({ textAlign: "center" })}
                onToggle={() => editor.chain().focus().setTextAlign("center").run()} tooltip="Align center">
                <AlignCenter className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive({ textAlign: "right" })}
                onToggle={() => editor.chain().focus().setTextAlign("right").run()} tooltip="Align right">
                <AlignRight className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive({ textAlign: "justify" })}
                onToggle={() => editor.chain().focus().setTextAlign("justify").run()} tooltip="Justify">
                <AlignJustify className="h-3.5 w-3.5" />
              </ToolbarToggle>
            </>
          )}

          {/* Lists */}
          <Separator orientation="vertical" className="h-5 mx-1" />
          <ToolbarToggle active={editor.isActive("bulletList")}
            onToggle={() => editor.chain().focus().toggleBulletList().run()} tooltip="Bullet list">
            <List className="h-3.5 w-3.5" />
          </ToolbarToggle>
          <ToolbarToggle active={editor.isActive("orderedList")}
            onToggle={() => editor.chain().focus().toggleOrderedList().run()} tooltip="Ordered list">
            <ListOrdered className="h-3.5 w-3.5" />
          </ToolbarToggle>

          {/* Blocks (full only) */}
          {isFull && (
            <>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <ToolbarToggle active={editor.isActive("blockquote")}
                onToggle={() => editor.chain().focus().toggleBlockquote().run()} tooltip="Blockquote">
                <Quote className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <ToolbarToggle active={editor.isActive("codeBlock")}
                onToggle={() => editor.chain().focus().toggleCodeBlock().run()} tooltip="Code block">
                <Code2 className="h-3.5 w-3.5" />
              </ToolbarToggle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"
                onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
                <Minus className="h-3.5 w-3.5" />
              </Button>
            </>
          )}

        </div>
      )}

      {/* Content */}
      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          "prose-headings:font-bold prose-headings:tracking-tight",
          "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
          "prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none",
          "prose-pre:bg-muted prose-pre:rounded-lg",
          "[&_.tiptap]:outline-none [&_.tiptap.ProseMirror-focused]:outline-none",
          "[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
          "[&_.tiptap_p.is-editor-empty:first-child::before]:text-muted-foreground",
          "[&_.tiptap_p.is-editor-empty:first-child::before]:float-left",
          "[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none",
          "[&_.tiptap_p.is-editor-empty:first-child::before]:h-0",
          readOnly && "opacity-75 cursor-default",
        )}
      />
    </div>
  )
}
