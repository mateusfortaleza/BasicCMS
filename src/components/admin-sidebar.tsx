import Link from "next/link";
import {
  RiDashboardLine,
  RiHomeLine,
  RiImageLine,
  RiSettings3Line,
} from "@remixicon/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    label: "Settings",
    href: "/settings",
    icon: RiSettings3Line,
  },
];

/**
 * Renders the admin sidebar with a logo header, primary navigation links, and a bottom "View Site" link.
 *
 * The sidebar is styled for responsive layouts: it displays a fixed logo area at the top, maps navigation items
 * into navigable buttons, and shows a full-width "View Site" control at the bottom on medium and larger screens.
 *
 * @returns A JSX element representing the admin sidebar.
 */
export function AdminSidebar() {
  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground flex shrink-0 flex-col border-b md:min-h-screen md:w-64 md:border-r md:border-b-0">
      <div className="flex h-20 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-sm font-semibold">
          {/* <span className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md">
            CMS
          </span> */}
          <Image src="/logo.png" width={170} height={80} alt="BasicCMS Logo" />
        </Link>
      </div>

      <Separator />

      <nav className="flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className="h-10 justify-start gap-2 rounded-md px-3"
            >
              <Link href={item.href}>
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto hidden p-2 md:block">
        <Separator className="mb-2" />
        <Button asChild variant="ghost" className="h-10 w-full justify-start gap-2 rounded-md px-3">
          <Link href="/">
            <RiHomeLine className="size-4" />
            <span>View Site</span>
          </Link>
        </Button>
      </div>
    </aside>
  );
}
