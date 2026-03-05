"use client"

import { useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ShowCard from "../_components/show-card"

const GOAL_DATA = [
  { goal: 400 }, { goal: 300 }, { goal: 200 }, { goal: 300 }, { goal: 200 },
  { goal: 278 }, { goal: 189 }, { goal: 239 }, { goal: 300 }, { goal: 200 },
  { goal: 278 }, { goal: 189 }, { goal: 349 },
]

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

const DrawerPage = () => {
  const [goal, setGoal] = useState(350)

  const onClick = (adjustment: number) => {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Drawer</h2>
        <p className="text-muted-foreground">A drawer component for React.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-10)}
                      disabled={goal <= 200}
                    >
                      <MinusIcon />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                      disabled={goal >= 400}
                    >
                      <PlusIcon />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={GOAL_DATA}>
                        <Bar dataKey="goal" style={{ fill: "var(--chart-1)" } as React.CSSProperties} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </ShowCard>

        <ShowCard title="Scrollable Content" description="Keep actions visible while the content scrolls.">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">Scrollable Content</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
              </DrawerHeader>
              <div className="no-scrollbar overflow-y-auto px-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} className="mb-4 leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                ))}
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ShowCard>

        <ShowCard title="Sides" description="Use the direction prop to set the side of the drawer.">
          <div className="flex flex-wrap gap-2">
            {DRAWER_SIDES.map((side) => (
              <Drawer key={side} direction={side === "bottom" ? undefined : side}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="capitalize">{side}</Button>
                </DrawerTrigger>
                <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                  <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <div className="no-scrollbar overflow-y-auto px-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <p key={index} className="mb-4 leading-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    ))}
                  </div>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </ShowCard>
      </div>
    </div>
  )
}

export default DrawerPage
