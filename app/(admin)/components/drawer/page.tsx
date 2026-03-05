"use client"

import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const DrawerPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Drawer</h2>
      <p className="text-muted-foreground">A drawer component for React, built on top of Vaul.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Directions" description="Supports top, right, bottom (default), and left.">
        <div className="flex flex-wrap gap-3">
          {(["bottom", "top", "left", "right"] as const).map((dir) => (
            <Drawer key={dir} direction={dir}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="capitalize">{dir}</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Drawer ({dir})</DrawerTitle>
                    <DrawerDescription>This drawer slides in from the {dir}.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default DrawerPage
