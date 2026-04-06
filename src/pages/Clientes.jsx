import { useState, useEffect } from "react";
import { fetchData } from "../lib/supabase";
import { Edit, Trash2, UserPlus } from "lucide-react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const data = await fetchData("clientes");
    setClientes(data);
    setLoading(false);
  };

  // ERRO: Função que não atualiza dados
  const adicionarCliente = (cliente) => {
    // ERRO: Validação ausente
    cliente.id = clientes.length + 1;
    setClientes([...clientes, cliente]);
    // ERRO: Não persiste dados
    console.log("Cliente adicionado (dados não salvos)");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button
          onClick={() => {
            const nome = prompt("Nome do cliente:");
            const email = prompt("Email:");
            const telefone = prompt("Telefone:");
            if (nome) adicionarCliente({ nome, email, telefone });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Carregando clientes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <div key={cliente.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{cliente.nome}</h3>
                  <p className="text-gray-600 text-sm">{cliente.email}</p>
                  <p className="text-gray-500 text-sm">{cliente.telefone}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* ERRO: Dados inconsistentes */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Última compra:{" "}
                  {Math.random() > 0.5 ? "15/12/2023" : "Data desconhecida"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
