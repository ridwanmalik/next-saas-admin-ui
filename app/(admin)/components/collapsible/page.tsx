"use client"

import { useState } from "react"
import {
  ChevronsUpDown, ChevronDown, Maximize, Minimize,
  ChevronRight, File, Folder,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShowCard from "../_components/show-card"

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

const fileTree: FileTreeItem[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
          { name: "input.tsx" },
          { name: "select.tsx" },
          { name: "table.tsx" },
        ],
      },
      { name: "login-form.tsx" },
      { name: "register-form.tsx" },
    ],
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
  },
  {
    name: "hooks",
    items: [
      { name: "use-media-query.ts" },
      { name: "use-debounce.ts" },
      { name: "use-local-storage.ts" },
    ],
  },
  {
    name: "types",
    items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
  },
  {
    name: "public",
    items: [{ name: "favicon.ico" }, { name: "logo.svg" }, { name: "images" }],
  },
  { name: "app.tsx" },
  { name: "layout.tsx" },
  { name: "globals.css" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "README.md" },
  { name: ".gitignore" },
]

const CollapsiblePage = () => {
  const [heroOpen, setHeroOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="transition-transform group-data-[state=open]:rotate-90" />
              <Folder />
              {fileItem.name}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-5">
            <div className="flex flex-col gap-1">
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="sm"
        className="w-full justify-start gap-2 text-foreground"
      >
        <File />
        <span>{fileItem.name}</span>
      </Button>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Collapsible</h2>
        <p className="text-muted-foreground">An interactive component which expands/collapses a panel.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <Collapsible
            open={heroOpen}
            onOpenChange={setHeroOpen}
            className="flex w-87.5 flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-4 px-4">
              <h4 className="text-sm font-semibold">Order #4189</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle details</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">Shipped</span>
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
              <div className="rounded-md border px-4 py-2 text-sm">
                <p className="font-medium">Shipping address</p>
                <p className="text-muted-foreground">100 Market St, San Francisco</p>
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">
                <p className="font-medium">Items</p>
                <p className="text-muted-foreground">2x Studio Headphones</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </ShowCard>

        <ShowCard title="Basic">
          <Card className="mx-auto w-full max-w-sm">
            <CardContent>
              <Collapsible className="rounded-md data-[state=open]:bg-muted">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="group w-full">
                    Product details
                    <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                  <div>
                    This panel can be expanded or collapsed to reveal additional content.
                  </div>
                  <Button size="xs">Learn More</Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </ShowCard>

        <ShowCard title="Settings Panel" description="Use a trigger button to reveal additional settings.">
          <Card className="mx-auto w-full max-w-xs" size="sm">
            <CardHeader>
              <CardTitle>Radius</CardTitle>
              <CardDescription>Set the corner radius of the element.</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                className="flex items-start gap-2"
              >
                <FieldGroup className="grid w-full grid-cols-2 gap-2">
                  <Field>
                    <FieldLabel htmlFor="radius-x" className="sr-only">
                      Radius X
                    </FieldLabel>
                    <Input id="radius-x" placeholder="0" defaultValue={0} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="radius-y" className="sr-only">
                      Radius Y
                    </FieldLabel>
                    <Input id="radius-y" placeholder="0" defaultValue={0} />
                  </Field>
                  <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
                    <Field>
                      <FieldLabel htmlFor="radius-x2" className="sr-only">
                        Radius X
                      </FieldLabel>
                      <Input id="radius-x2" placeholder="0" defaultValue={0} />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="radius-y2" className="sr-only">
                        Radius Y
                      </FieldLabel>
                      <Input id="radius-y2" placeholder="0" defaultValue={0} />
                    </Field>
                  </CollapsibleContent>
                </FieldGroup>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="icon">
                    {settingsOpen ? <Minimize /> : <Maximize />}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </CardContent>
          </Card>
        </ShowCard>

        <ShowCard title="File Tree" description="Use nested collapsibles to build a file tree.">
          <Card className="mx-auto w-full max-w-64 gap-2" size="sm">
            <CardHeader>
              <Tabs defaultValue="explorer">
                <TabsList className="w-full">
                  <TabsTrigger value="explorer">Explorer</TabsTrigger>
                  <TabsTrigger value="outline">Outline</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                {fileTree.map((item) => renderItem(item))}
              </div>
            </CardContent>
          </Card>
        </ShowCard>
      </div>
    </div>
  )
}

export default CollapsiblePage
