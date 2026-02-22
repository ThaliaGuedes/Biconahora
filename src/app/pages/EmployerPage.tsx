import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, MessageCircle, LogOut, Search, Edit } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { EmployerProfile, Connection, ChatMessage } from '@/app/types';
import { ProfileSettings } from '@/app/components/ProfileSettings';
import { FreelancerCard } from '@/app/components/FreelancerCard';
import { SearchFilters } from '@/app/components/SearchFilters';
import { ChatWindow } from '@/app/components/ChatWindow';
import { EditEmployerProfile } from '@/app/components/EditEmployerProfile';
import { Toaster } from '@/app/components/ui/sonner';

export const EmployerPage = () => {
  const navegar = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    freelancers,
    userType,
    setUserType,
    connections,
    setConnections,
  } = useApp();

  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'configuracoes' | 'mensagens'>('lista');
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<string[]>([]);
  const [cidadeBusca, setCidadeBusca] = useState('');
  const [conexoes, setConexoes] = useState<string[]>([]);
  const [chatSelecionado, setChatSelecionado] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const usuarioContratante = currentUser as EmployerProfile;

  const sair = () => {
    setUserType(null);
    setCurrentUser(null);
    navegar('/');
  };

  const atualizarPerfil = (atualizacoes: Partial<EmployerProfile>) => {
    if (usuarioContratante) {
      setCurrentUser({ ...usuarioContratante, ...atualizacoes });
    }
  };

  // Verificar se o usuário está autenticado
  if (!usuarioContratante || userType !== 'employer') {
    return null;
  }

  // Filtros
  const freelancersFiltrados = freelancers.filter((freelancer) => {
    const cidadeConfere =
      !cidadeBusca || freelancer.city.toLowerCase().includes(cidadeBusca.toLowerCase());
    const habilidadesConferem =
      habilidadesSelecionadas.length === 0 ||
      habilidadesSelecionadas.some((hab) => freelancer.skills.includes(hab));
    return cidadeConfere && habilidadesConferem;
  });

  const todasHabilidades = Array.from(new Set(freelancers.flatMap((f) => f.skills)));

  const alternarHabilidade = (habilidade: string) => {
    setHabilidadesSelecionadas((prev) =>
      prev.includes(habilidade)
        ? prev.filter((h) => h !== habilidade)
        : [...prev, habilidade]
    );
  };

  // Conectar com freelancer
  const conectarFreelancer = (freelancerId: string) => {
    // Verifica se já existe uma conexão
    const conexaoExistente = connections.find(
      (c) => c.freelancerId === freelancerId && c.employerId === usuarioContratante.id
    );
    
    if (!conexaoExistente) {
      // Cria nova conexão já aceita automaticamente
      const novaConexao: Connection = {
        id: `conn-${Date.now()}`,
        freelancerId,
        employerId: usuarioContratante.id,
        status: 'accepted',
        messages: [],
        createdAt: new Date(),
      };
      setConnections((prev) => [...prev, novaConexao]);
    }
    
    // Abre o chat automaticamente
    setChatSelecionado(freelancerId);
    setAbaAtiva('mensagens');
  };

  // Enviar mensagem
  const enviarMensagem = (texto: string) => {
    if (!chatSelecionado) return;
    const conexao = connections.find((c) => c.freelancerId === chatSelecionado);
    if (!conexao) return;
    const novaMensagem: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: usuarioContratante.id,
      text: texto,
      timestamp: new Date(),
    };
    setConnections((prev) =>
      prev.map((c) =>
        c.id === conexao.id
          ? { ...c, messages: [...c.messages, novaMensagem] }
          : c
      )
    );
  };

  // Obter status de conexão para cada freelancer
  const obterStatusConexao = (freelancerId: string) => {
    const conexao = connections.find(
      (c) => c.freelancerId === freelancerId && c.employerId === usuarioContratante.id
    );
    return conexao ? true : false;
  };

  // Apenas conexes aceitas para mensagens
  const freelancersConectados = freelancers.filter((f) => {
    const conexao = connections.find(
      (c) => c.freelancerId === f.id && c.employerId === usuarioContratante.id
    );
    return !!conexao;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50">
      {/* Cabeçalho */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-700">FreelaJá</h1>
          <button
            onClick={sair}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setAbaAtiva('lista')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                abaAtiva === 'lista'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search size={20} />
                <span>Encontrar Freelancers</span>
              </div>
            </button>
            <button
              onClick={() => setAbaAtiva('configuracoes')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                abaAtiva === 'configuracoes'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings size={20} />
                <span>Configurações</span>
              </div>
            </button>
            <button
              onClick={() => setAbaAtiva('mensagens')}
              className={`py-4 px-2 border-b-2 transition-colors relative ${
                abaAtiva === 'mensagens'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>Mensagens</span>
                {conexoes.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {conexoes.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* LISTA DE FREELANCERS */}
        {abaAtiva === 'lista' && (
          <div>
            <SearchFilters
              selectedSkills={habilidadesSelecionadas}
              onSkillToggle={alternarHabilidade}
              searchCity={cidadeBusca}
              onCityChange={setCidadeBusca}
              availableSkills={todasHabilidades}
            />
            {freelancersFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Nenhum freelancer encontrado</p>
                <p className="text-sm text-gray-500 mt-2">Tente ajustar os filtros</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {freelancersFiltrados.map((freelancer) => {
                  const jaConectado = obterStatusConexao(freelancer.id);
                  return (
                    <div
                      key={freelancer.id}
                      className="flex flex-col bg-white rounded-lg shadow-md p-4 border border-purple-100"
                    >
                      <FreelancerCard freelancer={freelancer} />
                      <button
                        onClick={() => conectarFreelancer(freelancer.id)}
                        className={`mt-4 rounded-lg py-2 font-semibold transition flex items-center justify-center gap-2 ${
                          jaConectado
                            ? 'bg-purple-100 text-purple-700 border-2 border-purple-300 hover:bg-purple-200'
                            : 'bg-purple-500 hover:bg-purple-600 text-white'
                        }`}
                      >
                        <MessageCircle size={18} />
                        {jaConectado ? 'Ver Conversa' : 'Enviar Mensagem'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CONFIGURAÇÕES */}
        {abaAtiva === 'configuracoes' && (
          <div>
            <ProfileSettings
              user={usuarioContratante}
              userType="employer"
              onUpdate={atualizarPerfil}
            />
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mt-6 border border-yellow-100">
              <h3 className="text-lg mb-4 text-purple-700">Informações do Negócio</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nome do Negócio</p>
                  <p className="text-base">{usuarioContratante.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor Diário</p>
                  <p className="text-base">R${usuarioContratante.dailyRate}/dia</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="text-base">{usuarioContratante.businessAddress}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2 px-4 font-semibold transition flex items-center gap-2 max-w-2xl mx-auto"
            >
              <Edit size={16} />
              Editar Perfil
            </button>
          </div>
        )}

        {/* MENSAGENS */}
        {abaAtiva === 'mensagens' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Lista de Conexões */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-yellow-100">
              <h3 className="text-lg mb-4 text-purple-700">
                Conexões ({freelancersConectados.length})
              </h3>
              {freelancersConectados.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Nenhuma conexão ainda
                </p>
              ) : (
                <div className="space-y-2">
                  {freelancersConectados.map((freelancer) => (
                    <button
                      key={freelancer.id}
                      onClick={() => setChatSelecionado(freelancer.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        chatSelecionado === freelancer.id
                          ? 'bg-purple-100'
                          : 'bg-yellow-50 hover:bg-yellow-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={freelancer.photo}
                          alt={freelancer.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm">{freelancer.name}</p>
                          <p className="text-xs text-gray-500">{freelancer.city}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Janela de Chat */}
            <div className="md:col-span-2">
              {chatSelecionado ? (
                <div className="h-[600px]">
                  <ChatWindow
                    messages={
                      connections.find((c) => c.freelancerId === chatSelecionado)?.messages ||
                      []
                    }
                    currentUserId={usuarioContratante.id}
                    otherUserName={
                      freelancers.find((f) => f.id === chatSelecionado)?.name || 'Freelancer'
                    }
                    onSendMessage={enviarMensagem}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center h-[600px] flex items-center justify-center border border-purple-100">
                  <div>
                    <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Selecione uma conexão para conversar</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Edição de Perfil */}
      <EditEmployerProfile
        user={usuarioContratante}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={atualizarPerfil}
      />
      <Toaster />
    </div>
  );
};