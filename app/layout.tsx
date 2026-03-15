import type { Metadata } from "next"
import { Geist, Geist_Mono, Funnel_Display } from "next/font/google"
import { ThemeProvider } from "@/components/providers"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Next SaaS",
  description: "Modern SaaS Admin Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply stored color theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e=document.documentElement;var ct=localStorage.getItem('color-theme');if(ct&&ct!=='zinc')e.setAttribute('data-color-theme',ct);var st=localStorage.getItem('surface-theme');if(st&&st!=='default')e.setAttribute('data-surface-theme',st)}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${funnelDisplay.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
