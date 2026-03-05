"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import ShowCard from "../_components/show-card"

const AspectRatioPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Aspect Ratio</h2>
      <p className="text-muted-foreground">Displays content within a desired ratio.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
            <Image src="https://avatar.vercel.sh/shadcn1" alt="Photo" fill className="w-full rounded-lg object-cover grayscale dark:brightness-20" />
          </AspectRatio>
        </div>
      </ShowCard>
      <ShowCard title="Square" description="A square aspect ratio component using the ratio={1 / 1} prop. This is useful for displaying images in a square format.">
        <div className="w-full max-w-[12rem]">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
            <Image src="https://avatar.vercel.sh/shadcn1" alt="Photo" fill className="rounded-lg object-cover grayscale dark:brightness-20" />
          </AspectRatio>
        </div>
      </ShowCard>
      <ShowCard title="Portrait" description="A portrait aspect ratio component using the ratio={9 / 16} prop. This is useful for displaying images in a portrait format.">
        <div className="w-full max-w-[10rem]">
          <AspectRatio ratio={9 / 16} className="bg-muted rounded-lg">
            <Image src="https://avatar.vercel.sh/shadcn1" alt="Photo" fill className="rounded-lg object-cover grayscale dark:brightness-20" />
          </AspectRatio>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default AspectRatioPage
