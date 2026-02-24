import api from './api';
import { UserType, FreelancerProfile, EmployerProfile } from '@/app/types';

export interface LoginResponse {
  user_id: string;
  token: string;
  user_type: UserType;
  profile: FreelancerProfile | EmployerProfile;
}

export interface RegisterFreelancerData {
  email: string;
  password: string;
  name: string;
  city: string;
  phone: string;
}

export interface RegisterEmployerData {
  email: string;
  password: string;
  name: string;
  businessName: string;
  dailyRate: number;
  businessAddress: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login/', {
      email,
      password,
    });
    
    // Salvar token e tipo de usuário
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', response.data.user_type);
    
    return response.data;
  }

  async registerFreelancer(data: RegisterFreelancerData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register/freelancer/', data);
    
    // Salvar token e tipo de usuário
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', response.data.user_type);
    
    return response.data;
  }

  async registerEmployer(data: RegisterEmployerData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register/employer/', data);
    
    // Salvar token e tipo de usuário
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', response.data.user_type);
    
    return response.data;
  }

  async getCurrentUser(): Promise<LoginResponse> {
    const response = await api.get<LoginResponse>('/auth/me/');
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserType(): UserType | null {
    const userType = localStorage.getItem('userType');
    return userType as UserType | null;
  }
}

export default new AuthService();
