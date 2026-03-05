"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import ShowCard from "../_components/show-card"

const ResizablePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Resizable</h2>
      <p className="text-muted-foreground">Accessible resizable panel groups and layouts with keyboard support.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Horizontal">
        <ResizablePanelGroup {...({ direction: "horizontal" } as any)} className="max-w-md rounded-lg border h-32">
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sidebar</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Content</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ShowCard>
      <ShowCard title="Vertical">
        <ResizablePanelGroup {...({ direction: "vertical" } as any)} className="max-w-md rounded-lg border h-40">
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Header</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Body</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ShowCard>
      <ShowCard title="With Visible Handle" description="Pass withHandle to show a drag grip indicator.">
        <ResizablePanelGroup {...({ direction: "horizontal" } as any)} className="max-w-md rounded-lg border h-32">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Left</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Right</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ShowCard>
    </div>
  </div>
)

export default ResizablePage
