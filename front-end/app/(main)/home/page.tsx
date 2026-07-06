"use client";

import {
  Beer,
  ShoppingCart,
  TrendingUp,
  Users,
  BarChart3,
  Package,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient elegante */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-black to-black"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center space-y-8 px-4">
          {/* Ícone decorativo */}
          <div className="flex justify-center animate-bounce">
            <div className="p-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-2xl">
              <Beer size={48} className="text-white" />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <p className="text-amber-500 text-sm tracking-widest uppercase font-semibold">
              Bem-vindo ao
            </p>
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-white leading-tight">
              Senzalas
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                {" "}
                Bar
              </span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl mx-auto">
              Gerenciamento Inteligente para Seu Estabelecimento
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <a href="/dashboard" className="inline-block">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105">
                Entrar no App
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-black to-amber-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Funcionalidades Principais
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Grid de features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Produtos */}
            <div className="group relative bg-gradient-to-br from-amber-950/30 to-black border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="p-3 w-fit rounded-lg bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <Package size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Gestão de Produtos
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Controle completo do seu inventário de bebidas, petiscos e
                  itens do bar
                </p>
              </div>
            </div>

            {/* Card 2: Vendas */}
            <div className="group relative bg-gradient-to-br from-amber-950/30 to-black border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="p-3 w-fit rounded-lg bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <ShoppingCart size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Registro de Vendas
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Registre cada venda em tempo real com histórico detalhado e
                  rastreabilidade
                </p>
              </div>
            </div>

            {/* Card 3: Compras */}
            <div className="group relative bg-gradient-to-br from-amber-950/30 to-black border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="p-3 w-fit rounded-lg bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <TrendingUp size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Gestão de Compras
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Organize pedidos com fornecedores e controle seus custos de
                  operação
                </p>
              </div>
            </div>

            {/* Card 4: Fornecedores */}
            <div className="group relative bg-gradient-to-br from-amber-950/30 to-black border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="p-3 w-fit rounded-lg bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <Users size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Rede de Fornecedores
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Gerencie seus fornecedores e mantenha informações de contato
                  centralizadas
                </p>
              </div>
            </div>

            {/* Card 5: Dashboard */}
            <div className="group relative bg-gradient-to-br from-amber-950/30 to-black border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="p-3 w-fit rounded-lg bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <BarChart3 size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Dashboard Analítico
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Visualize métricas importantes e tome decisões baseadas em
                  dados
                </p>
              </div>
            </div>

            {/* Card 6: Insights */}
            <div className="group relative bg-gradient-to-br from-amber-950/30 to-black border border-amber-600/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 rounded-xl transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="p-3 w-fit rounded-lg bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <Beer size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Relatórios Detalhados
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Gere relatórios personalizados para acompanhar o desempenho do
                  seu bar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL SECTION */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comece a usar o Senzalas Bar agora e tenha controle total sobre suas
            operações
          </p>
          <div>
            <a href="/dashboard" className="inline-block">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105">
                Acessar Dashboard
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-amber-600/20 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>&copy; 2024 Senzalas Bar. Todos os direitos reservados.</p>
          <p>Versão 1.0.0</p>
        </div>
      </footer>
    </div>
  );
}
