export default function ProductsPage() {
  return (
    <div>
      <h1>Produtos</h1>
      <p>Bem-vindo à sua página de produtos!</p>
      <a
        href="/categorias"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition">
        Ir para categorias
      </a>
    </div>
  );
}
