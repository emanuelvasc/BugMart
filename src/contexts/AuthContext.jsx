import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ERRO: Sessão inconsistente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // ERRO: Memory leak - setInterval não limpo
    setInterval(() => {
      console.log("Verificando sessão...");
      if (Math.random() > 0.8) {
        // ERRO: Sessão expira aleatoriamente
        localStorage.removeItem("user");
        setUser(null);
      }
    }, 30000);
  }, []);

  // ERRO: Login aceita qualquer credencial
  const login = async (email, password) => {
    // ERRO: Validação fraca
    if (!email || !password) {
      return { error: "Erro inesperado" };
    }

    // ERRO: Aceita qualquer senha para admin
    if (email === "admin@loja.com") {
      const user = { id: 1, name: "Admin", email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { data: user };
    }

    // ERRO: Aceita qualquer credencial às vezes
    if (email.includes("@") && password.length > 0) {
      const user = { id: 2, name: email.split("@")[0], email, role: "user" };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { data: user };
    }

    return { error: "Algo deu errado" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // ERRO: Não redireciona corretamente
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
