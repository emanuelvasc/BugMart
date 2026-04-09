import React, { useState } from "react";

function Suporte() {
  const [form, setForm] = useState({
    assunto: "",
    mensagem: "",
    prioridade: "media",
    anexo: null,
  });
  const [enviando, setEnviando] = useState(false);
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      usuario: "Suporte",
      mensagem: "Olá! Como podemos ajudar?",
      data: "2026-01-15 10:00",
      lida: true,
    },
    {
      id: 2,
      usuario: "Você",
      mensagem: "Preciso de ajuda com meu pedido",
      data: "2026-01-15 10:05",
      lida: true,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const enviarMensagem = (e) => {
    e.preventDefault();

    if (!form.mensagem.trim()) {
      alert("Digite uma mensagem");
      return;
    }

    setEnviando(true);

    // Problema: Delay e falha intermitente
    setTimeout(() => {
      if (Math.random() < 0.3) {
        alert("Erro ao enviar mensagem. Tente novamente.");
        setEnviando(false);
        return;
      }

      const novaMensagem = {
        id: mensagens.length + 1,
        usuario: "Você",
        mensagem: form.mensagem,
        data: new Date().toLocaleString(),
        lida: true,
      };

      setMensagens([...mensagens, novaMensagem]);
      setForm({ ...form, mensagem: "" });

      // Problema: Resposta automática que não responde
      setTimeout(() => {
        const resposta = {
          id: mensagens.length + 2,
          usuario: "Suporte",
          mensagem: "Recebemos sua mensagem. Em breve retornaremos o contato.",
          data: new Date().toLocaleString(),
          lida: false,
        };
        setMensagens((prev) => [...prev, resposta]);
      }, 5000);

      setEnviando(false);
    }, 3000);
  };

  const abrirChat = () => {
    // Problema: Chat que não abre
    alert("Chat ao vivo indisponível no momento");
  };

  const verificarStatus = () => {
    // Problema: Status que não carrega
    const loadingDiv = document.createElement("div");
    loadingDiv.innerHTML = "Carregando...";
    document.body.appendChild(loadingDiv);

    setTimeout(() => {
      loadingDiv.remove();
      alert("Sistema operacional. Status: Online");
    }, 2000);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Suporte ao Cliente</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat de suporte */}
        <div className="lg:col-span-2 bg-white rounded shadow">
          <div className="border-b p-4 bg-gray-50">
            <h2 className="font-bold">Chat de Suporte</h2>
            <p className="text-sm text-gray-600">Converse com nossa equipe</p>
          </div>

          <div className="h-96 overflow-y-auto p-4">
            {mensagens.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${msg.usuario === "Você" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.usuario === "Você"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm font-bold mb-1">{msg.usuario}</p>
                  <p>{msg.mensagem}</p>
                  <p className="text-xs mt-1 opacity-75">{msg.data}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={enviarMensagem} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border rounded"
              />
              <button
                type="submit"
                disabled={enviando}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>

        {/* Informações de suporte */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold mb-3">Atendimento</h3>
            <p className="text-sm text-gray-600 mb-2">
              📞 Telefone: (32) 4000-0000
            </p>
            <p className="text-sm text-gray-600 mb-2">
              📧 Email: suporte@bugmart.com
            </p>
            <p className="text-sm text-gray-600">
              ⏰ Horário: Seg-Sex, 9h às 18h
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold mb-3">FAQ - Perguntas Frequentes</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">
                  Como rastrear meu pedido?
                </p>
                <p className="text-sm text-gray-600">
                  Acesse a seção "Meus Pedidos" no menu.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">
                  Qual o prazo de entrega?
                </p>
                <p className="text-sm text-gray-600">
                  Consulte o frete no carrinho.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm">
                  Como cancelar uma compra?
                </p>
                <p className="text-sm text-gray-600">
                  Entre em contato com o suporte.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold mb-3">Abrir Chamado</h3>
            <select
              name="assunto"
              value={form.assunto}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Selecione o assunto</option>
              <option value="pedido">Problemas com pedido</option>
              <option value="pagamento">Problemas com pagamento</option>
              <option value="produto">Problemas com produto</option>
              <option value="outro">Outros</option>
            </select>
            <select
              name="prioridade"
              value={form.prioridade}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="baixa">Baixa prioridade</option>
              <option value="media">Média prioridade</option>
              <option value="alta">Alta prioridade</option>
            </select>
            <button
              onClick={() => alert("Funcionalidade em desenvolvimento")}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Abrir Chamado
            </button>
          </div>

          {/* Botões que não funcionam */}
          <button
            onClick={abrirChat}
            className="w-full bg-purple-500 text-white py-3 rounded font-bold"
          >
            💬 Chat ao vivo
          </button>

          <button
            onClick={verificarStatus}
            className="w-full bg-gray-500 text-white py-2 rounded text-sm"
          >
            Verificar Status do Sistema
          </button>
        </div>
      </div>

      {/* Problema: Avaliação do atendimento */}
      <div className="mt-8 bg-yellow-50 p-4 rounded border border-yellow-200">
        <p className="text-sm text-center text-gray-600">
          Avalie nosso atendimento:
          <button className="ml-2 text-yellow-500">★</button>
          <button className="ml-1 text-yellow-500">★</button>
          <button className="ml-1 text-yellow-500">★</button>
          <button className="ml-1 text-gray-300">★</button>
          <button className="ml-1 text-gray-300">★</button>
        </p>
      </div>
    </div>
  );
}

export default Suporte;
