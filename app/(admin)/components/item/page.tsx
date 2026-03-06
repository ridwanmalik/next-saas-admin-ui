"use client"

import Image from "next/image"
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  InboxIcon,
  PlusIcon,
  ShieldAlertIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import ShowCard from "../_components/show-card"

const music = [
  { title: "Midnight City Lights", artist: "Neon Dreams", album: "Electric Nights", duration: "3:45" },
  { title: "Coffee Shop Conversations", artist: "The Morning Brew", album: "Urban Stories", duration: "4:05" },
  { title: "Digital Rain", artist: "Cyber Symphony", album: "Binary Beats", duration: "3:30" },
]

const models = [
  { name: "v0-1.5-sm", description: "Everyday tasks and UI generation.", image: "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop" },
  { name: "v0-1.5-lg", description: "Advanced thinking or reasoning.", image: "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop" },
  { name: "v0-2.0-mini", description: "Open Source model for everyone.", image: "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop" },
]

const people = [
  { username: "shadcn", avatar: "https://github.com/shadcn.png", email: "shadcn@vercel.com" },
  { username: "maxleiter", avatar: "https://github.com/maxleiter.png", email: "maxleiter@vercel.com" },
  { username: "evilrabbit", avatar: "https://github.com/evilrabbit.png", email: "evilrabbit@vercel.com" },
]

const ItemPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Item</h2>
      <p className="text-muted-foreground">
        A flex-container for displaying content with media, title, description, and actions.
      </p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex w-full max-w-md flex-col gap-6">
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Basic Item</ItemTitle>
              <ItemDescription>A simple item with title and description.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">Action</Button>
            </ItemActions>
          </Item>
          <Item variant="outline" size="sm" asChild>
            <a href="#">
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Your profile has been verified.</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        </div>
      </ShowCard>

      <ShowCard title="Icon">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <Item variant="outline">
            <ItemMedia variant="icon">
              <ShieldAlertIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Security Alert</ItemTitle>
              <ItemDescription>New login detected from unknown device.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline">Review</Button>
            </ItemActions>
          </Item>
        </div>
      </ShowCard>

      <ShowCard title="Avatar">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <Item variant="outline">
            <ItemMedia>
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Evil Rabbit</ItemTitle>
              <ItemDescription>Last seen 5 months ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="icon-sm" variant="outline" className="rounded-full" aria-label="Invite">
                <PlusIcon />
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemMedia>
              <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                <Avatar className="hidden sm:flex">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="hidden sm:flex">
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>No Team Members</ItemTitle>
              <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline">Invite</Button>
            </ItemActions>
          </Item>
        </div>
      </ShowCard>

      <ShowCard title="Image">
        <div className="flex w-full max-w-md flex-col gap-6">
          <ItemGroup className="gap-4">
            {music.map((song) => (
              <Item key={song.title} variant="outline" asChild role="listitem">
                <a href="#">
                  <ItemMedia variant="image">
                    <Image
                      src={`https://avatar.vercel.sh/${song.title}`}
                      alt={song.title}
                      width={32}
                      height={32}
                      className="object-cover grayscale"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {song.title} -{" "}
                      <span className="text-muted-foreground">{song.album}</span>
                    </ItemTitle>
                    <ItemDescription>{song.artist}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none text-center">
                    <ItemDescription>{song.duration}</ItemDescription>
                  </ItemContent>
                </a>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </ShowCard>

      <ShowCard title="Group">
        <ItemGroup className="max-w-sm">
          {people.map((person) => (
            <Item key={person.username} variant="outline">
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={person.avatar} className="grayscale" />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </ShowCard>

      <ShowCard title="Header">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <ItemGroup className="grid grid-cols-3 gap-4">
            {models.map((model) => (
              <Item key={model.name} variant="outline">
                <ItemHeader>
                  <Image
                    src={model.image}
                    alt={model.name}
                    width={128}
                    height={128}
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                </ItemHeader>
                <ItemContent>
                  <ItemTitle>{model.name}</ItemTitle>
                  <ItemDescription>{model.description}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </ShowCard>

      <ShowCard title="Link">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Item asChild>
            <a href="#">
              <ItemContent>
                <ItemTitle>Visit our documentation</ItemTitle>
                <ItemDescription>Learn how to get started with our components.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
          <Item variant="outline" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ItemContent>
                <ItemTitle>External resource</ItemTitle>
                <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ExternalLinkIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        </div>
      </ShowCard>

      <ShowCard title="Dropdown">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Select <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuGroup>
              {people.map((person) => (
                <DropdownMenuItem key={person.username}>
                  <Item size="xs" className="w-full p-2">
                    <ItemMedia>
                      <Avatar className="size-[--spacing(6.5)]">
                        <AvatarImage src={person.avatar} className="grayscale" />
                        <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent className="gap-0">
                      <ItemTitle>{person.username}</ItemTitle>
                      <ItemDescription className="leading-none">{person.email}</ItemDescription>
                    </ItemContent>
                  </Item>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ShowCard>
    </div>
  </div>
)

export default ItemPage
