import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Store } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ERRO: setTimeout desnecessário
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = await login(email, password);

    if (result.error) {
      // ERRO: Mensagem vaga
      setError("Erro inesperado. Tente novamente.");
      setLoading(false);
    } else {
      // ERRO: Redirecionamento inconsistente
      navigate("/");
      // ERRO: Duplo redirecionamento
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-center mb-6">
          <Store className="w-16 h-16 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Sistema Comercial
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            {/* ERRO: Input sem validação */}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Digite seu email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* ERRO: Informação útil ausente */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Teste: admin@loja.com (qualquer senha)
        </p>
      </div>
    </div>
  );
}
