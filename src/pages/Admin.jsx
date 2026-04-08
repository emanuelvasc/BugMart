import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Shield, AlertTriangle } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ERRO: Dados sensíveis expostos
    setUsuarios([
      {
        id: 1,
        nome: "Admin",
        email: "admin@loja.com",
        senha: "admin123",
        role: "admin",
      },
      {
        id: 2,
        nome: "João",
        email: "joao@email.com",
        senha: "123456",
        role: "user",
      },
      {
        id: 3,
        nome: "Maria",
        email: "maria@email.com",
        senha: "senha123",
        role: "user",
      },
    ]);
    setLoading(false);

    // 🐛 ALERTA FALSO APÓS 5 SEGUNDOS
    const timer = setTimeout(() => {
      alert("❌ Erro ao carregar a página... Tente novamente mais tarde");
    }, 3000);

    // Limpar timer se o usuário sair da página antes
    return () => clearTimeout(timer);
  }, []);

  // ERRO: Rota não protegida adequadamente
  if (user?.role !== "admin") {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <AlertTriangle className="inline mr-2" />
          Acesso negado. Área administrativa.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-red-600" />
        <h1 className="text-3xl font-bold">Administração</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Usuários do Sistema</h2>
          {/* ERRO: Informação sensível exposta */}
          <p className="text-sm text-red-600 mt-1">
            ⚠️ Dados sensíveis visíveis
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center">Carregando...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Nome</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Senha</th>
                <th className="px-6 py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-t">
                  <td className="px-6 py-4">{usuario.id}</td>
                  <td className="px-6 py-4">{usuario.nome}</td>
                  <td className="px-6 py-4">{usuario.email}</td>
                  <td className="px-6 py-4 font-mono text-sm">
                    {usuario.senha}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${usuario.role === "admin" ? "bg-red-100 text-red-700" : "bg-gray-100"}`}
                    >
                      {usuario.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ERRO: Funcionalidade que não funciona */}
      <div className="mt-6 bg-yellow-50 border border-yellow-400 rounded p-4">
        <h3 className="font-bold mb-2">⚠️ Configurações do Sistema</h3>
        <button
          onClick={() => {
            // ERRO: Botão sem ação
            console.log("Funcionalidade em desenvolvimento");
            alert("Erro inesperado");
          }}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Backup do Sistema (Não funciona)
        </button>
      </div>

      {/* 🐛 Mensagem de erro falsa adicional */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Última atualização: {new Date().toLocaleString()}
        </p>
        <p className="text-xs text-red-500 mt-1">
          ⚠️ Sistema instável - Faça backup dos dados
        </p>
      </div>
    </div>
  );
}
