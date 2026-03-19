import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LABEL_STYLE: Record<string, string> = {
  Work:     "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Personal: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Finance:  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Urgent:   "bg-red-500/10 text-red-600 dark:text-red-400",
}

type Email = {
  id: string
  from: string
  avatar: string
  avatarFallback: string
  avatarColor: string
  subject: string
  preview: string
  time: string
  read: boolean
  labels: string[]
}

export const EmailRow = ({ email, active, onClick }: { email: Email; active: boolean; onClick: () => void }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={cn(
      "flex w-full h-auto items-start gap-3 px-4 py-3 text-left justify-start rounded-none border-b",
      active ? "bg-muted hover:bg-muted" : "hover:bg-muted/50",
      !email.read && "bg-primary/[0.03]"
    )}
  >
    <Avatar className="h-8 w-8 shrink-0 mt-0.5">
      <AvatarImage src={email.avatar} alt={email.from} />
      <AvatarFallback className={cn("text-[10px] font-semibold text-white", email.avatarColor)}>
        {email.avatarFallback}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <span className={cn("text-sm truncate", !email.read ? "font-semibold" : "font-medium")}>
          {email.from}
        </span>
        <span className="text-[10px] text-muted-foreground shrink-0">{email.time}</span>
      </div>
      <p className={cn("text-xs truncate mt-0.5", !email.read ? "text-foreground font-medium" : "text-muted-foreground")}>
        {email.subject}
      </p>
      <p className="text-xs text-muted-foreground truncate mt-0.5">{email.preview}</p>
      {email.labels.length > 0 && (
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {email.labels.map(l => (
            <span key={l} className={cn("inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-medium", LABEL_STYLE[l])}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
    {!email.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
  </Button>
)
