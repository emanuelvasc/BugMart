import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
  Edit,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // ERRO: Navegação inconsistente
  const handleLogout = () => {
    logout();
    // ERRO: Redirecionamento errado
    navigate("/login");
    // ERRO: Dupla navegação
    window.location.href = "/login";
  };

  return (
    <div className="sidebar-mobile w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">BugMart</h1>
        {/* ERRO: Texto misturando idiomas */}
        <p className="text-sm mt-2">
          {" "}
          "Onde os erros são parte da experiência"!
        </p>
      </div>

      <nav className="flex-1 mt-8">
        <Link
          to="/"
          className="flex items-center px-4 py-3 hover:bg-blue-800 transition"
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        <Link
          to="/produtos"
          className="flex items-center px-4 py-3 hover:bg-blue-800 transition"
        >
          <Package className="w-5 h-5 mr-3" />
          Produtos
        </Link>

        <Link
          to="/clientes"
          className="flex items-center px-4 py-3 hover:bg-blue-800 transition"
        >
          <Users className="w-5 h-5 mr-3" />
          Clientes
        </Link>

        <Link
          to="/vendas"
          className="flex items-center px-4 py-3 hover:bg-blue-800 transition"
        >
          <ShoppingBag className="w-5 h-5 mr-3" />
          Vendas
        </Link>

        {/* ERRO: Link que não funciona */}
        <a
          href="#"
          className="flex items-center px-4 py-3 hover:bg-blue-800 transition opacity-50"
        >
          <Settings className="w-5 h-5 mr-3" />
          Configurações (Em breve)
        </a>

        <Link
          to="/editar-dados"
          className="flex items-center px-4 py-3 hover:bg-blue-800 transition"
        >
          <Edit className="w-5 h-5 mr-3" />
          Editar Dados
        </Link>
      </nav>

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 hover:bg-blue-800 rounded transition"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
}
