import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// ─── Component ────────────────────────────────────────────────────────────────

export const CreateNewBlog = () => (
  <Card className="bg-primary text-primary-foreground border-primary overflow-hidden relative">
    <CardContent className="p-5 space-y-3">
      <div className="space-y-1">
        <h3 className="text-base font-bold">Create New Blog</h3>
        <p className="text-xs text-primary-foreground/75 leading-relaxed">
          Unleash your creativity by writing a new blog post. Share your unique insights, stories, and expertise
          with the world.
        </p>
      </div>
      <Button size="sm" variant="secondary" className="w-full font-semibold">
        Create new blog
      </Button>
    </CardContent>
  </Card>
)
