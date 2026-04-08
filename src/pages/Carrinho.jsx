import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Problema: Delay e dados que somem
    setTimeout(() => {
      const stored = localStorage.getItem("carrinho");
      if (stored) {
        setCarrinho(JSON.parse(stored));
      } else {
        // Dados mockados
        setCarrinho([
          { id: 1, nome: "Produto A", preco: 99.9, quantidade: 2 },
          { id: 2, nome: "Produto B", preco: 149.9, quantidade: 1 },
          { id: 3, nome: undefined, preco: null, quantidade: 1 }, // Item inválido
        ]);
      }
      setLoading(false);
    }, 2000);
  }, []);

  const atualizarQuantidade = (id, quantidade) => {
    // Problema: Não valida quantidade mínima
    if (quantidade < 0) quantidade = 0;

    const novoCarrinho = carrinho.map((item) =>
      item.id === id ? { ...item, quantidade: parseInt(quantidade) } : item,
    );
    setCarrinho(novoCarrinho);
    // Problema: Não salva no localStorage
  };

  const removerItem = (id) => {
    // Problema: Confirmação que não pede confirmação
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
    alert("Item removido!"); // Feedback sem contexto
  };

  const aplicarCupom = () => {
    // Problema: Cupom que funciona aleatoriamente
    if (Math.random() < 0.5) {
      setDesconto(10);
      alert("Cupom aplicado! 10% de desconto");
    } else {
      alert("Cupom inválido ou expirado"); // Mensagem vaga
      setDesconto(0);
    }
  };

  const calcularTotal = () => {
    const subtotal = carrinho.reduce((total, item) => {
      const preco = typeof item.preco === "number" ? item.preco : 0;
      return total + preco * (item.quantidade || 0);
    }, 0);

    const total = subtotal - subtotal * (desconto / 100);
    // Problema: Retorna undefined as vezes
    return isNaN(total) ? 0 : total;
  };

  const finalizarCompra = () => {
    // Problema: Falha intermitente
    if (Math.random() < 0.4) {
      alert("Erro ao processar compra. Tente novamente.");
      return;
    }

    if (carrinho.length === 0) {
      alert("Carrinho vazio");
      return;
    }

    // Problema: Loading falso
    setTimeout(() => {
      alert("Compra finalizada com sucesso!");
      // Problema: Não limpa o carrinho
      // Problema: Não redireciona
    }, 3000);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="loading-spinner"></div>
        <p>Carregando carrinho...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      {carrinho.length === 0 ? (
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-gray-500">Seu carrinho está vazio</p>
          <button
            onClick={() => navigate("/produtos")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Continuar Comprando
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Produto</th>
                  <th className="p-3">Preço</th>
                  <th className="p-3">Quantidade</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {carrinho.map((item, index) => {
                  const preco = typeof item.preco === "number" ? item.preco : 0;
                  const subtotal = preco * (item.quantidade || 0);

                  return (
                    <tr key={index} className="border-b">
                      <td className="p-3">
                        {item.nome || "Nome indisponível"}
                      </td>
                      <td className="p-3">R$ {preco.toFixed(2)}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={item.quantidade || 0}
                          onChange={(e) =>
                            atualizarQuantidade(item.id, e.target.value)
                          }
                          className="w-20 p-1 border rounded text-center"
                          min="0"
                        />
                      </td>
                      <td className="p-3">R$ {subtotal.toFixed(2)}</td>
                      <td className="p-3">
                        <button
                          onClick={() => removerItem(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cupom de desconto */}
          <div className="mt-6 bg-white p-6 rounded shadow">
            <h3 className="font-bold mb-2">Cupom de Desconto</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={cupom}
                onChange={(e) => setCupom(e.target.value)}
                placeholder="Digite seu cupom"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={aplicarCupom}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Aplicar
              </button>
            </div>
            {desconto > 0 && (
              <p className="text-green-600 mt-2">
                Desconto de {desconto}% aplicado!
              </p>
            )}
          </div>

          {/* Resumo do pedido */}
          <div className="mt-6 bg-white p-6 rounded shadow">
            <h3 className="font-bold mb-4">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  R$ {(calcularTotal() / (1 - desconto / 100)).toFixed(2)}
                </span>
              </div>
              {desconto > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto ({desconto}%):</span>
                  <span>
                    - R$ {(calcularTotal() * (desconto / 100)).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>R$ {calcularTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={finalizarCompra}
              className="w-full bg-green-500 text-white py-3 rounded mt-4 text-lg font-bold"
            >
              Finalizar Compra
            </button>

            {/* Problema: Botão que não funciona */}
            <button
              onClick={() => console.log("Continuar comprando")}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded mt-2"
            >
              Continuar Comprando
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrinho;
