import api from './api';
import { EmployerProfile } from '@/app/types';

class EmployerService {
  async getEmployers(): Promise<EmployerProfile[]> {
    const response = await api.get<EmployerProfile[]>('/employers/');
    return response.data;
  }

  async getEmployer(id: string): Promise<EmployerProfile> {
    const response = await api.get<EmployerProfile>(`/employers/${id}/`);
    return response.data;
  }

  async updateEmployer(id: string, data: Partial<EmployerProfile>): Promise<EmployerProfile> {
    // Se houver foto nova (File object), fazer upload usando FormData
    if (data.photo && typeof data.photo !== 'string') {
      const formData = new FormData();
      
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof EmployerProfile];
        
        if (key === 'photo' && value instanceof File) {
          formData.append('photo', value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      
      const response = await api.patch<EmployerProfile>(`/employers/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
    
    // Caso contrário, enviar JSON normal
    const response = await api.patch<EmployerProfile>(`/employers/${id}/`, data);
    return response.data;
  }
}

export default new EmployerService();
