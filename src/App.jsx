import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Vendas from "./pages/Vendas";
import Admin from "./pages/Admin";
import EditarDados from "./pages/EditarDados";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/produtos"
                element={
                  <ProtectedRoute>
                    <Produtos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clientes"
                element={
                  <ProtectedRoute>
                    <Clientes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendas"
                element={
                  <ProtectedRoute>
                    <Vendas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editar-dados"
                element={
                  <ProtectedRoute>
                    <EditarDados />
                  </ProtectedRoute>
                }
              />
              {/* ERRO: Rota 404 quebrada */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
