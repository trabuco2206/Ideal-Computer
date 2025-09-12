import { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  Recommendation, 
  RecommendationRequest,
  Build,
  UserFormData
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || '';

// Mock data for demo
const mockUsers: User[] = [
  { id: '1', nome: 'Admin', email: 'admin@ideal.com', role: 'ADMIN' },
  { id: '2', nome: 'Usuário', email: 'user@ideal.com', role: 'USER' }
];

const mockBuilds: Build[] = [
  {
    id: '1',
    userId: '2',
    name: 'Build Gaming',
    total: 5200,
    components: [
      { type: 'CPU', name: 'AMD Ryzen 5 5600X', price: 800 },
      { type: 'GPU', name: 'RTX 3060 Ti', price: 2200 },
      { type: 'RAM', name: '16GB DDR4 3200MHz', price: 400 },
      { type: 'STORAGE', name: 'SSD 500GB NVMe', price: 350 },
      { type: 'PSU', name: 'Fonte 650W 80+ Gold', price: 450 },
      { type: 'CASE', name: 'Gabinete Mid Tower', price: 300 },
      { type: 'MOTHERBOARD', name: 'B450 Tomahawk Max', price: 700 }
    ],
    createdAt: '2024-01-15'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    // Mock mode
    await delay(500);
    return mockResponse(endpoint, options) as T;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

function mockResponse(endpoint: string, options: RequestInit) {
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body as string) : null;

  if (endpoint === '/api/auth/login' && method === 'POST') {
    const { email, senha } = body as LoginRequest;
    const user = mockUsers.find(u => u.email === email);
    
    if (!user || senha !== '123456') {
      throw new Error('Credenciais inválidas');
    }

    return {
      token: 'fake-jwt-token',
      user
    };
  }

  if (endpoint === '/api/auth/register' && method === 'POST') {
    const { nome, email } = body as RegisterRequest;
    const newUser: User = {
      id: Date.now().toString(),
      nome,
      email,
      role: 'USER'
    };
    
    return {
      token: 'fake-jwt-token',
      user: newUser
    };
  }

  if (endpoint === '/api/recommendations' && method === 'POST') {
    const { purpose, budget } = body as RecommendationRequest;
    
    const recommendations = {
      'gaming-budget': {
        name: 'Build Gaming Econômica',
        total: 3200,
        components: [
          { type: 'CPU', name: 'AMD Ryzen 5 4600G', price: 600, link: 'https://exemplo.com' },
          { type: 'GPU', name: 'GTX 1660 Super', price: 1200 },
          { type: 'RAM', name: '16GB DDR4 2666MHz', price: 300 },
          { type: 'STORAGE', name: 'SSD 256GB', price: 200 },
          { type: 'PSU', name: 'Fonte 500W 80+ Bronze', price: 250 },
          { type: 'CASE', name: 'Gabinete Básico', price: 150 },
          { type: 'MOTHERBOARD', name: 'A320M', price: 500 }
        ],
        reasons: [
          'CPU de 6 núcleos adequado para jogos atuais',
          'GPU oferece boa performance em 1080p',
          '16GB de RAM suficiente para multitasking',
          'SSD garante inicialização rápida',
          'Fonte com margem de segurança'
        ]
      },
      'gaming-extreme': {
        name: 'Build Gaming Extrema',
        total: 12000,
        components: [
          { type: 'CPU', name: 'AMD Ryzen 7 7700X', price: 1800 },
          { type: 'GPU', name: 'RTX 4070 Ti', price: 4500 },
          { type: 'RAM', name: '32GB DDR5 5600MHz', price: 1200 },
          { type: 'STORAGE', name: 'SSD 1TB NVMe Gen4', price: 800 },
          { type: 'PSU', name: 'Fonte 850W 80+ Gold', price: 700 },
          { type: 'CASE', name: 'Gabinete Premium RGB', price: 600 },
          { type: 'MOTHERBOARD', name: 'X670E Tomahawk', price: 2400 }
        ],
        reasons: [
          'CPU de última geração para máxima performance',
          'GPU de ponta para 4K gaming',
          '32GB DDR5 para futuro-prova',
          'SSD Gen4 ultra-rápido',
          'Fonte premium com eficiência máxima'
        ]
      }
    };

    const key = `${purpose}-${budget}` as keyof typeof recommendations;
    return recommendations[key] || recommendations['gaming-budget'];
  }

  if (endpoint === '/api/users' && method === 'GET') {
    return mockUsers;
  }

  if (endpoint === '/api/users' && method === 'POST') {
    const newUser: User = {
      id: Date.now().toString(),
      ...body,
    };
    mockUsers.push(newUser);
    return newUser;
  }

  if (endpoint.startsWith('/api/users/') && method === 'PUT') {
    const id = endpoint.split('/')[3];
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...body };
      return mockUsers[index];
    }
    throw new Error('Usuário não encontrado');
  }

  if (endpoint.startsWith('/api/users/') && method === 'DELETE') {
    const id = endpoint.split('/')[3];
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return { success: true };
    }
    throw new Error('Usuário não encontrado');
  }

  if (endpoint === '/api/builds' && method === 'GET') {
    return mockBuilds.filter(b => b.userId === '2'); // Current user builds
  }

  if (endpoint === '/api/builds' && method === 'POST') {
    const newBuild: Build = {
      id: Date.now().toString(),
      userId: '2', // Current user
      createdAt: new Date().toISOString().split('T')[0],
      ...body,
    };
    mockBuilds.push(newBuild);
    return newBuild;
  }

  throw new Error('Endpoint não encontrado');
}

export const api = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getRecommendation(data: RecommendationRequest): Promise<Recommendation> {
    return apiRequest<Recommendation>('/api/recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getUsers(): Promise<User[]> {
    return apiRequest<User[]>('/api/users');
  },

  async createUser(data: UserFormData): Promise<User> {
    return apiRequest<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateUser(id: string, data: UserFormData): Promise<User> {
    return apiRequest<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteUser(id: string): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  async getMyBuilds(): Promise<Build[]> {
    return apiRequest<Build[]>('/api/builds');
  },

  async saveBuild(data: Omit<Build, 'id' | 'userId' | 'createdAt'>): Promise<Build> {
    return apiRequest<Build>('/api/builds', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};