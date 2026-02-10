import { api } from '../../../core/api/client';
import { useAuthStore, User } from '../../../core/state/authStore';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data, { skipAuth: true });
    useAuthStore.getState().setTokens(response.accessToken, response.refreshToken);
    useAuthStore.getState().setUser(response.user);
    return response;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data, { skipAuth: true });
    useAuthStore.getState().setTokens(response.accessToken, response.refreshToken);
    useAuthStore.getState().setUser(response.user);
    return response;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return api.post('/auth/forgot-password', { email }, { skipAuth: true });
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return api.post('/auth/reset-password', { token, password }, { skipAuth: true });
  },

  async getProfile(): Promise<User> {
    return api.get<User>('/auth/me');
  },

  async updateProfile(data: Partial<Pick<User, 'displayName' | 'profilePicture'>>): Promise<User> {
    const user = await api.patch<User>('/auth/me', data);
    useAuthStore.getState().setUser(user);
    return user;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // Logout locally even if server fails
    }
    useAuthStore.getState().logout();
  },

  // ---- MOCK MODE (use until backend is ready) ----
  async mockLogin(email: string, _password: string): Promise<void> {
    const mockUser: User = {
      id: 'usr_mock_001',
      email,
      displayName: email.split('@')[0],
      subscriptionTier: 'free',
      storageUsed: 27800000,
      storageLimit: 100000000,
    };
    useAuthStore.getState().setTokens('mock_access_token', 'mock_refresh_token');
    useAuthStore.getState().setUser(mockUser);
  },

  async mockRegister(email: string, displayName: string): Promise<void> {
    const mockUser: User = {
      id: 'usr_mock_' + Date.now(),
      email,
      displayName,
      subscriptionTier: 'free',
      storageUsed: 0,
      storageLimit: 100000000,
    };
    useAuthStore.getState().setTokens('mock_access_token', 'mock_refresh_token');
    useAuthStore.getState().setUser(mockUser);
  },
};
