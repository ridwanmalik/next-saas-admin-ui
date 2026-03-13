"use client"

import { useState } from "react"
import { MessageSquare, Phone, Plus, Search, MoreHorizontal, Mail, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CONTACTS, groupContactsByLetter } from "../_components/data"

const ContactCardPage = () => {
  const [search, setSearch] = useState("")

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )

  const groups = groupContactsByLetter(filtered)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Contact Cards</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search Contact"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {groups.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">No contacts found.</p>
        ) : (
          groups.map(([letter, contacts]) => (
            <div key={letter} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-primary">{letter}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {contacts.map(contact => (
                  <Card key={contact.id} className="gap-0">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback className="text-sm font-semibold">
                            {contact.avatarFallback}
                          </AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div>
                        <p className="font-semibold text-sm">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                      </div>

                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 shrink-0" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span>{contact.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Button variant="outline" size="sm" className="flex-1 gap-1.5 h-8 text-xs">
                          <MessageSquare className="h-3.5 w-3.5" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-1.5 h-8 text-xs">
                          <Phone className="h-3.5 w-3.5" />
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ContactCardPage
