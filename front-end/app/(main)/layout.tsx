import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "../globals.css";

// 1. Inicializa as fontes e define suas respectivas variáveis CSS
const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Senzalas Bar",
  description: "App Senzalas bar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      // 2. Injeta as variáveis de fonte na tag HTML
      className={cn(
        "h-full w-full antialiased",
        notoSans.variable,
        playfairDisplayHeading.variable,
        geistMono.variable,
      )}>
      {/* 3. Aplica a classe font-sans no body (garantindo consistência) */}
      <body className="min-h-screen font-sans bg-background text-foreground">
        <Providers>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
