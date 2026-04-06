import { createClient } from "@supabase/supabase-js";

// ERRO: Variáveis de ambiente não verificadas
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://url-falsa.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "chave-falsa";

// ERRO: Cliente criado mesmo sem configuração válida
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Dados mockados para simulação
export const mockData = {
  produtos: [
    {
      id: 1,
      nome: "Notebook Gamer",
      preco: 4999.99,
      estoque: 10,
      categoria: "Eletrônicos",
    },
    {
      id: 2,
      nome: "Smartphone XYZ",
      preco: 1999.99,
      estoque: 25,
      categoria: "Eletrônicos",
    },
    {
      id: 3,
      nome: "Fone Bluetooth",
      preco: 299.99,
      estoque: 50,
      categoria: "Acessórios",
    },
    {
      id: 4,
      nome: "Camiseta Premium",
      preco: 89.99,
      estoque: 100,
      categoria: "Vestuário",
    },
  ],
  clientes: [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(11) 88888-8888",
    },
  ],
  vendas: [],
};

// ERRO: Função lenta e ineficiente
export const fetchData = async (tabela) => {
  // ERRO: setTimeout desnecessário para simular lentidão
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // ERRO: Retorna dados duplicados às vezes
  if (Math.random() > 0.7) {
    return [...mockData[tabela], ...mockData[tabela]];
  }

  return mockData[tabela];
};
