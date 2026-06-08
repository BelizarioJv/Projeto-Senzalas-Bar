import { SidebarTrigger } from "@/components/ui/sidebar"; // ajuste o caminho conforme seu setup
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-start p-">
      <div>
        {/* Trigger do shadcn */}
        <SidebarTrigger className="flex items-center m-3 px-3 py-2 gap-10 rounded-md bg-gray-800 hover:bg-gray-700 transition">
          <Menu size={20} />
        </SidebarTrigger>
      </div>

      {/* Logo / Título */}
      <h1 className="text-lg font-bold">SenzalasApp</h1>
    </header>
  );
}
