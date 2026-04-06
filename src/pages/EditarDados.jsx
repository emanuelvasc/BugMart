import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Save, RefreshCw } from "lucide-react";

export default function EditarDados() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // ERRO: Carregamento lento de dados
      setTimeout(() => {
        setFormData({
          nome: user.name || "",
          email: user.email || "",
          telefone: "(11) 99999-9999",
          endereco: "Rua Exemplo, 123",
        });
      }, 1000);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ERRO: Validação ausente
    // ERRO: Simulação de lentidão
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // ERRO: Dados não persistem após recarregar
    localStorage.setItem("userData", JSON.stringify(formData));
    setMessage("Dados salvos com sucesso! (mas não realmente)");
    setLoading(false);

    // ERRO: Mensagem some após 5 segundos
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Dados</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nome Completo</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Telefone</label>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Endereço</label>
            <textarea
              value={formData.endereco}
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Alterações
              </>
            )}
          </button>
        </form>

        {/* ERRO: Informação de debug exposta */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <p className="font-mono">Debug: {JSON.stringify(user)}</p>
        </div>
      </div>
    </div>
  );
}
