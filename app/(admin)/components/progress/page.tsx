"use client"

import { Progress } from "@/components/ui/progress"
import ShowCard from "../_components/show-card"

const ProgressPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Progress</h2>
      <p className="text-muted-foreground">Displays an indicator showing the completion progress of a task.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Values">
        <div className="space-y-4">
          {[0, 25, 50, 75, 100].map((v) => (
            <div key={v} className="flex items-center gap-4">
              <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">{v}%</span>
              <Progress value={v} className="flex-1" />
            </div>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default ProgressPage
