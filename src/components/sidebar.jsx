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
    <div className="bg-blue-700 text-white w-64 min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold">BugMart</h2>
        <p className="text-sm text-gray-400">
          Bem vindo, {user?.nome || "Usuário!"}
        </p>
      </div>

      <nav className="mt-8">
        {/* Menu Principal */}
        <div className="px-4 py-2 text-xs text-gray-400 uppercase">
          Principal
        </div>
        <Link to="/" className="block py-2 px-4 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/produtos" className="block py-2 px-4 hover:bg-gray-700">
          Produtos
        </Link>
        <Link to="/clientes" className="block py-2 px-4 hover:bg-gray-700">
          Clientes
        </Link>
        <Link to="/vendas" className="block py-2 px-4 hover:bg-gray-700">
          Vendas
        </Link>

        {/* Seção Minha Conta - PÁGINAS QUE VOCÊ ADICIONOU */}
        <div className="px-4 py-2 mt-4 text-xs text-gray-400 uppercase">
          Minha Conta
        </div>
        <Link to="/perfil" className="block py-2 px-4 hover:bg-gray-700">
          Meu Perfil
        </Link>
        <Link to="/pedidos" className="block py-2 px-4 hover:bg-gray-700">
          Meus Pedidos
        </Link>
        <Link to="/carrinho" className="block py-2 px-4 hover:bg-gray-700">
          Carrinho
        </Link>

        {/* Seção Sistema */}
        <div className="px-4 py-2 mt-4 text-xs text-gray-400 uppercase">
          Sistema
        </div>
        <Link to="/configuracoes" className="block py-2 px-4 hover:bg-gray-700">
          Configurações
        </Link>
        <Link to="/suporte" className="block py-2 px-4 hover:bg-gray-700">
          Suporte
        </Link>
        <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700">
          Admin
        </Link>

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 text-white py-2 px-4 hover:bg-red-600"
        >
          Sair
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
