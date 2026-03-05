"use client"

import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ShowCard from "../_components/show-card"

const SheetPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Sheet</h2>
      <p className="text-muted-foreground">Extends Dialog to display content from any edge of the screen.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Sides">
        <div className="flex flex-wrap gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">{side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Make changes to your profile here.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 px-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`sn-${side}`}>Name</Label>
                    <Input id={`sn-${side}`} defaultValue="John Doe" />
                  </div>
                </div>
                <SheetFooter className="px-4">
                  <SheetClose asChild><Button>Save changes</Button></SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SheetPage
