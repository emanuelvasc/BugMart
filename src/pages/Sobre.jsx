import React, { useState, useEffect } from "react";

function Sobre() {
  const [loading, setLoading] = useState(true);
  const [contadorVisitas, setContadorVisitas] = useState(0);
  const [equipe, setEquipe] = useState([]);

  useEffect(() => {
    // Delay artificial para teste de performance
    setTimeout(() => {
      // Dados da equipe com problemas intencionais
      setEquipe([
        {
          id: 1,
          nome: "Ana Silva",
          cargo: "CEO & Fundadora",
          imagem: "https://randomuser.me/api/portraits/women/1.jpg",
          descricao: "Fundadora da BugMart com mais de 10 anos de experiência",
          redeSocial: "@anabugmart",
        },
        {
          id: 2,
          nome: "Carlos Santos",
          cargo: "Diretor de Operações",
          imagem:
            "https://cdn.prod.website-files.com/655255a32a2b91a7971b548f/67057b742d928da5525f4abf_Seguro-de-vida-02.webp",
          descricao: "Ligado as operações diárias da BugMart",
          redeSocial: "@carlosbugmart",
        },
        {
          id: 3,
          nome: undefined, // Problema: nome undefined
          cargo: "Desenvolvedor",
          imagem: "",
          descricao: "Responsável pelo desenvolvimento do site",
          redeSocial: "@devbugmart",
        },
        {
          id: 2, // ID duplicado proposital
          nome: "Mariana Costa",
          cargo: "Atendimento ao Cliente",
          imagem: "https://randomuser.me/api/portraits/women/3.jpg",
          descricao: "Especialista em experiência do cliente",
          redeSocial: "@maribugmart",
        },
      ]);
      setLoading(false);
    }, 2500);

    // Contador de visitas (problema: não persiste)
    const visitas = localStorage.getItem("sobre_visitas");
    if (visitas) {
      setContadorVisitas(parseInt(visitas) + 1);
      localStorage.setItem("sobre_visitas", parseInt(visitas) + 1);
    } else {
      setContadorVisitas(1);
      localStorage.setItem("sobre_visitas", 1);
    }

    // 🟢 ALERTA APÓS 3 SEGUNDOS (problema intencional)
    const alertaTimer = setTimeout(() => {
      alert(
        "Bem-vindo a BugMart! Conheça nossas promoções especiais na página inicial!",
      );
    }, 3000);

    return () => clearTimeout(alertaTimer);
  }, []);

  const valores = [
    {
      titulo: "Qualidade",
      descricao: "Produtos selecionados com os melhores padrões",
    },
    {
      titulo: "Inovação",
      descricao: undefined, // Problema: descrição undefined
    },
    {
      titulo: "Compromisso",
      descricao: null, // Problema: descrição null
    },
    {
      titulo: "Sustentabilidade",
      descricao: "Comprometidos com o meio ambiente",
    },
  ];

  const enviarEmail = () => {
    // Problema: Botão que não funciona direito
    alert(
      "Funcionalidade em desenvolvimento. Envie um email para contato@bugmart.com",
    );
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="loading-spinner mx-auto"></div>
        <p className="text-center mt-4">Carregando informações...</p>
        <p className="text-center text-sm text-gray-400 mt-2">
          Conhecendo a loja que ama bugs!
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Cabeçalho da página */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4"></div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Sobre a BugMart
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Conheça nossa história, missão e os valores que nos movem
        </p>
      </div>

      {/* Contador de visitas com problema */}
      <div className="bg-gray-100 p-3 rounded-lg text-center mb-8">
        <p className="text-sm text-gray-600">
          Esta página já foi visitada {contadorVisitas} vezes
        </p>
        <p className="text-xs text-gray-400 mt-1"></p>
      </div>

      {/* Seção de História */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl"></span>
          <h2 className="text-2xl font-bold text-gray-800">Nossa História</h2>
        </div>
        <div className="space-y-4 text-gray-600">
          <p>
            A <strong>BugMart</strong> nasceu em 2020 com o sonho de
            revolucionar a forma como as pessoas compram online, mesmo com
            alguns bugs pelo caminho! Começamos como um pequeno negócio e hoje
            somos referência em qualidade e atendimento (quando o sistema não
            está com problemas).
          </p>
          <p>
            Nossa jornada é marcada pela inovação constante e pelo compromisso
            com a satisfação dos nossos clientes. Cada produto em nosso catálogo
            é cuidadosamente selecionado para garantir a melhor experiência de
            compra, mesmo que o site tenha algumas falhas intencionais para
            teste.
          </p>
          {/* Problema: Informação duplicada */}
          <p className="text-gray-400 text-sm">
            *Fundada em 2020, a BugMart completa 6 anos de mercado em 2026
          </p>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <span className="text-4xl block mb-3">🎯</span>
          <h3 className="text-xl font-bold mb-2">Missão</h3>
          <p className="text-gray-600">
            Oferecer produtos de qualidade com preços acessíveis e atendimento
            excepcional
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <span className="text-4xl block mb-3">👁️</span>
          <h3 className="text-xl font-bold mb-2">Visão</h3>
          <p className="text-gray-600">
            Ser referência em e-commerce na América Latina até 2030
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <span className="text-4xl block mb-3">💎</span>
          <h3 className="text-xl font-bold mb-2">Valores</h3>
          <ul className="text-gray-600 text-left list-disc list-inside">
            {valores.map((valor, index) => (
              <li key={index}>
                <strong>{valor.titulo}:</strong>{" "}
                {valor.descricao || "Descrição em breve"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Equipe */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl"></span>
          <h2 className="text-2xl font-bold text-gray-800">Nossa Equipe</h2>
          {/* Problema: Mensagem de erro */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipe.map((membro, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-center"
            >
              <img
                src={
                  membro.imagem ||
                  "https://diasadvocaciaservidores.com/wp-content/uploads/2023/07/Funcionario-Publico-pode-ter-Empresa-1024x683.jpg"
                }
                alt={membro.nome || "Membro da equipe"}
                className="w-32 h-32 rounded-full mx-auto mt-6 object-cover"
                loading="eager"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {membro.nome || "Diego Bouzada"}
                </h3>
                <p className="text-blue-600 text-sm mb-2">{membro.cargo}</p>
                <p className="text-gray-600 text-sm">
                  {membro.descricao || "Descrição em breve..."}
                </p>
                {membro.redeSocial && (
                  <p className="text-gray-400 text-xs mt-2">
                    {membro.redeSocial}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diferenciais */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Por que escolher a BugMart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-3xl block mb-2">🚚</span>
            <p className="font-semibold">Frete Grátis</p>
            <p className="text-sm opacity-75">Para compras acima de R$200</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">💳</span>
            <p className="font-semibold">Parcele em até 12x</p>
            <p className="text-sm opacity-75">Sem juros no cartão</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">🔒</span>
            <p className="font-semibold">Compra Segura</p>
            <p className="text-sm opacity-75">Site protegido e confiável</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">⭐</span>
            <p className="font-semibold">Garantia de Qualidade</p>
            <p className="text-sm opacity-75">Produtos originais e testados</p>
          </div>
        </div>
      </div>

      {/* Contato */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl"></span>
          <h2 className="text-2xl font-bold text-gray-800">Fale Conosco</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> contato@bugmart.com
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Telefone:</strong> (32) 4000-0000
            </p>
            <p className="text-gray-600 mb-2">
              <strong>WhatsApp:</strong> (32) 9 9999-9999
            </p>
            <p className="text-gray-600">
              <strong>Endereço:</strong> Rua Tiradentes, 404 - Muriaé, MG
            </p>
          </div>
          <div>
            <button
              onClick={enviarEmail}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Enviar Mensagem
            </button>
            {/* Problema: Botão que não funciona */}
            <button
              onClick={() => {
                alert("Redirecionando para o WhatsApp...");
                setTimeout(() => {
                  alert("Erro ao conectar. Tente novamente.");
                }, 1500);
              }}
              className="w-full bg-green-500 text-white py-2 rounded mt-2 hover:bg-green-600 transition-colors"
            >
              Falar no WhatsApp
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              *Atendimento de Segunda a Sexta, 9h às 18h
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé da página */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p> © 2026 BugMart - Todos os direitos reservados</p>
        <p className="mt-1">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-gray-600"
          >
            Termos de Uso
          </a>{" "}
          |{" "}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:text-gray-600"
          >
            Política de Privacidade
          </a>
        </p>
        {/* Problema: Links quebrados propositalmente */}
        <p className="text-xs text-gray-400 mt-2">
          BugMart - Onde os bugs são parte da experiência!
        </p>
      </div>
    </div>
  );
}

export default Sobre;
