// app/(main)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Providers } from "./providers";
import { Appsidebar } from "@/components/layout/AppSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Appsidebar />
      <div className="flex min-h-screen w-full">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
