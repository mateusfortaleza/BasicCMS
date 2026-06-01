"use client";

import Link from "next/link";
import {
  RiDashboardLine,
  RiHomeLine,
  RiImageLine,
  RiMenu2Fill,
  RiSettings3Line,
  RiTranslate2,
} from "@remixicon/react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: RiDashboardLine,
  },
  {
    label: "Hero Cards",
    href: "/herocard",
    icon: RiImageLine,
  },
  {
    label: "Menu",
    href: "/menu",
    icon: RiMenu2Fill,
  },
  {
    label: "Languages",
    href: "/language",
    icon: RiTranslate2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: RiSettings3Line,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={170}
                  height={80}
                  alt="BasicCMS Logo"
                  className="h-15 ml-8 w-auto group-data-[collapsible=icon]:hidden"
                  loading="eager"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <RiHomeLine />
                <span>View Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
