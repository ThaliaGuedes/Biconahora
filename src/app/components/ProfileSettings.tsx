import { useState } from 'react';
import { FreelancerProfile, EmployerProfile } from '@/app/types';
import { Switch } from '@radix-ui/react-switch';
import { Label } from '@radix-ui/react-label';
import { Eye, EyeOff } from 'lucide-react';

interface ProfileSettingsProps {
  user: FreelancerProfile | EmployerProfile;
  userType: 'freelancer' | 'employer';
  onUpdate: (updates: Partial<FreelancerProfile | EmployerProfile>) => void;
}

export const ProfileSettings = ({ user, userType, onUpdate }: ProfileSettingsProps) => {
  const isFreelancer = userType === 'freelancer';
  const freelancerUser = user as FreelancerProfile;
  const employerUser = user as EmployerProfile;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto border border-purple-100">
      <h2 className="text-2xl mb-6 text-purple-700">Configurações de Privacidade</h2>

      <div className="space-y-6">
        {isFreelancer ? (
          <>
            {/* Email Visibility */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                {freelancerUser.showEmail ? <Eye size={20} className="text-purple-600" /> : <EyeOff size={20} className="text-gray-400" />}
                <div>
                  <Label className="text-base text-purple-900">Visibilidade do E-mail</Label>
                  <p className="text-sm text-gray-600 mt-1">{freelancerUser.email}</p>
                </div>
              </div>
              <Switch
                checked={freelancerUser.showEmail}
                onCheckedChange={(checked) => onUpdate({ showEmail: checked })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  freelancerUser.showEmail ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    freelancerUser.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </Switch>
            </div>

            {/* Phone Visibility */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                {freelancerUser.showPhone ? <Eye size={20} className="text-purple-600" /> : <EyeOff size={20} className="text-gray-400" />}
                <div>
                  <Label className="text-base text-purple-900">Visibilidade do Telefone</Label>
                  <p className="text-sm text-gray-600 mt-1">{freelancerUser.phone}</p>
                </div>
              </div>
              <Switch
                checked={freelancerUser.showPhone}
                onCheckedChange={(checked) => onUpdate({ showPhone: checked })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  freelancerUser.showPhone ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    freelancerUser.showPhone ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </Switch>
            </div>
          </>
        ) : (
          <>
            {/* Address Visibility */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                {employerUser.showAddress ? <Eye size={20} className="text-purple-600" /> : <EyeOff size={20} className="text-gray-400" />}
                <div>
                  <Label className="text-base text-purple-900">Visibilidade do Endereço</Label>
                  <p className="text-sm text-gray-600 mt-1">{employerUser.businessAddress}</p>
                </div>
              </div>
              <Switch
                checked={employerUser.showAddress}
                onCheckedChange={(checked) => onUpdate({ showAddress: checked })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  employerUser.showAddress ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    employerUser.showAddress ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </Switch>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-purple-800">
          <strong>Nota:</strong> Você pode alternar essas configurações a qualquer momento para controlar quais informações são visíveis para
          {isFreelancer ? ' contratantes potenciais' : ' freelancers'}.
        </p>
      </div>
    </div>
  );
};