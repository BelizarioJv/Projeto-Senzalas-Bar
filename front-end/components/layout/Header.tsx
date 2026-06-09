import { SidebarTrigger } from "@/components/ui/sidebar"; // ajuste o caminho conforme seu setup
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 flex items-center justify-start border-b border-border bg-background ">
      <div>
        {/* Trigger do shadcn */}
        <SidebarTrigger className="m-3 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground"></SidebarTrigger>
      </div>

      {/* Logo / Título */}
      <h1 className="text-lg font-bold text-foreground tracking-wide">
        Senzalas App
      </h1>
    </header>
  );
}
