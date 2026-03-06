"use client"

import { ArrowUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import ShowCard from "../_components/show-card"

const SpinnerPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Spinner</h2>
      <p className="text-muted-foreground">An indicator that can be used to show a loading state.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
          <Item variant="muted">
            <ItemMedia>
              <Spinner />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
            </ItemContent>
            <ItemContent className="flex-none justify-end">
              <span className="text-sm tabular-nums">$100.00</span>
            </ItemContent>
          </Item>
        </div>
      </ShowCard>

      <ShowCard title="Size">
        <div className="flex items-center gap-6">
          <Spinner className="size-3" />
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
      </ShowCard>

      <ShowCard title="Button">
        <div className="flex flex-col items-center gap-4">
          <Button disabled size="sm">
            <Spinner data-icon="inline-start" />
            Loading...
          </Button>
          <Button variant="outline" disabled size="sm">
            <Spinner data-icon="inline-start" />
            Please wait
          </Button>
          <Button variant="secondary" disabled size="sm">
            <Spinner data-icon="inline-start" />
            Processing
          </Button>
        </div>
      </ShowCard>

      <ShowCard title="Badge">
        <div className="flex items-center gap-4 [--radius:1.2rem]">
          <Badge>
            <Spinner data-icon="inline-start" />
            Syncing
          </Badge>
          <Badge variant="secondary">
            <Spinner data-icon="inline-start" />
            Updating
          </Badge>
          <Badge variant="outline">
            <Spinner data-icon="inline-start" />
            Processing
          </Badge>
        </div>
      </ShowCard>

      <ShowCard title="Input Group">
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputGroup>
            <InputGroupInput placeholder="Send a message..." disabled />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea placeholder="Send a message..." disabled />
            <InputGroupAddon align="block-end">
              <Spinner /> Validating...
              <InputGroupButton className="ml-auto" variant="default">
                <ArrowUpIcon />
                <span className="sr-only">Send</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>

      <ShowCard title="Empty">
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Processing your request</EmptyTitle>
            <EmptyDescription>
              Please wait while we process your request. Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </EmptyContent>
        </Empty>
      </ShowCard>
    </div>
  </div>
)

export default SpinnerPage
