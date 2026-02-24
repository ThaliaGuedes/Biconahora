const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

export interface WebSocketMessage {
  type: 'chat_message';
  message_id?: string;
  message: string;
  sender_id: string;
  timestamp?: string;
}

class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: Array<(message: WebSocketMessage) => void> = [];

  connect(connectionId: string, token: string): void {
    if (this.socket) {
      this.disconnect();
    }

    const wsUrl = `${WS_BASE_URL}/ws/chat/${connectionId}/?token=${token}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
        this.messageHandlers.forEach((handler) => handler(data));
      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('Erro WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket desconectado');
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers = [];
  }

  sendMessage(message: string, senderId: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket não está conectado');
      return;
    }

    const payload: WebSocketMessage = {
      type: 'chat_message',
      message,
      sender_id: senderId,
    };

    this.socket.send(JSON.stringify(payload));
  }

  onMessage(handler: (message: WebSocketMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketService();
