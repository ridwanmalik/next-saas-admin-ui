"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, BellOff, Check, CheckCheck, MessageSquareX, MoreHorizontal, Paperclip, Phone, Search, Send, Smile, Trash2, UserRound, Video } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: string
  text: string
  time: string
  sent: boolean
  read?: boolean
}

type Conversation = {
  id: string
  name: string
  handle: string
  avatar: string
  avatarFallback: string
  avatarColor: string
  online: boolean
  lastMessage: string
  lastTime: string
  unread: number
  messages: Message[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    handle: "Product Designer",
    avatar: "https://i.pravatar.cc/80?img=5",
    avatarFallback: "SC",
    avatarColor: "bg-pink-500",
    online: true,
    lastMessage: "Can you review the new mockups?",
    lastTime: "2m",
    unread: 3,
    messages: [
      { id: "1",  text: "Morning! Starting on the dashboard redesign today.", time: "8:10 AM", sent: false },
      { id: "2",  text: "Nice, are you going with the new component library?", time: "8:12 AM", sent: true, read: true },
      { id: "3",  text: "Yes — sticking to shadcn so it's consistent.", time: "8:13 AM", sent: false },
      { id: "4",  text: "Good call. What's the main focus area?", time: "8:15 AM", sent: true, read: true },
      { id: "5",  text: "The stat cards and the chart section. They feel cluttered right now.", time: "8:16 AM", sent: false },
      { id: "6",  text: "Agreed. Less noise, more signal.", time: "8:18 AM", sent: true, read: true },
      { id: "7",  text: "Exactly. I'm also rethinking the sidebar — maybe collapsible by default on smaller screens.", time: "8:22 AM", sent: false },
      { id: "8",  text: "That'd help a lot on laptops. What about the topbar?", time: "8:24 AM", sent: true, read: true },
      { id: "9",  text: "Keeping it clean — search left, actions right. Simple.", time: "8:25 AM", sent: false },
      { id: "10", text: "Perfect. Send me a draft when you have something to show.", time: "9:00 AM", sent: true, read: true },
      { id: "11", text: "Hey! Just sent over the new mockups for the dashboard redesign.", time: "9:41 AM", sent: false },
      { id: "12", text: "They look great! I especially like the new card layout.", time: "9:43 AM", sent: true, read: true },
      { id: "13", text: "Thanks! I tried to keep the information density balanced.", time: "9:44 AM", sent: false },
      { id: "14", text: "The color palette feels a lot more polished than the last iteration.", time: "9:50 AM", sent: true, read: true },
      { id: "15", text: "Agreed. I also updated the mobile breakpoints — want me to share those too?", time: "9:51 AM", sent: false },
      { id: "16", text: "Yes please! Can you review the new mockups?", time: "9:53 AM", sent: false },
    ],
  },
  {
    id: "2",
    name: "James Okonkwo",
    handle: "Engineering Lead",
    avatar: "https://i.pravatar.cc/80?img=12",
    avatarFallback: "JO",
    avatarColor: "bg-amber-500",
    online: true,
    lastMessage: "The API is ready for integration.",
    lastTime: "14m",
    unread: 1,
    messages: [
      { id: "1",  text: "Hey, quick heads up — the auth PR is ready for review.", time: "7:55 AM", sent: false },
      { id: "2",  text: "On it. Anything I should watch out for?", time: "8:00 AM", sent: true, read: true },
      { id: "3",  text: "The token refresh logic is a bit tricky — left a comment there.", time: "8:01 AM", sent: false },
      { id: "4",  text: "Got it. I'll start from that section.", time: "8:05 AM", sent: true, read: true },
      { id: "5",  text: "Also bumped the zod version. Should be backwards compatible.", time: "8:06 AM", sent: false },
      { id: "6",  text: "Noted. I'll check the schema changes.", time: "8:10 AM", sent: true, read: true },
      { id: "7",  text: "Good morning! Quick update — we finished the auth refactor.", time: "8:30 AM", sent: false },
      { id: "8",  text: "Awesome, how did the tests go?", time: "8:35 AM", sent: true, read: true },
      { id: "9",  text: "All passing. 94% coverage on the new flows.", time: "8:36 AM", sent: false },
      { id: "10", text: "That's solid work. When can we deploy to staging?", time: "8:40 AM", sent: true, read: true },
      { id: "11", text: "Tomorrow morning. The API is ready for integration.", time: "8:41 AM", sent: false },
    ],
  },
  {
    id: "3",
    name: "Priya Nair",
    handle: "Marketing Manager",
    avatar: "https://i.pravatar.cc/80?img=9",
    avatarFallback: "PN",
    avatarColor: "bg-emerald-500",
    online: false,
    lastMessage: "The campaign metrics are looking good 🚀",
    lastTime: "1h",
    unread: 0,
    messages: [
      { id: "1",  text: "We're wrapping up the Q3 campaign this week.", time: "Monday", sent: false },
      { id: "2",  text: "How's it tracking vs target?", time: "Monday", sent: true, read: true },
      { id: "3",  text: "Above target on leads, slightly under on paid conversions.", time: "Monday", sent: false },
      { id: "4",  text: "Still a solid result overall. What was the main channel?", time: "Monday", sent: true, read: true },
      { id: "5",  text: "LinkedIn drove the most qualified traffic. Email was close behind.", time: "Monday", sent: false },
      { id: "6",  text: "Good to know for Q4 planning. Keep that mix.", time: "Monday", sent: true, read: true },
      { id: "7",  text: "Definitely. I'm already drafting the Q4 brief.", time: "Monday", sent: false },
      { id: "8",  text: "Nice. Loop me in when it's ready to review.", time: "Monday", sent: true, read: true },
      { id: "9",  text: "The Q3 campaign just wrapped up. Overall a great result.", time: "Yesterday", sent: false },
      { id: "10", text: "What were the final numbers?", time: "Yesterday", sent: true, read: true },
      { id: "11", text: "CTR up 32%, conversions up 18% vs Q2. Really happy with it.", time: "Yesterday", sent: false },
      { id: "12", text: "That's a big jump. Well done to the team!", time: "Yesterday", sent: true, read: true },
      { id: "13", text: "The campaign metrics are looking good 🚀", time: "1h ago", sent: false },
    ],
  },
  {
    id: "4",
    name: "David Park",
    handle: "Head of Finance",
    avatar: "https://i.pravatar.cc/80?img=15",
    avatarFallback: "DP",
    avatarColor: "bg-indigo-500",
    online: false,
    lastMessage: "Invoice approved, payment scheduled.",
    lastTime: "3h",
    unread: 0,
    messages: [
      { id: "1",  text: "Can you share the latest headcount projections for Q4?", time: "9:00 AM", sent: false },
      { id: "2",  text: "Sure, sending them over now.", time: "9:05 AM", sent: true, read: true },
      { id: "3",  text: "Thanks. Also need the infra cost breakdown by service.", time: "9:06 AM", sent: false },
      { id: "4",  text: "That's in the shared doc — tab 3.", time: "9:08 AM", sent: true, read: true },
      { id: "5",  text: "Found it. EC2 is higher than expected.", time: "9:10 AM", sent: false },
      { id: "6",  text: "We migrated two services last month — should normalise soon.", time: "9:12 AM", sent: true, read: true },
      { id: "7",  text: "Understood. I'll note it as a temporary spike.", time: "9:14 AM", sent: false },
      { id: "8",  text: "Hi, I reviewed the Q3 budget report.", time: "10:00 AM", sent: false },
      { id: "9",  text: "Any concerns?", time: "10:05 AM", sent: true, read: true },
      { id: "10", text: "Nothing major. Infra spend is a bit high but within tolerance.", time: "10:06 AM", sent: false },
      { id: "11", text: "We can review the cloud spend next sprint.", time: "10:08 AM", sent: true, read: true },
      { id: "12", text: "Invoice approved, payment scheduled.", time: "10:10 AM", sent: false },
    ],
  },
  {
    id: "5",
    name: "Amara Diallo",
    handle: "Customer Success",
    avatar: "https://i.pravatar.cc/80?img=23",
    avatarFallback: "AD",
    avatarColor: "bg-teal-500",
    online: true,
    lastMessage: "The client loved the onboarding session!",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      { id: "1",  text: "Prepping for the Acme onboarding call this afternoon.", time: "Yesterday", sent: false },
      { id: "2",  text: "Do you need anything from me before it?", time: "Yesterday", sent: true, read: true },
      { id: "3",  text: "Could you send me the latest product changelog? They might ask about new features.", time: "Yesterday", sent: false },
      { id: "4",  text: "Done — just sent it to your inbox.", time: "Yesterday", sent: true, read: true },
      { id: "5",  text: "Perfect, thank you!", time: "Yesterday", sent: false },
      { id: "6",  text: "Good luck with the call!", time: "Yesterday", sent: true, read: true },
      { id: "7",  text: "Just finished the onboarding call with Acme Corp.", time: "Yesterday", sent: false },
      { id: "8",  text: "How did it go?", time: "Yesterday", sent: true, read: true },
      { id: "9",  text: "Really well — they had a lot of great questions about the API.", time: "Yesterday", sent: false },
      { id: "10", text: "Did they mention any blockers?", time: "Yesterday", sent: true, read: true },
      { id: "11", text: "None actually. They're ready to go live next week.", time: "Yesterday", sent: false },
      { id: "12", text: "That's great news!", time: "Yesterday", sent: true, read: true },
      { id: "13", text: "The client loved the onboarding session!", time: "Yesterday", sent: false },
    ],
  },
  {
    id: "6",
    name: "Elena Kim",
    handle: "Frontend Engineer",
    avatar: "https://i.pravatar.cc/80?img=20",
    avatarFallback: "EK",
    avatarColor: "bg-cyan-500",
    online: true,
    lastMessage: "The build is green, ready to merge.",
    lastTime: "30m",
    unread: 2,
    messages: [
      { id: "1",  text: "Just pushed the fixes for the table sorting bug.", time: "9:10 AM", sent: false },
      { id: "2",  text: "Nice, was it the column index issue?", time: "9:12 AM", sent: true, read: true },
      { id: "3",  text: "Exactly — the comparator wasn't handling nulls.", time: "9:13 AM", sent: false },
      { id: "4",  text: "Good catch. Add a test for that case.", time: "9:14 AM", sent: true, read: true },
      { id: "5",  text: "Already done. Three new edge case tests.", time: "9:15 AM", sent: false },
      { id: "6",  text: "Love it. PR looks clean.", time: "9:20 AM", sent: true, read: true },
      { id: "7",  text: "Also fixed the flicker on initial load while I was in there.", time: "9:21 AM", sent: false },
      { id: "8",  text: "That one's been annoying me for weeks. Thank you!", time: "9:22 AM", sent: true, read: true },
      { id: "9",  text: "The build is green, ready to merge.", time: "9:30 AM", sent: false },
      { id: "10", text: "Merging now!", time: "9:31 AM", sent: true, read: true },
    ],
  },
  {
    id: "7",
    name: "Tom Rivera",
    handle: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/80?img=52",
    avatarFallback: "TR",
    avatarColor: "bg-slate-500",
    online: false,
    lastMessage: "Prod deploy went smooth. No issues.",
    lastTime: "2h",
    unread: 0,
    messages: [
      { id: "1",  text: "Heads up — rolling out the infra changes at 2pm.", time: "1:30 PM", sent: false },
      { id: "2",  text: "Got it. I'll keep an eye on the dashboards.", time: "1:32 PM", sent: true, read: true },
      { id: "3",  text: "Good. Should be seamless but just in case.", time: "1:33 PM", sent: false },
      { id: "4",  text: "How long do you expect the rollout to take?", time: "1:35 PM", sent: true, read: true },
      { id: "5",  text: "About 15 minutes. Blue-green so no downtime.", time: "1:36 PM", sent: false },
      { id: "6",  text: "Perfect setup. Ping me when it's done.", time: "1:37 PM", sent: true, read: true },
      { id: "7",  text: "Deploy started.", time: "2:01 PM", sent: false },
      { id: "8",  text: "Watching the metrics now.", time: "2:02 PM", sent: true, read: true },
      { id: "9",  text: "Prod deploy went smooth. No issues.", time: "2:15 PM", sent: false },
      { id: "10", text: "Great work. Thanks for the heads up.", time: "2:16 PM", sent: true, read: true },
    ],
  },
  {
    id: "8",
    name: "Mei Lin",
    handle: "Head of Engineering",
    avatar: "https://i.pravatar.cc/80?img=47",
    avatarFallback: "ML",
    avatarColor: "bg-rose-500",
    online: true,
    lastMessage: "Let's ship it end of sprint.",
    lastTime: "4h",
    unread: 0,
    messages: [
      { id: "1",  text: "How are we tracking on the roadmap?", time: "10:00 AM", sent: false },
      { id: "2",  text: "On track for the core features. Stretch goals are 50/50.", time: "10:05 AM", sent: true, read: true },
      { id: "3",  text: "Which stretch goal is at risk?", time: "10:06 AM", sent: false },
      { id: "4",  text: "The export feature — ran into some PDF library issues.", time: "10:08 AM", sent: true, read: true },
      { id: "5",  text: "Can we cut scope on it for this sprint?", time: "10:09 AM", sent: false },
      { id: "6",  text: "Yes — CSV export is done, we can push PDF to next sprint.", time: "10:11 AM", sent: true, read: true },
      { id: "7",  text: "That works. Stakeholders mainly need the data, format is secondary.", time: "10:12 AM", sent: false },
      { id: "8",  text: "Agreed. I'll update the sprint board.", time: "10:14 AM", sent: true, read: true },
      { id: "9",  text: "Let's ship it end of sprint.", time: "10:15 AM", sent: false },
    ],
  },
  {
    id: "9",
    name: "Noah Williams",
    handle: "QA Engineer",
    avatar: "https://i.pravatar.cc/80?img=60",
    avatarFallback: "NW",
    avatarColor: "bg-lime-600",
    online: false,
    lastMessage: "Found two more bugs in the checkout flow.",
    lastTime: "Yesterday",
    unread: 4,
    messages: [
      { id: "1",  text: "Running through the regression suite now.", time: "Yesterday", sent: false },
      { id: "2",  text: "How many tests in the suite?", time: "Yesterday", sent: true, read: true },
      { id: "3",  text: "About 340. Should finish in 2 hours.", time: "Yesterday", sent: false },
      { id: "4",  text: "Any failures so far?", time: "Yesterday", sent: true, read: true },
      { id: "5",  text: "Two flaky tests on the payment step. Might be timing issues.", time: "Yesterday", sent: false },
      { id: "6",  text: "Mark them as flaky for now and log a ticket.", time: "Yesterday", sent: true, read: true },
      { id: "7",  text: "Done. Suite finished — 96% pass rate.", time: "Yesterday", sent: false },
      { id: "8",  text: "That's acceptable. What failed?", time: "Yesterday", sent: true, read: true },
      { id: "9",  text: "Three tests in the checkout flow. Repro confirmed.", time: "Yesterday", sent: false },
      { id: "10", text: "Logging tickets now. Thanks for the thorough run.", time: "Yesterday", sent: true, read: true },
      { id: "11", text: "Found two more bugs in the checkout flow.", time: "Yesterday", sent: false },
    ],
  },
  {
    id: "10",
    name: "Layla Hassan",
    handle: "Content Strategist",
    avatar: "https://i.pravatar.cc/80?img=44",
    avatarFallback: "LH",
    avatarColor: "bg-violet-500",
    online: true,
    lastMessage: "Blog post is live! 🎉",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      { id: "1",  text: "Finished the first draft of the product launch post.", time: "Yesterday", sent: false },
      { id: "2",  text: "Awesome! What's the angle?", time: "Yesterday", sent: true, read: true },
      { id: "3",  text: "Focusing on the developer experience improvements. Very hands-on.", time: "Yesterday", sent: false },
      { id: "4",  text: "That should resonate well. Who's the target reader?", time: "Yesterday", sent: true, read: true },
      { id: "5",  text: "Technical founders and senior engineers.", time: "Yesterday", sent: false },
      { id: "6",  text: "Good segmentation. Any CTAs?", time: "Yesterday", sent: true, read: true },
      { id: "7",  text: "Start free trial + link to the API docs.", time: "Yesterday", sent: false },
      { id: "8",  text: "Clean. I'll review it tonight.", time: "Yesterday", sent: true, read: true },
      { id: "9",  text: "Sent you the shared doc link.", time: "Yesterday", sent: false },
      { id: "10", text: "Left some comments — mainly small wording tweaks.", time: "Yesterday", sent: true, read: true },
      { id: "11", text: "All addressed! Submitting for final review.", time: "Yesterday", sent: false },
      { id: "12", text: "Approved. Ready to publish.", time: "Yesterday", sent: true, read: true },
      { id: "13", text: "Blog post is live! 🎉", time: "Yesterday", sent: false },
    ],
  },
  {
    id: "11",
    name: "Ryan Murphy",
    handle: "Sales Manager",
    avatar: "https://i.pravatar.cc/80?img=33",
    avatarFallback: "RM",
    avatarColor: "bg-orange-500",
    online: false,
    lastMessage: "",
    lastTime: "",
    unread: 0,
    messages: [],
  },
  {
    id: "12",
    name: "Isabel Torres",
    handle: "UX Researcher",
    avatar: "https://i.pravatar.cc/80?img=38",
    avatarFallback: "IT",
    avatarColor: "bg-fuchsia-500",
    online: true,
    lastMessage: "Can we schedule a user interview session?",
    lastTime: "5m",
    unread: 1,
    messages: [
      { id: "1", text: "Hey! Can we schedule a user interview session this week?", time: "11:20 AM", sent: false },
    ],
  },
  {
    id: "13",
    name: "Marcus Rivera",
    handle: "Backend Engineer",
    avatar: "https://i.pravatar.cc/80?img=56",
    avatarFallback: "MR",
    avatarColor: "bg-blue-500",
    online: true,
    lastMessage: "Sure, I'll take a look.",
    lastTime: "20m",
    unread: 0,
    messages: [
      { id: "1", text: "Hey, could you review my PR when you get a chance?", time: "11:00 AM", sent: true, read: true },
      { id: "2", text: "Sure, I'll take a look.", time: "11:02 AM", sent: false },
    ],
  },
  {
    id: "14",
    name: "Fatima Al-Amin",
    handle: "Growth Manager",
    avatar: "https://i.pravatar.cc/80?img=41",
    avatarFallback: "FA",
    avatarColor: "bg-amber-600",
    online: false,
    lastMessage: "",
    lastTime: "",
    unread: 0,
    messages: [],
  },
  {
    id: "15",
    name: "Chris Watkins",
    handle: "Data Analyst",
    avatar: "https://i.pravatar.cc/80?img=68",
    avatarFallback: "CW",
    avatarColor: "bg-sky-500",
    online: false,
    lastMessage: "Shared the report in Drive.",
    lastTime: "3d",
    unread: 0,
    messages: [
      { id: "1", text: "Do you have the retention data for last month?", time: "3 days ago", sent: true, read: true },
      { id: "2", text: "Shared the report in Drive.", time: "3 days ago", sent: false },
    ],
  },
  {
    id: "16",
    name: "Arjun Mehta",
    handle: "Solutions Architect",
    avatar: "https://i.pravatar.cc/80?img=57",
    avatarFallback: "AM",
    avatarColor: "bg-green-600",
    online: false,
    lastMessage: "",
    lastTime: "",
    unread: 0,
    messages: [],
  },
  {
    id: "17",
    name: "Zara O'Brien",
    handle: "Legal Counsel",
    avatar: "https://i.pravatar.cc/80?img=49",
    avatarFallback: "ZO",
    avatarColor: "bg-red-500",
    online: false,
    lastMessage: "Contract is ready for signatures.",
    lastTime: "1w",
    unread: 0,
    messages: [
      { id: "1", text: "Contract is ready for signatures.", time: "1 week ago", sent: false },
    ],
  },
]

// ─── Conversation item ────────────────────────────────────────────────────────

const ConversationItem = ({
  conv,
  active,
  onClick,
}: {
  conv: Conversation
  active: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
      active ? "bg-muted" : "hover:bg-muted/60"
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
  </button>
)

// ─── Message bubble ───────────────────────────────────────────────────────────

const Bubble = ({ msg, conv }: { msg: Message; conv: Conversation }) => (
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const ChatPage = () => {
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const active = conversations.find(c => c.id === activeId)!

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeId, active.messages.length])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setConversations(prev => prev.map(c =>
      c.id === activeId
        ? {
            ...c,
            lastMessage: text,
            lastTime: "now",
            messages: [...c.messages, {
              id: String(Date.now()),
              text,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              sent: true,
              read: false,
            }],
          }
        : c
    ))
    setInput("")
  }

  return (
    <div className="flex h-[calc(100svh-4rem-1px)] -m-4 md:-m-6 overflow-hidden">

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <div className="flex w-72 shrink-0 flex-col border-r bg-card">
        <div className="px-4 py-4 border-b space-y-3">
          <h2 className="text-base font-semibold">Messages</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {filtered.map(conv => (
            <ConversationItem
              key={conv.id}
              conv={conv}
              active={conv.id === activeId}
              onClick={() => setActiveId(conv.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Thread ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b bg-card px-4 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarImage src={active.avatar} alt={active.name} />
                <AvatarFallback className={cn("text-xs font-semibold text-white", active.avatarColor)}>
                  {active.avatarFallback}
                </AvatarFallback>
              </Avatar>
              {active.online && (
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">{active.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {active.online ? "Online" : active.handle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2">
                  <UserRound className="h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Search className="h-4 w-4" />
                  Search in Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <BellOff className="h-4 w-4" />
                  Mute Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Clear Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  <MessageSquareX className="h-4 w-4" />
                  Block Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {active.messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={active.avatar} alt={active.name} />
                  <AvatarFallback className={cn("text-sm font-semibold text-white", active.avatarColor)}>
                    {active.avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{active.handle}</p>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs">
                This is the beginning of your conversation with {active.name}. Say hello!
              </p>
            </div>
          ) : (
            active.messages.map(msg => (
              <Bubble key={msg.id} msg={msg} conv={active} />
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-card px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              className="h-9 text-sm"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 shrink-0" onClick={sendMessage} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChatPage
