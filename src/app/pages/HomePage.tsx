import { useNavigate } from 'react-router-dom';
import { Users, Briefcase } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { mockFreelancers, mockEmployers } from '@/app/data/mockData';

export const HomePage = () => {
  const navigate = useNavigate();
  const { setUserType, setFreelancers, setEmployers, setCurrentUser } = useApp();

  const handleSelectUserType = (type: 'freelancer' | 'employer') => {
    setUserType(type);
    setFreelancers(mockFreelancers);
    setEmployers(mockEmployers);

    if (type === 'freelancer') {
      setCurrentUser(mockFreelancers[0]);
      navigate('/freelancer');
    } else {
      setCurrentUser(mockEmployers[0]);
      navigate('/employer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A259FF] via-[#FFF176] to-[#FFFBCC] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            Bico na Hora
          </h1>
          <p className="text-xl text-gray-800">
            Conecte quem precisa de um bico com quem oferece – Encontre, Combine e trabalhe na hora!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Freelancer Card */}
          <button
            onClick={() => handleSelectUserType('freelancer')}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="text-blue-600" size={40} />
              </div>
              <h2 className="text-2xl mb-2 text-purple-800">Quero trabalhar como freelancer</h2>
              <p className="text-gray-700 text-center">
                Encontre oportunidades de bico e fale com contratantes
              </p>
              <ul className="mt-4 text-sm text-gray-700 space-y-2 text-left w-full">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Controle a visibilidade dos seus contatos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Mostre suas habilidades e disponibilidade</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Receba feedback dos contratantes para se destacar e conquistar mais oportunidades de trabalho.</span>
                </li>
              </ul>
            </div>
          </button>

          {/* Employer Card */}
          <button
            onClick={() => handleSelectUserType('employer')}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Briefcase className="text-purple-600" size={40} />
              </div>
              <h2 className="text-2xl mb-2 text-purple-800">Quero contratar</h2>
              <p className="text-gray-700 text-center">
                Encontre freelancers qualificados para as necessidades do seu negócio
              </p>
              <ul className="mt-4 text-sm text-gray-700 space-y-2 text-left w-full">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Procure e filtre freelancers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Conecte para dar match com o freelancer ideal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Converse diretamente com os candidatos</span>
                </li>
              </ul>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-purple-900/80 text-sm font-medium">
          <p>Teste à vontade! Os perfis e dados do Bico na Hora são fictícios nesta demonstração, aproveite para conhecer todas as possibilidades da plataforma.</p>
        </div>
      </div>
    </div>
  );
};