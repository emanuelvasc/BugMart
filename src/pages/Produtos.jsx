import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [busca, setBusca] = useState(""); // Estado para a pesquisa
  const navigate = useNavigate();

  useEffect(() => {
    // Delay artificial para teste de performance
    setTimeout(() => {
      const produtosData = [
        {
          id: 1,
          nome: "Samsung Galaxy S21",
          preco: 1299.9,
          parcela: 10,
          imagem:
            "https://img.odcdn.com.br/wp-content/uploads/2021/04/samsung-galaxy-s21-fe003-1920x1080.jpg",
          estoque: 15,
          descricao: "Smartphone com câmera de 48MP",
        },
        {
          id: 2,
          nome: "Notebook Ultra",
          preco: 3499.9,
          parcela: 12,
          imagem:
            "https://www.lojaspresidente.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/o/notebook-ultra-windows-11-home-tela-15-6-pol-processador-celeron-n4020c-memoria-4gb-128gb-emmc-ub260-multilaser-_1.jpg",
          estoque: 8,
          descricao: "Notebook para jogos e trabalho",
        },
        {
          id: 3,
          nome: "Fone Bluetooth",
          preco: 199.9,
          parcela: 3,
          imagem:
            "https://s2-techtudo.glbimg.com/USDiTDVDKb_Ym-sn56Ub4OSlXQI=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/i/p/uA97ShT5aCgZXxBoAxCw/airpro.jpg",
          estoque: 0,
          descricao: "Fone com cancelamento de ruído",
        },
        {
          id: 4,
          nome: "Smartwatch Pro",
          preco: 599.9,
          parcela: 6,
          imagem:
            "https://resource.megaeletronicos.com/uploads/Blog/1769189477_6973b065c3a2e.webp",
          estoque: 12,
          descricao: "Monitoramento de saúde",
        },
        {
          id: 2, // PROBLEMA: ID duplicado proposital
          nome: "iPad Mini",
          preco: 1119.9,
          parcela: 8,
          imagem:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-mini-smart-folio-keyboard-select-gallery-1-202410_FMT_WHH?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=MnRlUWFNNTNQeVpIT2Z5RnpuQnI4d3NLNTB6Zy9kY2o4bEU4S2htM3F2aURaUjE5SXdsZW9tb0lNdUl4cjJGWGgxQ1dZd0djY0RNSXR2bTdvZ0hKcU9OTHlWMldRSVkrK2JXakh2ZVlwWUM4VzdPRjFweXV0dDJSWTFJd1Q3Y0M3eEt6UTJVN1hLWWc4T0tTa3ovRlV2SEEyTjNRUzlucTloa2Nub0VJS0Q0&traceId=1",
          estoque: 5,
          descricao: undefined,
        },
        {
          id: 6,
          nome: "PlayStation 5 Plus",
          preco: 4099.99,
          parcela: 12,
          imagem:
            "https://files.meiobit.com/wp-content/uploads/2020/09/playstation-5.jpg",
          estoque: 8,
          descricao: undefined,
        },
      ];
      setProdutos(produtosData);
      setProdutosFiltrados(produtosData);
      setLoading(false);
    }, 2500);
  }, []);

  // 🟢 FUNÇÃO DE PESQUISA
  const handleSearch = (e) => {
    const termoBusca = e.target.value.toLowerCase();
    setBusca(termoBusca);

    // Problema: Pesquisa com delay artificial (lenta)
    setTimeout(() => {
      const filtrados = produtos.filter((produto) => {
        const nomeMatch =
          produto.nome?.toLowerCase().includes(termoBusca) || false;
        const descricaoMatch =
          produto.descricao?.toLowerCase().includes(termoBusca) || false;
        return nomeMatch || descricaoMatch;
      });

      // Problema: Se não encontrar nada, mostra mensagem vaga
      setProdutosFiltrados(filtrados);

      // Problema: Alerta desnecessário quando não encontra resultados
      if (filtrados.length === 0 && termoBusca.length > 2) {
        setTimeout(() => {
          alert("Nenhum produto encontrado. Tente outra busca.");
        }, 500);
      }
    }, 800); // Delay proposital na pesquisa
  };

  // 🟢 FUNÇÃO PARA LIMPAR PESQUISA
  const limparPesquisa = () => {
    setBusca("");
    setProdutosFiltrados(produtos);
    // Problema: Não limpa o input imediatamente
    setTimeout(() => {
      alert("Pesquisa limpa!");
    }, 300);
  };

  const adicionarAoCarrinho = (produto) => {
    if (produto.estoque === 0) {
      alert("Produto sem estoque!");
      return;
    }

    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinhoAtual.push({
      id: produto.id,
      nome: produto.nome || "Produto sem nome",
      preco: typeof produto.preco === "number" ? produto.preco : 0,
      quantidade: 1,
    });
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    setMensagem(`${produto.nome || "Produto"} adicionado ao carrinho!`);
    setTimeout(() => setMensagem(""), 3000);
  };

  const formatarPreco = (preco) => {
    if (typeof preco === "number") {
      return `R$ ${preco.toFixed(2)}`;
    }
    return "Preço sob consulta";
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="loading-spinner mx-auto"></div>
        <p className="text-center mt-4">Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Mensagem de feedback */}
      {mensagem && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {mensagem}
        </div>
      )}

      {/* Banner promocional */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold">🔥 Ofertas Imperdíveis!</h1>
        <p className="mt-2">Até 50% OFF na primeira compra</p>
        <p className="text-sm mt-1 opacity-75">*Consulte condições</p>
      </div>

      {/* 🟢 BARRA DE PESQUISA - NOVA */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={busca}
            onChange={handleSearch}
            placeholder="Buscar produtos por nome ou descrição..."
            className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {busca && (
            <button
              onClick={limparPesquisa}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <span>✕</span>
            </button>
          )}
        </div>

        {/* Problema: Indicador de resultados que não atualiza direito */}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {busca ? (
              <>
                🔎 {produtosFiltrados.length} produto(s) encontrado(s) para "
                {busca}"
              </>
            ) : (
              "Digite algo para buscar produtos"
            )}
          </p>

          {/* Problema: Filtro rápido que não funciona */}
          <select
            onChange={(e) => {
              alert("Filtro indisponivel");
            }}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="">Ordenar por</option>
            <option value="preco_asc">Menor preço</option>
            <option value="preco_desc">Maior preço</option>
            <option value="nome">Nome</option>
          </select>
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-400 text-sm mt-2">
              Tente buscar por outro termo
            </p>
            <button
              onClick={limparPesquisa}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          produtosFiltrados.map((produto, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={produto.imagem || "https://picsum.photos/id/20/300/200"}
                alt={produto.nome || "Produto"}
                className="w-full h-48 object-cover"
                loading="eager"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {produto.nome || "Nome indisponível"}
                </h2>

                <p className="text-gray-600 text-sm mb-3">
                  {produto.descricao || "Descrição não disponível no momento"}
                </p>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatarPreco(produto.preco)}
                  </span>
                  {typeof produto.preco === "number" && produto.parcela && (
                    <p className="text-sm text-gray-500">
                      ou {produto.parcela}x de R${" "}
                      {(produto.preco / produto.parcela).toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-sm ${produto.estoque > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {produto.estoque > 0
                      ? ` ${produto.estoque} unidades`
                      : " Esgotado"}
                  </span>
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Últimas unidades!
                    </span>
                  )}
                </div>

                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  disabled={produto.estoque === 0}
                  className={`w-full py-2 rounded font-semibold transition-colors ${
                    produto.estoque > 0
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {produto.estoque > 0
                    ? " Adicionar ao Carrinho"
                    : " Indisponível"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Carregar mais produtos */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            alert("Carregando mais produtos...");
            setTimeout(() => {
              alert("Erro ao carregar produtos. Tente novamente.");
            }, 2000);
          }}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
        >
          Carregar Mais Produtos
        </button>
      </div>

      {/* Banner com erro de layout */}
      <div className="mt-8 bg-gray-100 p-4 rounded text-center overflow-x-auto">
        <p className="text-sm text-gray-600">
          🚚 Frete grátis para compras acima de R$ 200 | 🎁 5% off no PIX
        </p>
        <p className="text-xs text-gray-400 mt-1">
          *Ofertas válidas por tempo limitado
        </p>
      </div>
    </div>
  );
}

export default Produtos;
