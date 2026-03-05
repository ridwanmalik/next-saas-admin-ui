"use client"

import { Skeleton } from "@/components/ui/skeleton"
import ShowCard from "../_components/show-card"

const SkeletonPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Skeleton</h2>
      <p className="text-muted-foreground">Use to show a placeholder while content is loading.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Text Lines">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </ShowCard>
      <ShowCard title="User Row">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </ShowCard>
      <ShowCard title="Card">
        <div className="space-y-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SkeletonPage
