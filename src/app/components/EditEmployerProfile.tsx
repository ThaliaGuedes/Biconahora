import { useState } from 'react';
import { EmployerProfile } from '@/app/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface EditEmployerProfileProps {
  user: EmployerProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<EmployerProfile>) => void;
}

export const EditEmployerProfile = ({ user, isOpen, onClose, onSave }: EditEmployerProfileProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    photo: user.photo,
    businessName: user.businessName,
    dailyRate: user.dailyRate,
    businessAddress: user.businessAddress,
  });

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
      businessName: user.businessName,
      dailyRate: user.dailyRate,
      businessAddress: user.businessAddress,
    });
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
              Nome do Responsável
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Logo/Foto */}
          <div className="space-y-2">
            <Label htmlFor="photo" className="text-sm font-medium text-gray-700">
              URL do Logo/Foto da Empresa
            </Label>
            <Input
              id="photo"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://exemplo.com/logo.jpg"
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

          {/* Nome da Empresa */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
              Nome da Empresa
            </Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Ex: Restaurante Lua Azul"
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Endereço da Empresa */}
          <div className="space-y-2">
            <Label htmlFor="businessAddress" className="text-sm font-medium text-gray-700">
              Endereço da Empresa
            </Label>
            <Textarea
              id="businessAddress"
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              placeholder="Rua das Flores, 123, São Paulo, SP"
              rows={3}
              className="border-purple-200 focus:border-purple-500"
            />
          </div>

          {/* Valor Diário */}
          <div className="space-y-2">
            <Label htmlFor="dailyRate" className="text-sm font-medium text-gray-700">
              Valor Diário Oferecido (R$)
            </Label>
            <Input
              id="dailyRate"
              type="number"
              value={formData.dailyRate}
              onChange={(e) => setFormData({ ...formData, dailyRate: Number(e.target.value) })}
              placeholder="150"
              min="0"
              step="10"
              className="border-purple-200 focus:border-purple-500"
            />
            <p className="text-sm text-gray-500">
              Valor médio por dia de trabalho
            </p>
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
