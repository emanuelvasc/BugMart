import { useState, useEffect } from "react";
import { fetchData } from "../lib/supabase";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    setLoading(true);
    // ERRO: Carregamento lento e dados duplicados
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await fetchData("produtos");
    setProdutos(data);
    setLoading(false);
  };

  // ERRO: Função de busca ineficiente
  const filteredProdutos = produtos.filter((p) => {
    // ERRO: Busca case sensitive
    return p.nome.includes(search) || p.categoria.includes(search);
  });

  const salvarProduto = async (produto) => {
    // ERRO: Sem validação de dados
    if (editando) {
      // ERRO: Estado não atualiza automaticamente
      setProdutos(produtos.map((p) => (p.id === editando.id ? produto : p)));
    } else {
      // ERRO: ID duplicado possível
      produto.id = produtos.length + Math.floor(Math.random() * 100);
      setProdutos([...produtos, produto]);
    }
    setShowModal(false);
    setEditando(null);

    // ERRO: Dados não persistem no localStorage
    console.log("Produto salvo (mock)");
  };

  const deletarProduto = (id) => {
    // ERRO: Sem confirmação de exclusão
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Carregando produtos...</div>
      ) : (
        <div className="card-grid bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Produto</th>
                <th className="px-6 py-3 text-left">Categoria</th>
                <th className="px-6 py-3 text-right">Preço</th>
                <th className="px-6 py-3 text-center">Estoque</th>
                <th className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map((produto) => (
                <tr key={produto.id} className="border-t">
                  <td className="px-6 py-4">{produto.id}</td>
                  <td className="px-6 py-4">{produto.nome}</td>
                  <td className="px-6 py-4">{produto.categoria}</td>
                  <td className="px-6 py-4 text-right">
                    R$ {produto.preco.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded ${produto.estoque < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                    >
                      {produto.estoque}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setEditando(produto);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 mx-1"
                    >
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => deletarProduto(produto.id)}
                      className="text-red-600 hover:text-red-800 mx-1"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Produto - ERRO: Layout quebrado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {editando ? "Editar Produto" : "Novo Produto"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                salvarProduto({
                  nome: formData.get("nome"),
                  categoria: formData.get("categoria"),
                  preco: parseFloat(formData.get("preco")),
                  estoque: parseInt(formData.get("estoque")),
                });
              }}
            >
              <input type="hidden" name="id" defaultValue={editando?.id} />
              <div className="mb-3">
                <input
                  name="nome"
                  defaultValue={editando?.nome}
                  placeholder="Nome"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="categoria"
                  defaultValue={editando?.categoria}
                  placeholder="Categoria"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="preco"
                  type="number"
                  defaultValue={editando?.preco}
                  placeholder="Preço"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="estoque"
                  type="number"
                  defaultValue={editando?.estoque}
                  placeholder="Estoque"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
