import { MainSidebar } from '@/components/dashboard/main-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/dashboard/ui/sidebar'
import React from 'react'
import DashboardPage from './dashboard'

const Page = () => {
  return (
    <>
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
        {/* {children} */}
        <DashboardPage/>
        </div>
    </div>
    </SidebarProvider>
    </>
  )
}

export default Page