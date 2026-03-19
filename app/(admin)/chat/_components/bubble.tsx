import { Check, CheckCheck } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

import type { Conversation, Message } from "./types"

export const Bubble = ({ msg, conv }: { msg: Message; conv: Conversation }) => (
  <div className={cn("flex items-end gap-2 max-w-[75%]", msg.sent ? "ml-auto flex-row-reverse" : "")}>
    {!msg.sent && (
      <Avatar className="h-7 w-7 shrink-0 mb-1">
        <AvatarImage src={conv.avatar} alt={conv.name} />
        <AvatarFallback className={cn("text-[10px] font-semibold text-white", conv.avatarColor)}>
          {conv.avatarFallback}
        </AvatarFallback>
      </Avatar>
    )}
    <div>
      <div
        className={cn(
          "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          msg.sent
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        {msg.text}
      </div>
      <div className={cn("flex items-center gap-1 mt-1", msg.sent ? "justify-end" : "")}>
        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
        {msg.sent && (
          msg.read
            ? <CheckCheck className="h-3 w-3 text-primary" />
            : <Check className="h-3 w-3 text-muted-foreground" />
        )}
      </div>
    </div>
  </div>
)
