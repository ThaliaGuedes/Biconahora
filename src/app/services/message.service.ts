import api from './api';
import { ChatMessage } from '@/app/types';

interface CreateMessageData {
  connection_id: string;
  text: string;
}

class MessageService {
  async sendMessage(data: CreateMessageData): Promise<ChatMessage> {
    const response = await api.post<ChatMessage>('/messages/', data);
    return response.data;
  }

  async getMessages(connectionId: string): Promise<ChatMessage[]> {
    const response = await api.get<ChatMessage[]>(`/messages/?connection_id=${connectionId}`);
    return response.data;
  }

  async markAsRead(messageId: string): Promise<ChatMessage> {
    const response = await api.patch<ChatMessage>(`/messages/${messageId}/read/`);
    return response.data;
  }
}

export default new MessageService();
