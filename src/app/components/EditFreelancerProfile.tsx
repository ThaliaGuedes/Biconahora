import { useState } from 'react';
import { FreelancerProfile } from '@/app/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { X, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface EditFreelancerProfileProps {
  user: FreelancerProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<FreelancerProfile>) => void;
}

export const EditFreelancerProfile = ({ user, isOpen, onClose, onSave }: EditFreelancerProfileProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    photo: user.photo,
    city: user.city,
    email: user.email,
    phone: user.phone,
    availability: user.availability,
    skills: [...user.skills],
  });
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simular delay de salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setIsSaving(false);
    toast.success('Perfil atualizado com sucesso!');
    onClose();
  };

  const handleCancel = () => {
    // Resetar para os valores originais
    setFormData({
      name: user.name,
      photo: user.photo,
      city: user.city,
      email: user.email,
      phone: user.phone,
      availability: user.availability,
      skills: [...user.skills],
    });
    setNewSkill('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-700">Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nome Completo
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Foto de Perfil */}
          <div className="space-y-2">
            <Label htmlFor="photo" className="text-sm font-medium text-gray-700">
              URL da Foto de Perfil
            </Label>
            <Input
              id="photo"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://exemplo.com/foto.jpg"
              className="border-purple-200 focus:border-purple-500"
            />
            {formData.photo && (
              <div className="mt-2">
                <img
                  src={formData.photo}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
                />
              </div>
            )}
          </div>

          {/* Cidade */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              Cidade
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="São Paulo, SP"
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Telefone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+55 (11) 98765-4321"
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Disponibilidade */}
          <div className="space-y-2">
            <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
              Disponibilidade
            </Label>
            <Textarea
              id="availability"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="Ex: Segunda a Sexta, 9h às 18h"
              rows={3}
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Habilidades */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Habilidades
            </Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Adicionar nova habilidade"
                className="border-purple-200 focus:border-purple-500"
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Plus size={20} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200 flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-purple-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            {formData.skills.length === 0 && (
              <p className="text-sm text-gray-500 italic">Nenhuma habilidade adicionada ainda</p>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Alterações'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
