import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import Produtos from "./pages/Produtos";
import Perfil from "./pages/Perfil";
import Carrinho from "./pages/Carrinho";
import Pedidos from "./pages/Pedidos";
import Configuracoes from "./pages/Configuracoes";
import Suporte from "./pages/Suporte";
import Sobre from "./pages/Sobre";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
            <Route path="/criar-conta" element={<CriarConta />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Produtos />
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

            <Route
              path="/sobre"
              element={
                <ProtectedRoute>
                  <Sobre />
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
