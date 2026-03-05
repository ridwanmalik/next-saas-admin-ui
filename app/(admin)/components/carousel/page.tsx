"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import ShowCard from "../_components/show-card"

const CarouselPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Carousel</h2>
      <p className="text-muted-foreground">A carousel with motion and swipe built using Embla.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Carousel className="w-full max-w-[12rem] sm:max-w-xs mx-auto">
          <CarouselContent>
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ShowCard>
      <ShowCard title="Sizes" description='To set the size of the items, you can use the basis class on the <CarouselItem />.'>
        <Carousel
          opts={{ align: "start" }}
          className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm mx-auto"
        >
          <CarouselContent>
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i} className="basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ShowCard>
      <ShowCard title="Spacing" description='To set the spacing between the items, we use a pl-[VALUE] utility on the <CarouselItem /> and a negative ml-[VALUE] on the <CarouselContent />.'>
        <Carousel className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm mx-auto">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i} className="basis-1/2 pl-1 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ShowCard>
      <ShowCard title="Orientation" description="Use the orientation prop to set the orientation of the carousel.">
        <Carousel
          opts={{ align: "start" }}
          orientation="vertical"
          className="w-full max-w-xs mx-auto"
        >
          <CarouselContent className="-mt-1 h-[270px]">
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i} className="basis-1/2 pt-1">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ShowCard>
    </div>
  </div>
)

export default CarouselPage
