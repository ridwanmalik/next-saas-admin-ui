"use client"

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ShowCard from "../_components/show-card"

const SpinnerPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Spinner</h2>
      <p className="text-muted-foreground">An animated indicator used to show a loading state.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Sizes">
        <div className="flex items-center gap-6">
          {([["size-3", "XS"], ["size-4", "SM"], ["size-5", "MD"], ["size-6", "LG"], ["size-8", "XL"]] as const).map(([cls, label]) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <Spinner className={cls} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </ShowCard>
      <ShowCard title="Button">
        <div className="flex gap-3">
          <Button disabled><Spinner className="size-4" />Loading</Button>
          <Button variant="outline" disabled><Spinner className="size-4" />Saving</Button>
        </div>
      </ShowCard>
      <ShowCard title="Badge">
        <div className="flex gap-3">
          <Badge variant="outline"><Spinner className="size-3" />Processing</Badge>
          <Badge><Spinner className="size-3" />Syncing</Badge>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SpinnerPage
