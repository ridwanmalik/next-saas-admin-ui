"use client"

import { Search } from "lucide-react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import ShowCard from "../_components/show-card"

const KbdPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Kbd</h2>
      <p className="text-muted-foreground">Displays keyboard key input, individually or grouped.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex flex-col items-center gap-4">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>⌃</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>B</Kbd>
          </KbdGroup>
        </div>
      </ShowCard>
      <ShowCard title="Group" description="Use KbdGroup to group keyboard keys together.">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <KbdGroup>
            <Kbd>Ctrl + B</Kbd>
            <Kbd>Ctrl + K</Kbd>
          </KbdGroup>{" "}
          to open the command palette
        </p>
      </ShowCard>
      <ShowCard title="Button" description="Use Kbd inside a Button to display a keyboard shortcut.">
        <Button variant="outline">
          Accept{" "}
          <Kbd data-icon="inline-end" className="translate-x-0.5">⏎</Kbd>
        </Button>
      </ShowCard>
      <ShowCard title="Tooltip" description="Use Kbd inside a Tooltip to display keyboard shortcuts.">
        <div className="flex flex-wrap gap-4">
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Save</Button>
              </TooltipTrigger>
              <TooltipContent className="pr-1.5">
                <div className="flex items-center gap-2">
                  Save Changes <Kbd>S</Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Print</Button>
              </TooltipTrigger>
              <TooltipContent className="pr-1.5">
                <div className="flex items-center gap-2">
                  Print Document{" "}
                  <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>P</Kbd>
                  </KbdGroup>
                </div>
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </div>
      </ShowCard>
      <ShowCard title="Input Group" description="Use Kbd inside an InputGroupAddon to display a keyboard shortcut.">
        <div className="flex w-full max-w-xs flex-col gap-6">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default KbdPage
