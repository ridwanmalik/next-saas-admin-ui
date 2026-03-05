"use client"

import { Share2, Copy } from "lucide-react"
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ShowCard from "../_components/show-card"

const DialogPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Dialog</h2>
      <p className="text-muted-foreground">A window overlaid on either the primary window or another dialog window.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2"><Label htmlFor="d-name">Name</Label><Input id="d-name" defaultValue="John Doe" /></div>
              <div className="grid gap-2"><Label htmlFor="d-email">Email</Label><Input id="d-email" type="email" defaultValue="john@example.com" /></div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowCard>

      <ShowCard title="Share Link" description="Copy-to-clipboard pattern inside a Dialog.">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline"><Share2 />Share</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>Anyone with the link can view this resource.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input defaultValue="https://ui.shadcn.com/docs/installation" readOnly className="flex-1" />
              <Button size="icon" variant="outline" aria-label="Copy"><Copy className="size-4" /></Button>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Done</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowCard>

      <ShowCard title="Scrollable Content" description="Long content scrolls inside the dialog body.">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Scrollable</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>Please read our terms carefully.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2 text-sm text-muted-foreground">
              {Array.from({ length: 8 }, (_, i) => (
                <p key={i}>Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Decline</Button></DialogClose>
              <Button>Accept</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowCard>
    </div>
  </div>
)

export default DialogPage
