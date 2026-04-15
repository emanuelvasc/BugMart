import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CriarConta() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // PASSO 1 - Dados básicos
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nomeMeio, setNomeMeio] = useState("");
  const [apelido, setApelido] = useState("");
  const [titulo, setTitulo] = useState("");

  // PASSO 2 - Contato (informações desnecessárias)
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneComercial, setTelefoneComercial] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [fax, setFax] = useState("");

  // PASSO 3 - Endereço (muitos campos)
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [pais, setPais] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");

  // PASSO 4 - Senha (complicado)
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dicaSenha, setDicaSenha] = useState("");
  const [perguntaSecreta, setPerguntaSecreta] = useState("");
  const [respostaSecreta, setRespostaSecreta] = useState("");

  // PASSO 5 - Preferências desnecessárias
  const [comoConheceu, setComoConheceu] = useState("");
  const [receberNewsletter, setReceberNewsletter] = useState(false);
  const [receberOfertas, setReceberOfertas] = useState(false);
  const [receberSms, setReceberSms] = useState(false);
  const [idioma, setIdioma] = useState("pt-BR");
  const [fusoHorario, setFusoHorario] = useState("America/Sao_Paulo");
  const [tema, setTema] = useState("light");

  // PASSO 6 - Termos (muito texto)
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [aceitaPrivacidade, setAceitaPrivacidade] = useState(false);
  const [aceitaCookies, setAceitaCookies] = useState(false);
  const [aceitaCompartilhamento, setAceitaCompartilhamento] = useState(false);
  const [maiorIdade, setMaiorIdade] = useState(false);

  const validarPasso1 = () => {
    if (!nome) {
      setError("Nome é obrigatório");
      return false;
    }
    if (!sobrenome) {
      setError("Sobrenome é obrigatório");
      return false;
    }
    setError("");
    return true;
  };

  const validarPasso2 = () => {
    if (!email) {
      setError("Email é obrigatório");
      return false;
    }
    if (!email.includes("@")) {
      setError("Email inválido");
      return false;
    }
    if (email !== confirmarEmail) {
      setError("Emails não conferem");
      return false;
    }
    setError("");
    return true;
  };

  const validarPasso3 = () => {
    if (!cep) {
      setError("CEP é obrigatório");
      return false;
    }
    if (!endereco) {
      setError("Endereço é obrigatório");
      return false;
    }
    if (!cidade) {
      setError("Cidade é obrigatória");
      return false;
    }
    setError("");
    return true;
  };

  const validarPasso4 = () => {
    if (senha.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres");
      return false;
    }
    if (senha !== confirmarSenha) {
      setError("Senhas não conferem");
      return false;
    }
    if (!dicaSenha) {
      setError("Dica de senha é obrigatória");
      return false;
    }
    setError("");
    return true;
  };

  const validarPasso5 = () => {
    // Sem validação - informações desnecessárias mesmo
    setError("");
    return true;
  };

  const validarPasso6 = () => {
    if (!aceitaTermos) {
      setError("Você precisa aceitar os Termos de Uso");
      return false;
    }
    if (!maiorIdade) {
      setError("Você precisa confirmar que é maior de idade");
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    let valido = false;
    switch (step) {
      case 1:
        valido = validarPasso1();
        break;
      case 2:
        valido = validarPasso2();
        break;
      case 3:
        valido = validarPasso3();
        break;
      case 4:
        valido = validarPasso4();
        break;
      case 5:
        valido = validarPasso5();
        break;
      case 6:
        valido = validarPasso6();
        break;
      default:
        valido = true;
    }
    if (valido) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Delay artificial de 3 segundos
    setTimeout(() => {
      // Verificar se email já existe
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const existe = usuarios.find((u) => u.email === email);

      if (existe) {
        setError("Email já cadastrado!");
        setLoading(false);
        return;
      }

      // Salvar usuário com todas as informações desnecessárias
      const novoUsuario = {
        id: Date.now(),
        nome: nome,
        sobrenome: sobrenome,
        nomeMeio: nomeMeio,
        apelido: apelido,
        titulo: titulo,
        email: email,
        telefone: telefone,
        telefoneComercial: telefoneComercial,
        whatsapp: whatsapp,
        fax: fax,
        endereco: {
          cep,
          endereco,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          pais,
          pontoReferencia,
        },
        senha: senha,
        dicaSenha: dicaSenha,
        perguntaSecreta: perguntaSecreta,
        respostaSecreta: respostaSecreta,
        preferencias: {
          comoConheceu,
          receberNewsletter,
          receberOfertas,
          receberSms,
          idioma,
          fusoHorario,
          tema,
        },
        role: "user",
        dataCriacao: new Date().toISOString(),
      };

      usuarios.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Conta criada com sucesso! Faça login para continuar.");
      navigate("/login");
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        {/* Progresso - 6 passos */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                    step >= num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {num}
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {num === 1 && "Dados"}
                  {num === 2 && "Contato"}
                  {num === 3 && "Endereço"}
                  {num === 4 && "Senha"}
                  {num === 5 && "Prefs"}
                  {num === 6 && "Termos"}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Criar Conta - BugMart
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Preencha todos os campos obrigatórios
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* PASSO 1 - Dados básicos (muitos campos) */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Título *</label>
              <select
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione</option>
                <option value="Sr.">Sr.</option>
                <option value="Sra.">Sra.</option>
                <option value="Dr.">Dr.</option>
                <option value="Dra.">Dra.</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Nome do Meio</label>
              <input
                type="text"
                value={nomeMeio}
                onChange={(e) => setNomeMeio(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Nome do meio (opcional)"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Sobrenome *</label>
              <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Seu sobrenome"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Apelido</label>
              <input
                type="text"
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Como quer ser chamado"
              />
            </div>
          </div>
        )}

        {/* PASSO 2 - Contato (informações desnecessárias) */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Confirmar Email *
              </label>
              <input
                type="email"
                value={confirmarEmail}
                onChange={(e) => setConfirmarEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="confirme seu email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Telefone Comercial
              </label>
              <input
                type="tel"
                value={telefoneComercial}
                onChange={(e) => setTelefoneComercial(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Telefone do trabalho"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">WhatsApp</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="WhatsApp"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fax</label>
              <input
                type="tel"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Fax (opcional)"
              />
            </div>
          </div>
        )}

        {/* PASSO 3 - Endereço (muitos campos) */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">CEP *</label>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="00000-000"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Endereço *</label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Rua, Avenida..."
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número *</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="123"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Complemento</label>
              <input
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Apto, Bloco..."
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Bairro *</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Bairro"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Cidade *</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Cidade"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estado *</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">País</label>
              <input
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Brasil"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Ponto de Referência
              </label>
              <input
                type="text"
                value={pontoReferencia}
                onChange={(e) => setPontoReferencia(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Perto do mercado..."
              />
            </div>
          </div>
        )}

        {/* PASSO 4 - Senha (complicado) */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Senha *</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Confirmar Senha *
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Confirme sua senha"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Dica de Senha *
              </label>
              <input
                type="text"
                value={dicaSenha}
                onChange={(e) => setDicaSenha(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ex: meu time favorito"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Pergunta Secreta
              </label>
              <select
                value={perguntaSecreta}
                onChange={(e) => setPerguntaSecreta(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione uma pergunta</option>
                <option value="pai">Nome do seu pai</option>
                <option value="mae">Nome da sua mãe</option>
                <option value="pet">Nome do seu pet</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Resposta Secreta
              </label>
              <input
                type="text"
                value={respostaSecreta}
                onChange={(e) => setRespostaSecreta(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Sua resposta"
              />
            </div>
          </div>
        )}

        {/* PASSO 5 - Preferências desnecessárias */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Como conheceu a BugMart?
              </label>
              <select
                value={comoConheceu}
                onChange={(e) => setComoConheceu(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione</option>
                <option value="google">Google</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="amigo">Indicação de amigo</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={receberNewsletter}
                  onChange={(e) => setReceberNewsletter(e.target.checked)}
                />
                Receber newsletter por email
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={receberOfertas}
                  onChange={(e) => setReceberOfertas(e.target.checked)}
                />
                Receber ofertas exclusivas
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={receberSms}
                  onChange={(e) => setReceberSms(e.target.checked)}
                />
                Receber ofertas por SMS
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Idioma</label>
              <select
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Tema</label>
              <select
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>
          </div>
        )}

        {/* PASSO 6 - Termos (muito texto) */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="border p-4 rounded h-40 overflow-y-auto text-sm text-gray-600">
              <h3 className="font-bold mb-2">Termos de Uso - BugMart</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={aceitaTermos}
                  onChange={(e) => setAceitaTermos(e.target.checked)}
                />
                Li e aceito os Termos de Uso *
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={aceitaPrivacidade}
                  onChange={(e) => setAceitaPrivacidade(e.target.checked)}
                />
                Aceito a Política de Privacidade
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={aceitaCookies}
                  onChange={(e) => setAceitaCookies(e.target.checked)}
                />
                Aceito o uso de Cookies
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={aceitaCompartilhamento}
                  onChange={(e) => setAceitaCompartilhamento(e.target.checked)}
                />
                Autorizo o compartilhamento de dados com parceiros
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={maiorIdade}
                  onChange={(e) => setMaiorIdade(e.target.checked)}
                />
                Declaro que sou maior de 18 anos *
              </label>
            </div>
          </div>
        )}

        {/* Botões de navegação */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Voltar
            </button>
          )}
          {step < 6 ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ml-auto"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ml-auto"
            >
              {loading ? "Criando conta..." : "Finalizar Cadastro"}
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Já tem conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
