import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/admin-sidebar";
import { getAllLanguages } from "@/dal/LanguageDTO";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";

const dmSansHeading = DM_Sans({subsets:['latin'],variable:'--font-heading',preload: false});

const inter = Inter({subsets:['latin'],variable:'--font-sans',preload: false});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false
});

export const metadata: Metadata = {
  title: "Basic_CMS",
  description: "Basic_CMS Homepage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const languages = await getAllLanguages();
  return (
    <>
    <html
      lang="en"
      className={cn("dark", "h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, dmSansHeading.variable)}
    >
      <body className="min-h-full">
        <TooltipProvider>
          <LanguageProvider>
            <SidebarProvider>
              <AdminSidebar languages={languages} />
              <SidebarInset>
                <header className="flex h-12 shrink-0 items-center border-b px-4 md:px-6">
                  <SidebarTrigger />
                </header>
                <div className="min-w-0 flex-1 p-4 md:p-6">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </LanguageProvider>
        </TooltipProvider>
      </body>
    </html>
    </>
  );
}
