import { useState, useEffect } from "react";
import { fetchData } from "../lib/supabase";
import {
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVendas: 0,
    totalProdutos: 0,
    totalClientes: 0,
    totalPedidos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [notificacao, setNotificacao] = useState("");

  useEffect(() => {
    loadData();

    // ERRO: Notificações aleatórias
    const interval = setInterval(() => {
      const mensagens = [
        "🎉 Promoção relâmpago!",
        "⚠️ Estoque baixo de alguns produtos",
        "💡 Dica: Atualize seus dados",
        "🎁 Frete grátis nas compras acima de R$200",
        "⚠️ Erro desconhecido no sistema",
      ];
      setNotificacao(mensagens[Math.floor(Math.random() * mensagens.length)]);

      setTimeout(() => setNotificacao(""), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    // ERRO: Carregamento lento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const produtos = await fetchData("produtos");
    const clientes = await fetchData("clientes");

    setStats({
      totalProdutos: produtos.length,
      totalClientes: clientes.length,
      totalVendas: Math.floor(Math.random() * 50000),
      totalPedidos: Math.floor(Math.random() * 500),
    });
    setLoading(false);
  };

  // ERRO: undefined aparecendo na tela
  const valorInvalido = undefined;

  return (
    <div className="container-principal p-6">
      {notificacao && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notificacao}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* ERRO: Valor undefined sendo exibido */}
      <div className="mb-4 p-3 bg-gray-100 rounded">
        Debug: {valorInvalido?.teste}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Vendas Totais</p>
              <p className="text-2xl font-bold">
                {loading ? "..." : `R$ ${stats.totalVendas.toLocaleString()}`}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Produtos</p>
              <p className="text-2xl font-bold">
                {loading ? "..." : stats.totalProdutos}
              </p>
            </div>
            <Package className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Clientes</p>
              <p className="text-2xl font-bold">
                {loading ? "..." : stats.totalClientes}
              </p>
            </div>
            <Users className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pedidos</p>
              <p className="text-2xl font-bold">
                {loading ? "..." : stats.totalPedidos}
              </p>
            </div>
            <ShoppingCart className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* ERRO: Gráfico simples sem dados reais */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Vendas Recentes</h2>
        <div className="flex items-end space-x-2 h-64">
          {[45, 62, 38, 71, 55, 83, 68].map((valor, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500 rounded-t"
              style={{ height: `${valor}%` }}
            >
              <div className="text-center text-sm mt-2">Dia {i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
