import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      return { error: "Email e senha são obrigatórios" };
    }

    // Buscar usuário no cadastro
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === password,
    );

    if (usuarioEncontrado) {
      const userData = {
        id: usuarioEncontrado.id,
        name: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        role: usuarioEncontrado.role || "user",
        provider: "email",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { data: userData };
    }

    // Login admin especial
    if (email === "admin@loja.com") {
      const userData = {
        id: 1,
        name: "Admin",
        email,
        role: "admin",
        provider: "email",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { data: userData };
    }

    return { error: "Email ou senha inválidos" };
  };

  const googleLogin = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Verificar se usuário Google já existe
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        let googleUser = usuarios.find((u) => u.provider === "google");

        if (!googleUser) {
          // Criar usuário Google automaticamente
          googleUser = {
            id: Date.now(),
            nome: "Usuário Google",
            email: "usuario.google@gmail.com",
            senha: "",
            provider: "google",
            role: "user",
            dataCriacao: new Date().toISOString(),
          };
          usuarios.push(googleUser);
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        const userData = {
          id: googleUser.id,
          name: googleUser.nome,
          email: googleUser.email,
          role: "user",
          provider: "google",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        resolve({ data: userData });
      }, 1500);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
