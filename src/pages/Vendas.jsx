import { useState, useEffect } from "react";
import { fetchData } from "../lib/supabase";
import { ShoppingCart, CreditCard } from "lucide-react";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [cliente, setCliente] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    const data = await fetchData("produtos");
    setProdutos(data);
  };

  const adicionarAoCarrinho = (produto) => {
    // ERRO: Permite adicionar sem verificar estoque
    setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
  };

  const finalizarVenda = async () => {
    setLoading(true);
    // ERRO: setTimeout desnecessário
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (carrinho.length === 0) {
      alert("Erro inesperado");
      setLoading(false);
      return;
    }

    // ERRO: Não valida dados do cliente
    const venda = {
      id: Date.now(),
      cliente: cliente || "Cliente não identificado",
      itens: carrinho,
      total: carrinho.reduce(
        (sum, item) => sum + item.preco * item.quantidade,
        0,
      ),
      data: new Date(),
    };

    console.log("Venda finalizada:", venda);
    alert(`Venda finalizada! Total: R$ ${venda.total.toFixed(2)}`);
    setCarrinho([]);
    setCliente("");
    setLoading(false);

    // ERRO: Não salva a venda em lugar nenhum
  };

  const total = carrinho.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0,
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Vendas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Produtos</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <p className="font-semibold">{produto.nome}</p>
                  <p className="text-sm text-gray-600">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Carrinho de Compras</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome do cliente (opcional)"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {carrinho.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
          ) : (
            <>
              <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                {carrinho.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <div>
                      <p className="font-semibold">{item.nome}</p>
                      <p className="text-sm">
                        Qtd: 1 | R$ {item.preco.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setCarrinho(carrinho.filter((_, i) => i !== index))
                      }
                      className="text-red-600 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                <button
                  onClick={finalizarVenda}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Processando..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Finalizar Venda
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
