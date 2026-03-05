"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const SonnerPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Sonner</h2>
      <p className="text-muted-foreground">An opinionated toast component for React. Toaster is mounted in the admin layout.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Toast Types">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast("Event has been created")}>Default</Button>
          <Button variant="outline" onClick={() => toast.success("Profile updated successfully")}>Success</Button>
          <Button variant="outline" onClick={() => toast.error("Something went wrong")}>Error</Button>
          <Button variant="outline" onClick={() => toast.warning("Your session is expiring soon")}>Warning</Button>
          <Button variant="outline" onClick={() => toast.info("A new version is available")}>Info</Button>
          <Button variant="outline" onClick={() => toast.loading("Uploading file...")}>Loading</Button>
          <Button variant="outline" onClick={() => toast("Event created", { description: "Monday, January 1st at 6:00pm" })}>With Description</Button>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SonnerPage
