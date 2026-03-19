"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ShowCard from "../_components/show-card"

const SkeletonPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Skeleton</h2>
      <p className="text-muted-foreground">Use to show a placeholder while content is loading.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-50" />
          </div>
        </div>
      </ShowCard>

      <ShowCard title="Avatar">
        <div className="flex w-fit items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
      </ShowCard>

      <ShowCard title="Card">
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      </ShowCard>

      <ShowCard title="Text">
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </ShowCard>

      <ShowCard title="Form">
        <div className="flex w-full max-w-xs flex-col gap-7">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </ShowCard>

      <ShowCard title="Table">
        <div className="flex w-full max-w-sm flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex gap-4" key={index}>
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SkeletonPage
