'use client'
import { Separator } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { AccountSidebar } from "./_partials/AccountSidebar"
import AppContextProvider from "@/helpers/contexts/AppContextProvider"
import PrivateView from "@/views/privateView"


const sidebarNavItems = [
    {
        title: "Account",
        href: "/account",
    },
    {
        title: "Appearance",
        href: "/account/appearance",
    },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
    <AppContextProvider>
        <PrivateView>

            <div className="hidden md:block mx-auto w-full max-w-[80%] pt-6">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className=" lg:w-1/5">
                        <AccountSidebar items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </PrivateView>
    </AppContextProvider>
    </>
  )
}