"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import ShowCard from "../_components/show-card"

const PopoverPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Popover</h2>
      <p className="text-muted-foreground">Displays rich content in a portal, triggered by a button.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Max. width</Label>
                  <Input
                    id="maxWidth"
                    defaultValue="300px"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">Max. height</Label>
                  <Input
                    id="maxHeight"
                    defaultValue="none"
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ShowCard>

      <ShowCard title="Basic">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </ShowCard>

      <ShowCard title="Align">
        <div className="flex gap-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Start
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40">
              Aligned to start
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Center
              </Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-40">
              Aligned to center
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                End
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40">
              Aligned to end
            </PopoverContent>
          </Popover>
        </div>
      </ShowCard>

      <ShowCard title="With Form">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
            <FieldGroup className="gap-4">
              <Field orientation="horizontal">
                <FieldLabel htmlFor="pop-width" className="w-1/2">
                  Width
                </FieldLabel>
                <Input id="pop-width" defaultValue="100%" />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="pop-height" className="w-1/2">
                  Height
                </FieldLabel>
                <Input id="pop-height" defaultValue="25px" />
              </Field>
            </FieldGroup>
          </PopoverContent>
        </Popover>
      </ShowCard>
    </div>
  </div>
)

export default PopoverPage
