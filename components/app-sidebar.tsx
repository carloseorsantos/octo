"use client";

import * as React from "react";
import {
  PenSquare,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Octo (Beta)</span>
                </div>
              </a>
            </SidebarMenuButton>
            <SidebarTrigger className="-ml-1" />
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
