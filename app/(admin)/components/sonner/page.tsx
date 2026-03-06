"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import ShowCard from "../_components/show-card"

const SonnerPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Sonner</h2>
      <p className="text-muted-foreground">An opinionated toast component for React.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </ShowCard>

      <ShowCard title="Types">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast("Event has been created")}>
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Event has been created")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.info("Be at the area 10 minutes before the event time")
            }
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Event start time cannot be earlier than 8am")
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Event has not been created")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast.promise<{ name: string }>(
                () =>
                  new Promise((resolve) =>
                    setTimeout(() => resolve({ name: "Event" }), 2000)
                  ),
                {
                  loading: "Loading...",
                  success: (data) => `${data.name} has been created`,
                  error: "Error",
                }
              )
            }}
          >
            Promise
          </Button>
        </div>
      </ShowCard>

      <ShowCard title="Description">
        <Button
          onClick={() =>
            toast("Event has been created", {
              description: "Monday, January 3rd at 6:00pm",
            })
          }
          variant="outline"
          className="w-fit"
        >
          Show Toast
        </Button>
      </ShowCard>

      <ShowCard title="Position">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", { position: "top-left" })
            }
          >
            Top Left
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", { position: "top-center" })
            }
          >
            Top Center
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", { position: "top-right" })
            }
          >
            Top Right
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", { position: "bottom-left" })
            }
          >
            Bottom Left
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", { position: "bottom-center" })
            }
          >
            Bottom Center
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", { position: "bottom-right" })
            }
          >
            Bottom Right
          </Button>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SonnerPage
