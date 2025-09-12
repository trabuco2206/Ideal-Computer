export interface User {
  id: string;
  nome: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface Component {
  type: 'CPU' | 'GPU' | 'RAM' | 'STORAGE' | 'PSU' | 'CASE' | 'MOTHERBOARD';
  name: string;
  price: number;
  link?: string;
}

export interface Recommendation {
  name: string;
  total: number;
  components: Component[];
  reasons: string[];
}

export interface RecommendationRequest {
  purpose: 'gaming' | 'work' | 'study';
  budget: 'budget' | 'mid' | 'high' | 'extreme';
}

export interface Build {
  id: string;
  userId: string;
  name: string;
  total: number;
  components: Component[];
  createdAt: string;
}

export interface UserFormData {
  nome: string;
  email: string;
  role: 'USER' | 'ADMIN';
  senha?: string;
}