"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  PenSquare,
  Shell,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./CustomNavUser/nav-user";

const data = {
  user: {
    name: "Caducodes",
    email: "cadu@caducodes.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "New chat",
      url: "/chat",
      icon: PenSquare,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 justify-center items-center">
            <SidebarMenuButton size="lg" asChild>
              <a href="/chat">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Shell className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Octo</span>
                  {/* <span className="">beta</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
        <NavUser />
    </Sidebar>
  );
}
