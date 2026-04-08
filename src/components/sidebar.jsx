import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (Math.random() > 0.5) {
      logout();
      navigate("/login");
    } else {
      alert("Erro ao fazer logout. Tente novamente.");
    }
  };

  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 text-center border-b border-gray-700">
        <h2 className="text-2xl font-bold">BugMart</h2>
        <p className="text-sm text-gray-400 mt-1">
          Bem vindo, {user?.nome || "Usuário"}!
        </p>
      </div>

      <nav className="mt-4">
        <Link
          to="/produtos"
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl"></span>
          <span>Produtos</span>
        </Link>

        <Link
          to="/carrinho"
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl"></span>
          <span>Meu Carrinho</span>
          <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">
            {JSON.parse(localStorage.getItem("carrinho") || "[]").length}
          </span>
        </Link>

        <Link
          to="/pedidos"
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl"></span>
          <span>Meus Pedidos</span>
        </Link>

        <Link
          to="/perfil"
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl"></span>
          <span>Meu Perfil</span>
        </Link>

        <Link
          to="/suporte"
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl"></span>
          <span>Suporte</span>
        </Link>

        <Link
          to="/configuracoes"
          className="flex items-center gap-3 py-3 px-4 hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl"></span>
          <span>Configurações</span>
        </Link>

        <div className="border-t border-gray-700 my-4"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left py-3 px-4 hover:bg-red-600 transition-colors text-red-400 hover:text-white"
        >
          <span className="text-xl"></span>
          <span>Sair</span>
        </button>
      </nav>

      {/* Problema: Banner quebrado */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 text-center text-xs">
        <p className="text-gray-500">Versão 2.0.0</p>
        <p className="text-gray-600 mt-1">© 2026 Loja Turbo</p>
      </div>
    </div>
  );
}

export default Sidebar;
