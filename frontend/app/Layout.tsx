import { Outlet } from "react-router-dom"
import { AppSidebar } from "./components/common/AppSideBar"
import { SidebarProvider } from "./components/ui/sidebar"

export default function Layout() {
  return (
    <SidebarProvider>
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex flex-col items-center w-full min-h-screen">
            <Outlet />
          </div>
        </div>
    </SidebarProvider>
  );
}
