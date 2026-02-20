import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, MessageCircle, LogOut, User, Bell, Edit } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { FreelancerProfile } from '@/app/types';
import { ProfileSettings } from '@/app/components/ProfileSettings';
import { StarRating } from '@/app/components/StarRating';
import { EditFreelancerProfile } from '@/app/components/EditFreelancerProfile';
import { Toaster } from '@/app/components/ui/sonner';

export const FreelancerPage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, userType, setUserType, connections, setConnections, employers } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'messages' | 'notifications'>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  // Aceitar solicitação de conexão
  const aceitarSolicitacao = (connectionId: string) => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === connectionId ? { ...c, status: 'accepted' as const } : c
      )
    );
  };

  // Rejeitar solicitação de conexão
  const rejeitarSolicitacao = (connectionId: string) => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === connectionId ? { ...c, status: 'rejected' as const } : c
      )
    );
  };

  // Obter solicitações pendentes
  const solicitacoesPendentes = connections.filter(
    (c) => c.freelancerId === freelancerUser.id && c.status === 'pending'
  );

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
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'messages'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>Mensagens</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-2 border-b-2 transition-colors relative ${
                activeTab === 'notifications'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell size={20} />
                <span>Notificações</span>
                {solicitacoesPendentes.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {solicitacoesPendentes.length}
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
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhuma mensagem ainda</p>
            <p className="text-sm text-gray-500 mt-2">
              Os contratantes podem iniciar o chat após se conectarem com você
            </p>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl mb-6 text-purple-700">Solicitações de Conexão</h2>
            {solicitacoesPendentes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Nenhuma solicitação pendente</p>
                <p className="text-sm text-gray-500 mt-2">
                  Quando um contratante quiser se conectar com você, você receberá uma notificação aqui
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {solicitacoesPendentes.map((solicitacao) => {
                  const empregador = employers.find((e) => e.id === solicitacao.employerId);
                  if (!empregador) return null;
                  
                  return (
                    <div
                      key={solicitacao.id}
                      className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-200"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={empregador.photo}
                          alt={empregador.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-purple-900">{empregador.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{empregador.businessName}</p>
                          <p className="text-sm text-gray-500 mb-1">
                            📍 {empregador.businessAddress}
                          </p>
                          <p className="text-sm text-purple-600 font-medium">
                            💰 R${empregador.dailyRate}/dia
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Solicitou conexão com você
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => aceitarSolicitacao(solicitacao.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition"
                        >
                          ✓ Aceitar
                        </button>
                        <button
                          onClick={() => rejeitarSolicitacao(solicitacao.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition"
                        >
                          ✗ Rejeitar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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