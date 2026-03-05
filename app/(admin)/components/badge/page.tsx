"use client"

import { BadgeCheck, Bookmark, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import ShowCard from "../_components/show-card"

const BadgePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Badge</h2>
      <p className="text-muted-foreground">Displays a badge or a component that looks like a badge.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex w-full flex-wrap justify-center gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ShowCard>
      <ShowCard title="Variants" description="Use the variant prop to change the variant of the badge.">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </ShowCard>

      <ShowCard title="With Icon" description='You can render an icon inside the badge. Use data-icon="inline-start" to render the icon on the left and data-icon="inline-end" to render the icon on the right.'>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <BadgeCheck data-icon="inline-start" />
            Verified
          </Badge>
          <Badge variant="outline">
            Bookmark
            <Bookmark data-icon="inline-end" />
          </Badge>
        </div>
      </ShowCard>

      <ShowCard title="With Spinner" description='You can render a spinner inside the badge. Remember to add the data-icon="inline-start" or data-icon="inline-end" prop to the spinner.'>
        <div className="flex flex-wrap gap-2">
          <Badge variant="destructive">
            <Spinner data-icon="inline-start" />
            Deleting
          </Badge>
          <Badge variant="secondary">
            Generating
            <Spinner data-icon="inline-end" />
          </Badge>
        </div>
      </ShowCard>

      <ShowCard title="Link" description="Use the asChild prop to render a link as a badge.">
        <Badge asChild>
          <a href="#link">
            Open Link <ArrowUpRight data-icon="inline-end" />
          </a>
        </Badge>
      </ShowCard>

      <ShowCard title="Custom Colors" description="You can customize the colors of a badge by adding custom classes such as bg-green-50 dark:bg-green-800 to the Badge component.">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Blue</Badge>
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Green</Badge>
          <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">Sky</Badge>
          <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">Purple</Badge>
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">Red</Badge>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default BadgePage
