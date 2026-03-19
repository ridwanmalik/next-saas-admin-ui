import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { Conversation } from "./types"

export const ConversationItem = ({
  conv,
  active,
  onClick,
}: {
  conv: Conversation
  active: boolean
  onClick: () => void
}) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 h-auto text-left justify-start",
      active ? "bg-muted hover:bg-muted" : "hover:bg-muted/60"
    )}
  >
    <div className="relative shrink-0">
      <Avatar className="h-10 w-10">
        <AvatarImage src={conv.avatar} alt={conv.name} />
        <AvatarFallback className={cn("text-xs font-semibold text-white", conv.avatarColor)}>
          {conv.avatarFallback}
        </AvatarFallback>
      </Avatar>
      {conv.online && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-1">
        <span className="text-sm font-medium truncate">{conv.name}</span>
        <span className="text-[10px] text-muted-foreground shrink-0">{conv.lastTime}</span>
      </div>
      <div className="flex items-center justify-between gap-1 mt-0.5">
        <span className="text-xs text-muted-foreground truncate">{conv.lastMessage}</span>
        {conv.unread > 0 && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {conv.unread}
          </span>
        )}
      </div>
    </div>
  </Button>
)
