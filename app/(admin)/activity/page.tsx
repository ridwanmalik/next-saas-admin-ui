import {
  LogIn, LogOut, Upload, Trash2, Settings, Shield, CreditCard,
  UserPlus, KeyRound, AlertTriangle, CheckCircle2, RefreshCw,
  FileText, Bell, Download, Lock, Unlock, Zap,
} from "lucide-react"
import { ActivityTimeline, type TimelineItem } from "@/components/ui/activity-timeline"

const ACTIVITY_ITEMS: TimelineItem[] = [
  {
    id: "1",
    icon: LogIn,
    title: "Signed in",
    description: "Successful login from Chrome on macOS · IP 192.168.1.1",
    timestamp: "Just now",
    status: "success",
  },
  {
    id: "2",
    icon: Upload,
    title: "File uploaded",
    description: "product-roadmap-2026.pdf (4.2 MB) uploaded to Documents.",
    timestamp: "5 min ago",
    status: "info",
  },
  {
    id: "3",
    icon: UserPlus,
    title: "New team member invited",
    description: "Invitation sent to sarah.chen@company.com with Editor role.",
    timestamp: "18 min ago",
    status: "info",
  },
  {
    id: "4",
    icon: Zap,
    title: "API limit warning",
    description: "API usage crossed 80% of the monthly quota. Consider upgrading your plan.",
    timestamp: "1 hr ago",
    status: "warning",
  },
  {
    id: "5",
    icon: CheckCircle2,
    title: "Deployment succeeded",
    description: "Version 2.4.1 deployed to production. All health checks passed.",
    timestamp: "2 hr ago",
    status: "success",
  },
  {
    id: "6",
    icon: Settings,
    title: "Settings updated",
    description: "Notification preferences changed — email digests disabled.",
    timestamp: "3 hr ago",
    status: "default",
  },
  {
    id: "7",
    icon: AlertTriangle,
    title: "Failed login attempt",
    description: "3 consecutive failed login attempts detected from IP 203.0.113.42.",
    timestamp: "4 hr ago",
    status: "error",
  },
  {
    id: "8",
    icon: Shield,
    title: "Two-factor authentication enabled",
    description: "2FA was enabled using an authenticator app.",
    timestamp: "Yesterday, 5:42 PM",
    status: "success",
  },
  {
    id: "9",
    icon: KeyRound,
    title: "Password changed",
    description: "Account password updated successfully.",
    timestamp: "Yesterday, 3:15 PM",
    status: "success",
  },
  {
    id: "10",
    icon: CreditCard,
    title: "Plan upgraded",
    description: "Subscription upgraded from Free to Pro plan. Billing starts today.",
    timestamp: "Yesterday, 11:00 AM",
    status: "success",
  },
  {
    id: "11",
    icon: Download,
    title: "Report exported",
    description: "Q3 Analytics report exported as CSV (1,240 rows).",
    timestamp: "2 days ago",
    status: "info",
  },
  {
    id: "12",
    icon: Trash2,
    title: "Project deleted",
    description: "Project 'Old Website Redesign' and all its tasks were permanently deleted.",
    timestamp: "2 days ago",
    status: "error",
  },
  {
    id: "13",
    icon: Bell,
    title: "Notification rules updated",
    description: "Mention alerts enabled for all projects.",
    timestamp: "3 days ago",
    status: "default",
  },
  {
    id: "14",
    icon: Lock,
    title: "Session expired",
    description: "Inactive session automatically signed out after 30 minutes.",
    timestamp: "3 days ago",
    status: "warning",
  },
  {
    id: "15",
    icon: RefreshCw,
    title: "API key rotated",
    description: "Production API key was rotated. Old key is now revoked.",
    timestamp: "4 days ago",
    status: "info",
  },
  {
    id: "16",
    icon: Unlock,
    title: "Account unlocked",
    description: "Account was unlocked by an administrator after security review.",
    timestamp: "5 days ago",
    status: "success",
  },
  {
    id: "17",
    icon: FileText,
    title: "Terms of service accepted",
    description: "Updated terms accepted for version 3.1.",
    timestamp: "1 week ago",
    status: "default",
  },
  {
    id: "18",
    icon: LogOut,
    title: "Signed out",
    description: "Manual sign-out from all active sessions.",
    timestamp: "1 week ago",
    status: "default",
  },
]

const ActivityPage = () => (
  <div className="max-w-2xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Activity</h2>
      <p className="text-muted-foreground">A full log of account and system events.</p>
    </div>
    <div className="rounded-xl border bg-card p-6">
      <ActivityTimeline items={ACTIVITY_ITEMS} />
    </div>
  </div>
)

export default ActivityPage
