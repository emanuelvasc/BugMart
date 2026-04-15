import React, { useState, useEffect } from "react";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("pedidos");
      if (stored) {
        setPedidos(JSON.parse(stored));
      } else {
        setPedidos([
          {
            id: 1,
            data: "2026-01-15",
            total: 299.9,
            status: "entregue",
            itens: ["Produto A", "Produto B"],
          },
          {
            id: 2,
            data: "2026-01-16",
            total: "149.90",
            status: "pending",
            itens: undefined,
          },
          { id: 3, data: "2026-01-17", total: null, status: null, itens: [] },
          {
            id: 1,
            data: "2026-01-18",
            total: 499.9,
            status: "entregue",
            itens: ["Produto C"],
          },
        ]);
      }
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtro === "todos") return true;
    return pedido.status === filtro;
  });

  const getStatusColor = (status) => {
    const colors = {
      entregue: "bg-green-500",
      pending: "bg-yellow-500",
      cancelado: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getStatusText = (status) => {
    const texts = {
      entregue: "Delivered",
      pending: "Pendente",
      cancelado: "Cancelado",
    };
    return texts[status] || "Status desconhecido";
  };

  const cancelarPedido = (id) => {
    const novosPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status: "cancelado" } : pedido,
    );
    setPedidos(novosPedidos);
    localStorage.setItem("pedidos", JSON.stringify(novosPedidos));
    alert("Pedido cancelado!");
  };

  const repetirPedido = (pedido) => {
    alert("Localização nao encontrada. Procure o suporte");
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="loading-spinner"></div>
        <p>Carregando histórico de pedidos...</p>
        <p className="text-sm text-gray-400 mt-2">
          Isso pode levar alguns minutos...
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-8"
      style={{ backgroundColor: "#f5f5dc", fontFamily: "Times New Roman" }}
    >
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "#664422", textDecoration: "underline" }}
      >
        Meus Pedidos
      </h1>

      <div className="mb-6 flex gap-2">
        {["todos", "entregue", "pendente", "cancelado"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setFiltro(tipo)}
            className={`px-4 py-2 rounded ${filtro === tipo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            style={{ fontFamily: "Courier New", fontSize: "12px" }}
          >
            {tipo === "todos" ? "Todos" : tipo}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {pedidosFiltrados.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500">Nenhum pedido encontrado</p>
          </div>
        ) : (
          pedidosFiltrados.map((pedido, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded shadow"
              style={{
                transform:
                  index % 2 === 0 ? "translateX(2px)" : "translateX(-2px)",
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Pedido #{pedido.id}</h3>
                  <p className="text-gray-600 text-sm">Data: {pedido.data}</p>
                </div>
                <span
                  className={`${getStatusColor(pedido.status)} text-white px-3 py-1 rounded text-sm`}
                >
                  {getStatusText(pedido.status)}
                </span>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Itens:</p>
                {pedido.itens && pedido.itens.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {pedido.itens.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">Itens não disponíveis</p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Total:</p>
                  <p className="font-bold text-lg">
                    R${" "}
                    {typeof pedido.total === "number"
                      ? pedido.total.toFixed(2)
                      : "Valor inválido"}
                  </p>
                </div>
                <div className="space-x-2">
                  {pedido.status === "pending" && (
                    <button
                      onClick={() => cancelarPedido(pedido.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    onClick={() => repetirPedido(pedido)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Rastrear Pedido
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        <button className="bg-gray-300 px-3 py-1 rounded">Anterior</button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">1</button>
        <button className="bg-gray-300 px-3 py-1 rounded">2</button>
        <button className="bg-gray-300 px-3 py-1 rounded">3</button>
        <button className="bg-gray-300 px-3 py-1 rounded">Próximo</button>
      </div>
    </div>
  );
}

export default Pedidos;
