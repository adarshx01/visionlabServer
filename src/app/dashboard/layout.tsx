import type React from "react"
// import "@/styles/globals.css"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <MainSidebar />
            <div className="flex-1">
              <div className="border-b">
                <div className="flex h-16 items-center gap-4 px-4">
                  <SidebarTrigger />
                  <div className="font-semibold">Dashboard</div>
                </div>
              </div>
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
