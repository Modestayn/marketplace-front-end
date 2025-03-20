import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../config/api';
import type {
  ApiError,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  UpdateProfileData,
} from '@/types/IAuth.tsx';

// Create an axios instance with the API configuration and include credentials
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
  timeout: API_CONFIG.timeout,
  withCredentials: true, // This is critical for sending and receiving cookies
  withXSRFToken: true,
});

// Interceptor to add the token to requests
export const setupAuthInterceptor = (token: string | null) => {
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

// Handle error responses
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response?.data) {
      if (axiosError.response.data.errors) {
        // Format validation errors
        const formattedErrors = Object.entries(axiosError.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        throw new Error(formattedErrors);
      } else if (axiosError.response.data.message) {
        throw new Error(axiosError.response.data.message);
      }
    }
  }

  // Default error message
  throw new Error('An unexpected error occurred');
};

export const AuthService = {
  // Get CSRF cookie from Laravel
  getCsrfToken: async (): Promise<void> => {
    try {
      await axios.get(`http://localhost:8000/sanctum/csrf-cookie`, {
        withCredentials: true,
        withXSRFToken: true,
      });
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      throw new Error('Failed to fetch CSRF token');
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // First, get the CSRF token
      await AuthService.getCsrfToken();

      // Then make the login request
      const response = await api.post<AuthResponse>('/login', credentials);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      // First, get the CSRF token
      await AuthService.getCsrfToken();

      // Then make the register request
      const response = await api.post<AuthResponse>('/register', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  logout: async (): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>('/logout');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/user');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: User }> => {
    try {
      const response = await api.put<{ message: string; user: User }>('/user', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // This method will be used in requests to authenticated endpoints
  getAuthenticatedApi() {
    return api;
  },
};
