import {
  Hospital,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "../ui/sidebar";
import { NavLink } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "~/lib/utils";


const overviewItems = [
  {
    title: "Perioder",
    url: "placeholder",
  },
  {
    title: "Perioder",
    url: "placeholder",
  },
  {
    title: "Adgangs styring",
    url: "placeholder",
  },
  {
    title: "Afsnit",
    url: "afsnit",
  },

  {
    title: "Personale Grupper",
    url: "placeholder",
  },

  {
    title: "Ansættelser",
    url: "placeholder",
  },
];

const menuItems = [
  {
    title: "Perioden Hjem",
    url: "placeholder",
  },

  {
    title: "Personale",
    url: "placeholder",
  },
  {
    title: "Funktioner",
    url: "placeholder",
  },
  {
    title: "Bemanding",
    url: "placeholder",
  },
  {
    title: "Kompetencer",
    url: "placeholder",
  },
  {
    title: "Ønske Muligheder",
    url: "placeholder",
  },
  {
    title: "Rulleplaner Hjem",
    url: "placeholder",
  },
  {
    title: "Ønsker (planlægger)",
    url: "placeholder",
  },

  {
    title: "Norm periode",
    url: "placeholder",
  },
];

const menuUserItems = [
  {
    title: "Perioden Hjem",
    url: "placeholder",
  },
  {
    title: "Ønsker",
    url: "placeholder",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="shadow-sm bg-white">
      <SidebarContent className="bg-white shadow-sm">
        <SidebarGroup>
        <Hospital size={40} className="mx-auto mb-2 text"/>
        <hr className="border-t-1 border-gray-300 w-full mx-auto mb-4" />
        
          <SidebarGroupLabel>
            <header className="flex items-center text-lg font-bold">
              1. Overblik (Home)
            </header>
          </SidebarGroupLabel>
          {overviewItems.map((item, i) => (
            <SidebarMenuButton key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "w-full justify-start pl-4",
                    }),
                    isActive && "bg-gray-200 text-primary font-semibold"
                  )
                }
              >
                {`1.${i + 1}`} {item.title}
              </NavLink>
            </SidebarMenuButton>
          ))}
          <SidebarGroupContent />
          <hr className="border-t-1 border-gray-300 w-full mx-auto mt-3" />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <header className="flex items-center text-lg font-bold">
              2. Menu (admin)
            </header>
          </SidebarGroupLabel>
          {menuItems.map((item, i) => (
            <SidebarMenuButton key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "w-full justify-start",
                    }),
                    isActive && "bg-gray-200"
                  )
                }
              >
                {`2.${i + 1}`} {item.title}
              </NavLink>
            </SidebarMenuButton>
          ))}
          <SidebarGroupContent />
          <hr className="border-t-1 border-gray-300 w-full mx-auto mt-3" />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <header className="flex items-center text-lg font-bold">
              3. Ønsker
            </header>
          </SidebarGroupLabel>
          {menuUserItems.map((item, i) => (
            <SidebarMenuButton key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "w-full justify-start pl-4",
                    }),
                    isActive && "bg-gray-200 text-primary font-semibold"
                  )
                }
              >
                {`3.${i + 1}`} {item.title}
              </NavLink>
            </SidebarMenuButton>
          ))}
          <SidebarGroupContent />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white border-t-1 border-gray-300">
        <div className="flex flex-row">
          <User />
          <span className="pl-3 font-bold">{"Darth Vader"}</span>
        </div>
        <Button variant={"destructive"} onClick={() => {}}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
