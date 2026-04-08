import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Perfil() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    dataNascimento: "",
    avatar: "",
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Problema: Delay artificial de 3 segundos
    setTimeout(() => {
      const stored = localStorage.getItem("perfil_usuario");
      if (stored) {
        setPerfil(JSON.parse(stored));
      } else {
        // Dados inconsistentes
        setPerfil({
          nome: user?.nome || undefined,
          email: user?.email || "sem-email",
          telefone: "telefone inválido", // String onde deveria ser número
          endereco: "",
          dataNascimento: "data inválida",
          avatar: "https://via.placeholder.com/150",
        });
      }
      setLoading(false);
    }, 3000);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Problema: Não valida dados
    localStorage.setItem("perfil_usuario", JSON.stringify(perfil));
    setMensagem("Perfil salvo com sucesso!");

    // Problema: Mensagem some e não mostra feedback visual direito
    setTimeout(() => setMensagem(""), 3000);

    // Problema: Não atualiza o contexto de usuário
    console.log("Perfil salvo mas não atualizado no sistema");
  };

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };

  const uploadAvatar = () => {
    // Problema: Função que não completa e trava

    // Gera erro no console
    const x = undefinedVariable;
    console.log(x.property);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

      {mensagem && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {mensagem}
          {/* Problema: Botão de fechar não funciona */}
          <button className="float-right">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar */}
        <div className="bg-white p-6 rounded shadow text-center">
          <img
            src={perfil.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
            // Problema: Imagem sem lazy loading
          />
          <button
            onClick={uploadAvatar}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Trocar Avatar
          </button>
          {/* Problema: Texto informativo sem sentido */}
          <p className="text-xs text-gray-400 mt-2">
            Avatar e foto de perfil são a mesma coisa
          </p>
        </div>

        {/* Formulário */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Dados Pessoais</h2>
            <button
              onClick={() => setEditando(!editando)}
              className="text-blue-500"
            >
              {editando ? "Cancelar" : "Editar"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={perfil.nome || ""}
                onChange={handleChange}
                disabled={!editando}
                className="w-full p-2 border rounded disabled:bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={perfil.email}
                onChange={handleChange}
                disabled={!editando}
                className="w-full p-2 border rounded disabled:bg-gray-100"
                // Problema: Aceita qualquer valor mesmo com type=email
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={perfil.telefone}
                onChange={handleChange}
                disabled={!editando}
                placeholder="(XX) XXXXX-XXXX"
                className="w-full p-2 border rounded disabled:bg-gray-100"
              />
              {/* Problema: Sem máscara e validação */}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Endereço</label>
              <textarea
                name="endereco"
                value={perfil.endereco}
                onChange={handleChange}
                disabled={!editando}
                rows="3"
                className="w-full p-2 border rounded disabled:bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={perfil.dataNascimento}
                onChange={handleChange}
                disabled={!editando}
                className="w-full p-2 border rounded disabled:bg-gray-100"
              />
            </div>

            {editando && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Salvar Alterações
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Problema: Seção de estatísticas que não carrega */}
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
        <div
          id="atividade-chart"
          style={{ height: "200px", backgroundColor: "#f0f0f0" }}
        >
          <p className="text-center pt-16 text-gray-500">
            Gráfico não disponível
          </p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
