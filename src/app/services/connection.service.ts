import api from './api';
import { Connection } from '@/app/types';

class ConnectionService {
  async createConnection(freelancerId: string, employerId: string): Promise<Connection> {
    const response = await api.post<Connection>('/connections/', {
      freelancer_id: freelancerId,
      employer_id: employerId,
    });
    return response.data;
  }

  async getConnections(): Promise<Connection[]> {
    const response = await api.get<Connection[]>('/connections/');
    return response.data;
  }

  async getConnection(id: string): Promise<Connection> {
    const response = await api.get<Connection>(`/connections/${id}/`);
    return response.data;
  }
}

export default new ConnectionService();
