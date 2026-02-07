export type UserType = 'freelancer' | 'employer';

export interface FreelancerProfile {
  id: string;
  name: string;
  photo: string;
  city: string;
  email: string;
  phone: string;
  showEmail: boolean;
  showPhone: boolean;
  availability: string;
  skills: string[];
  rating: number;
  reviews: Review[];
}

export interface EmployerProfile {
  id: string;
  name: string;
  photo: string;
  businessName: string;
  dailyRate: number;
  businessAddress: string;
  showAddress: boolean;
}

export interface Review {
  id: string;
  employerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export interface Connection {
  id: string;
  freelancerId: string;
  employerId: string;
  status: ConnectionStatus;
  messages: ChatMessage[];
  createdAt: Date;
}