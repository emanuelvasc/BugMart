import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ERRO: Loading inconsistente
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  }

  // ERRO: Rota protegida falhando às vezes
  if (!user && Math.random() > 0.3) {
    return <Navigate to="/login" replace />;
  }

  // ERRO: Permite acesso mesmo sem login em alguns casos
  return children;
}
