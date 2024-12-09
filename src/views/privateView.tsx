"use client";

import AppFooter from "@/components/common/Footer/AppFooter";
import AppHeader from "@/components/common/Header/AppHeader";
import { AppSideBar } from "@/components/common/Sidebar/AppSidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import isAuthenticated from "@/lib/isAuthenticated";
import { cn } from "@/lib/utils";

const PrivateView = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const sidebar = useSidebar()
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;

  return (
    <>
      <AppSideBar />
      <div
        className={cn(
          " transition-[margin-left] ease-in-out duration-300 relative",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        <AppHeader />
        <main className="bg-zinc-50 dark:bg-zinc-900 min-h-[calc(100vh_-_56px)]">
          {children}
        </main>
        <footer
          className={cn(
            "transition-[margin-left] ease-in-out duration-300",
            'absolute bottom-0 left-0 w-full'
          )}
        >
          <AppFooter />
        </footer>
      </div>
    </>
  );
}

export default isAuthenticated(PrivateView)