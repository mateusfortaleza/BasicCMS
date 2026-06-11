"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  RiDashboardLine,
  RiImageLine,
  RiMenu2Fill,
  RiSettings3Line,
  RiTranslate2,
  RiLayout3Line,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-provider";

type SidebarLanguage = {
  id: string;
  language: string;
  langCode: string;
};

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
    label: "Content Type",
    href: "/content-type",
    icon: RiLayout3Line
  }
];

export function AdminSidebar({ languages }: { languages: SidebarLanguage[] }) {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const pathname = usePathname();
  const isHeroCardEditPage = pathname.startsWith("/herocard/edit/");

  useEffect(() => {
    if (!selectedLanguage && languages[0]) {
      setSelectedLanguage(languages[0].langCode);
    }
  }, [languages, selectedLanguage, setSelectedLanguage]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <Image
                  src="/cms-logo.png"
                  width={170}
                  height={80}
                  alt="BasicCMS Logo"
                  className="h-25 ml-2 mt-2 w-45 group-data-[collapsible=icon]:hidden"
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
        <SidebarSeparator />
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <label
              htmlFor="sidebar-language"
              className="mb-2 block px-3 text-xs font-medium text-sidebar-foreground/70"
            >
              Language
            </label>
            <Select
              value={selectedLanguage || languages[0]?.langCode}
              onValueChange={setSelectedLanguage}
              disabled={isHeroCardEditPage}
            >
              <SelectTrigger id="sidebar-language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent position="popper">
                {languages.map((language) => (
                  <SelectItem key={language.id} value={language.langCode}>
                    {language.language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <RiSettings3Line />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
