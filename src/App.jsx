import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Vendas from "./pages/Vendas";
import Admin from "./pages/Admin";
import EditarDados from "./pages/EditarDados";
// Apenas as páginas que você adicionou
import Perfil from "./pages/Perfil";
import Carrinho from "./pages/Carrinho";
import Pedidos from "./pages/Pedidos";
import Configuracoes from "./pages/Configuracoes";
import Suporte from "./pages/Suporte";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading-spinner"></div>
        <p className="ml-3">Carregando sistema...</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
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
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editar/:id"
              element={
                <ProtectedRoute>
                  <EditarDados />
                </ProtectedRoute>
              }
            />

            {/* NOVAS ROTAS - APENAS AS QUE VOCÊ ADICIONOU */}
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carrinho"
              element={
                <ProtectedRoute>
                  <Carrinho />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pedidos"
              element={
                <ProtectedRoute>
                  <Pedidos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/configuracoes"
              element={
                <ProtectedRoute>
                  <Configuracoes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/suporte"
              element={
                <ProtectedRoute>
                  <Suporte />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
