import { RichEditor } from "@/components/ui/rich-editor"

const FULL_CONTENT = `<h2>Welcome to the editor</h2><p>This is a <strong>rich text editor</strong> built with <em>TipTap</em>. You can style text, create lists, align content, and more using the toolbar above.</p><p></p><blockquote>Great editors make writing feel effortless.</blockquote>`

const READONLY_CONTENT = `<h3>Release Notes — v2.4.0</h3><p>This release includes <strong>performance improvements</strong>, a redesigned <em>onboarding flow</em>, and fixes for several reported issues.</p><ul><li>Dashboard load time reduced by 40%</li><li>New multi-step onboarding wizard</li><li>Fixed broken CSV export on Safari</li><li>Improved dark mode contrast across all components</li></ul>`

const EditorPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Rich Text Editor</h2>
      <p className="text-muted-foreground">WYSIWYG editor powered by TipTap.</p>
    </div>

    {/* Full editor */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Full Editor</h3>
        <p className="text-sm text-muted-foreground">Complete toolbar with headings, formatting, alignment, lists, and block elements.</p>
      </div>
      <RichEditor variant="full" defaultContent={FULL_CONTENT} />
    </div>

    {/* Minimal editor */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Minimal Editor</h3>
        <p className="text-sm text-muted-foreground">Stripped-down toolbar for description fields or notes — bold, italic, and lists only.</p>
      </div>
      <RichEditor variant="minimal" placeholder="Add a description…" />
    </div>

    {/* Comment editor */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Comment Box</h3>
        <p className="text-sm text-muted-foreground">Compact single-purpose editor for inline comments or replies.</p>
      </div>
      <RichEditor variant="comment" placeholder="Leave a comment…" />
    </div>

    {/* Read-only */}
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Read-only</h3>
        <p className="text-sm text-muted-foreground">Display rich content without an editable toolbar — useful for previews and documentation.</p>
      </div>
      <RichEditor readOnly defaultContent={READONLY_CONTENT} />
    </div>

  </div>
)

export default EditorPage
