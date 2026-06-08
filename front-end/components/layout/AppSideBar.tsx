"use client";

import {
  Package,
  ShoppingCart,
  DollarSign,
  Truck,
  LayoutDashboard,
  Lightbulb,
} from "lucide-react";
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={`bg-gray-900 ${open ? "w-64" : "w-16"}`}>
      <SidebarHeader className="p-4 border-b border-gray-700">
        {open && <h2 className="text-xl font-bold">Menu</h2>}
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-4 p-2 justify-center items-center">
        <SidebarGroup>
          <ul className="space-y-2">
            <li>
              <a
                href="/produtos"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition">
                <Package size={20} /> {open && "Produtos"}
              </a>
            </li>
          </ul>
        </SidebarGroup>

        <SidebarGroup>
          <ul className="space-y-2">
            <li>
              <a
                href="/compra"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition">
                <ShoppingCart size={20} /> {open && "Compra"}
              </a>
            </li>
          </ul>
        </SidebarGroup>

        <SidebarGroup>
          <ul className="space-y-2">
            <li>
              <a
                href="/venda"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition">
                <DollarSign size={20} /> {open && "Venda"}
              </a>
            </li>
          </ul>
        </SidebarGroup>

        <SidebarGroup>
          <ul className="space-y-2">
            <li>
              <a
                href="/fornecedores"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition">
                <Truck size={20} /> {open && "Fornecedores"}
              </a>
            </li>
          </ul>
        </SidebarGroup>

        <SidebarGroup>
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition">
                <LayoutDashboard size={20} /> {open && "Dashboard"}
              </a>
            </li>
          </ul>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-5 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
        <h3 className="text-sm text-gray-300 font-medium">
          Versão do software:
          <span className="ml-2 text-white font-semibold">1.0.0</span>
        </h3>
        <button className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 transition">
          <Lightbulb className="text-gray-900" size={20} />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
