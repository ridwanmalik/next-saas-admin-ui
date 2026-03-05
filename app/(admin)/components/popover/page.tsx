"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ShowCard from "../_components/show-card"

const PopoverPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Popover</h2>
      <p className="text-muted-foreground">Displays rich content in a portal, triggered by a button.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="grid gap-3">
              <div>
                <p className="font-medium text-sm">Dimensions</p>
                <p className="text-xs text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Width</Label>
                  <Input defaultValue="100%" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Max width</Label>
                  <Input defaultValue="300px" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Height</Label>
                  <Input defaultValue="auto" className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ShowCard>
    </div>
  </div>
)

export default PopoverPage
