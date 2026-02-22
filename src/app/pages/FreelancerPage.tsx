import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, MessageCircle, LogOut, User, Edit } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { FreelancerProfile, ChatMessage } from '@/app/types';
import { ProfileSettings } from '@/app/components/ProfileSettings';
import { StarRating } from '@/app/components/StarRating';
import { EditFreelancerProfile } from '@/app/components/EditFreelancerProfile';
import { ChatWindow } from '@/app/components/ChatWindow';
import { Toaster } from '@/app/components/ui/sonner';

export const FreelancerPage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, userType, setUserType, connections, setConnections, employers } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'messages'>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [chatSelecionado, setChatSelecionado] = useState<string | null>(null);
  const freelancerUser = currentUser as FreelancerProfile;

  const handleLogout = () => {
    setUserType(null);
    setCurrentUser(null);
    navigate('/');
  };

  const handleUpdateProfile = (updates: Partial<FreelancerProfile>) => {
    if (freelancerUser) {
      setCurrentUser({ ...freelancerUser, ...updates });
    }
  };

  // Verificar se o usuário está autenticado
  if (!freelancerUser || userType !== 'freelancer') {
    return null;
  }

  // Enviar mensagem
  const enviarMensagem = (texto: string) => {
    if (!chatSelecionado) return;
    const conexao = connections.find(
      (c) => c.employerId === chatSelecionado && c.freelancerId === freelancerUser.id
    );
    if (!conexao) return;
    const novaMensagem: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: freelancerUser.id,
      text: texto,
      timestamp: new Date(),
    };
    setConnections((prev) =>
      prev.map((c) =>
        c.id === conexao.id ? { ...c, messages: [...c.messages, novaMensagem] } : c
      )
    );
  };

  // Obter empregadores conectados
  const empregadoresConectados = employers.filter((e) => {
    const conexao = connections.find(
      (c) => c.employerId === e.id && c.freelancerId === freelancerUser.id
    );
    return !!conexao;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-700">FreelaJá</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>Perfil</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'settings'
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
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-2 border-b-2 transition-colors relative ${
                activeTab === 'messages'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>Mensagens</span>
                {empregadoresConectados.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {empregadoresConectados.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-6 mb-6">
              <img
                src={freelancerUser.photo}
                alt={freelancerUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl mb-1">{freelancerUser.name}</h2>
                <p className="text-gray-600">{freelancerUser.city}</p>
                <div className="mt-2">
                  <StarRating rating={freelancerUser.rating} />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-2">Informações de Contato</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-600">E-mail:</span> {freelancerUser.email}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Telefone:</span> {freelancerUser.phone}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg mb-2">Disponibilidade</h3>
                <p className="bg-gray-50 p-4 rounded-lg text-sm">{freelancerUser.availability}</p>
              </div>
              <div>
                <h3 className="text-lg mb-2">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {freelancerUser.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg mb-2">Avaliações ({freelancerUser.reviews.length})</h3>
                <div className="space-y-3">
                  {freelancerUser.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm">{review.employerName}</p>
                        <StarRating rating={review.rating} size={14} showNumber={false} />
                      </div>
                      <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                      <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-6 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 w-full"
            >
              <Edit size={16} />
              Editar Perfil
            </button>
          </div>
        )}
        {activeTab === 'settings' && (
          <ProfileSettings
            user={freelancerUser}
            userType="freelancer"
            onUpdate={handleUpdateProfile}
          />
        )}
        {activeTab === 'messages' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Lista de Conversas */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-yellow-100">
              <h3 className="text-lg mb-4 text-purple-700">
                Conversas ({empregadoresConectados.length})
              </h3>
              {empregadoresConectados.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Nenhuma mensagem ainda
                </p>
              ) : (
                <div className="space-y-2">
                  {empregadoresConectados.map((empregador) => (
                    <button
                      key={empregador.id}
                      onClick={() => setChatSelecionado(empregador.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        chatSelecionado === empregador.id
                          ? 'bg-purple-100'
                          : 'bg-yellow-50 hover:bg-yellow-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={empregador.photo}
                          alt={empregador.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm">{empregador.name}</p>
                          <p className="text-xs text-gray-500">{empregador.businessName}</p>
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
                      connections.find((c) => c.employerId === chatSelecionado)?.messages || []
                    }
                    currentUserId={freelancerUser.id}
                    otherUserName={
                      employers.find((e) => e.id === chatSelecionado)?.name || 'Contratante'
                    }
                    onSendMessage={enviarMensagem}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center h-[600px] flex items-center justify-center border border-purple-100">
                  <div>
                    <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Selecione uma conversa</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Os contratantes podem iniciar conversas com você diretamente
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Edit Modal */}
      <EditFreelancerProfile
        user={freelancerUser}
        isOpen={isEditModalOpen}
        onSave={handleUpdateProfile}
        onClose={() => setIsEditModalOpen(false)}
      />
      <Toaster />
    </div>
  );
};