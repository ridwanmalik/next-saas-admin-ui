"use client"

import { Separator } from "@/components/ui/separator"
import ShowCard from "../_components/show-card"

const SeparatorPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Separator</h2>
      <p className="text-muted-foreground">Visually or semantically separates content.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex max-w-sm flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1.5">
            <div className="leading-none font-medium">shadcn/ui</div>
            <div className="text-muted-foreground">
              The Foundation for your Design System
            </div>
          </div>
          <Separator />
          <div>
            A set of beautifully designed components that you can customize, extend,
            and build on.
          </div>
        </div>
      </ShowCard>

      <ShowCard title="Vertical">
        <div className="flex h-5 items-center gap-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </ShowCard>

      <ShowCard title="Menu">
        <div className="flex items-center gap-2 text-sm md:gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-medium">Settings</span>
            <span className="text-xs text-muted-foreground">
              Manage preferences
            </span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col gap-1">
            <span className="font-medium">Account</span>
            <span className="text-xs text-muted-foreground">
              Profile & security
            </span>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="hidden flex-col gap-1 md:flex">
            <span className="font-medium">Help</span>
            <span className="text-xs text-muted-foreground">Support & docs</span>
          </div>
        </div>
      </ShowCard>

      <ShowCard title="List">
        <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
          <dl className="flex items-center justify-between">
            <dt>Item 1</dt>
            <dd className="text-muted-foreground">Value 1</dd>
          </dl>
          <Separator />
          <dl className="flex items-center justify-between">
            <dt>Item 2</dt>
            <dd className="text-muted-foreground">Value 2</dd>
          </dl>
          <Separator />
          <dl className="flex items-center justify-between">
            <dt>Item 3</dt>
            <dd className="text-muted-foreground">Value 3</dd>
          </dl>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SeparatorPage
