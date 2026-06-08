import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSideBar";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senalas bar",
  description: "Dashoboard Senzalas bar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <html
        lang="pt-br"
        className={cn(
          "h-full",
          "w-full",
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          "font-sans",
          notoSans.variable,
          playfairDisplayHeading.variable,
        )}>
        <body className="min-h-screen bg-gray-950 text-white">
          <div className="flex min-h-screen w-full">
            <AppSidebar />

            <div className="flex-1 flex flex-col justify-center">
              <Header />

              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </SidebarProvider>
  );
}
