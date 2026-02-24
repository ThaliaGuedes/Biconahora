import api from './api';
import { FreelancerProfile } from '@/app/types';

interface FreelancerFilters {
  city?: string;
  skills?: string[];
  rating_min?: number;
}

class FreelancerService {
  async getFreelancers(filters?: FreelancerFilters): Promise<FreelancerProfile[]> {
    const params = new URLSearchParams();
    
    if (filters?.city) {
      params.append('city', filters.city);
    }
    
    if (filters?.skills && filters.skills.length > 0) {
      params.append('skills', filters.skills.join(','));
    }
    
    if (filters?.rating_min) {
      params.append('rating_min', filters.rating_min.toString());
    }
    
    const response = await api.get<FreelancerProfile[]>(`/freelancers/?${params.toString()}`);
    return response.data;
  }

  async getFreelancer(id: string): Promise<FreelancerProfile> {
    const response = await api.get<FreelancerProfile>(`/freelancers/${id}/`);
    return response.data;
  }

  async updateFreelancer(id: string, data: Partial<FreelancerProfile>): Promise<FreelancerProfile> {
    // Se houver foto nova (File object), fazer upload usando FormData
    if (data.photo && typeof data.photo !== 'string') {
      const formData = new FormData();
      
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof FreelancerProfile];
        
        if (key === 'photo' && value instanceof File) {
          formData.append('photo', value);
        } else if (key === 'skills' && Array.isArray(value)) {
          formData.append('skills', JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      
      const response = await api.patch<FreelancerProfile>(`/freelancers/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
    
    // Caso contrário, enviar JSON normal
    const response = await api.patch<FreelancerProfile>(`/freelancers/${id}/`, data);
    return response.data;
  }
}

export default new FreelancerService();
