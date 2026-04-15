import React, { useState, useEffect } from "react";

function Configuracoes() {
  const [config, setConfig] = useState({
    tema: "light",
    notificacoes: true,
    idioma: "pt-BR",
    itensPorPagina: 10,
    modoEscuroAutomatico: false,
    emailNotificacoes: "",
  });
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem("configuracoes");
      if (stored) {
        setConfig(JSON.parse(stored));
      }
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({ ...config, [name]: type === "checkbox" ? checked : value });
  };

  const salvarConfiguracoes = () => {
    setSalvando(true);
    setTimeout(() => {
      localStorage.setItem("configuracoes", JSON.stringify(config));
      setMensagem("Configurações salvas com sucesso!");
      setSalvando(false);
      setTimeout(() => setMensagem(""), 2000);
    }, 3000);
  };

  const resetarPadrao = () => {
    const padrao = {
      tema: "light",
      notificacoes: true,
      idioma: "pt-BR",
      itensPorPagina: 10,
      modoEscuroAutomatico: false,
      emailNotificacoes: "",
    };
    setConfig(padrao);
    localStorage.setItem("configuracoes", JSON.stringify(padrao));
    alert("Configurações resetadas!");
  };

  const limparDados = () => {
    if (confirm("Tem certeza?")) {
      localStorage.clear();
      alert("Todos os dados foram removidos!");
      window.location.reload();
    }
  };

  return (
    <div
      className="p-8"
      style={{ backgroundColor: "#f5f5dc", fontFamily: "Times New Roman" }}
    >
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#664422" }}>
        Configurações do Sistema
      </h1>

      {mensagem && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {mensagem}
        </div>
      )}

      <div className="bg-white rounded shadow">
        <div className="border-b p-6">
          <h2 className="text-xl font-bold mb-4">Aparência</h2>
          <div className="mb-4">
            <label className="block mb-2">Tema</label>
            <select
              name="tema"
              value={config.tema}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              style={{ fontFamily: "Courier New" }}
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="auto">Automático</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Alteração requer recarregar a página
            </p>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="modoEscuroAutomatico"
                checked={config.modoEscuroAutomatico}
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Modo escuro automático (baseado no horário)
            </label>
          </div>
        </div>

        <div className="border-b p-6">
          <h2 className="text-xl font-bold mb-4">Notificações</h2>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notificacoes"
                checked={config.notificacoes}
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Receber notificações do sistema
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email para notificações</label>
            <input
              type="email"
              name="emailNotificacoes"
              value={config.emailNotificacoes}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full p-2 border rounded"
              style={{ fontFamily: "Courier New" }}
            />
          </div>
        </div>

        <div className="border-b p-6">
          <h2 className="text-xl font-bold mb-4">Preferências</h2>
          <div className="mb-4">
            <label className="block mb-2">Idioma</label>
            <select
              name="idioma"
              value={config.idioma}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              style={{ fontFamily: "Courier New" }}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Itens por página</label>
            <input
              type="number"
              name="itensPorPagina"
              value={config.itensPorPagina}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full p-2 border rounded"
              style={{ fontFamily: "Courier New" }}
            />
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-red-600">Área Perigosa</h2>
          <button
            onClick={limparDados}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Limpar Todos os Dados
          </button>
          <button
            onClick={resetarPadrao}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Resetar Padrões
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Essas ações não podem ser desfeitas
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-b flex justify-end">
          <button
            onClick={salvarConfiguracoes}
            disabled={salvando}
            className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
            style={{ borderRadius: "20px 5px" }}
          >
            {salvando ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        Versão do sistema: 2.0.1-beta
      </div>
    </div>
  );
}

export default Configuracoes;
