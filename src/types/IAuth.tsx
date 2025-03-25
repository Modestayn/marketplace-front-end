// User model
export type User = {
  id: number;
  name: string;
  email: string;
};

// Login credentials
export type LoginCredentials = {
  email: string;
  password: string;
};

// Registration data
export type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

// Update profile data
export type UpdateProfileData = {
  name?: string;
  email?: string;
};

// Auth response from API
export type AuthResponse = {
  user: User;
  token: string;
};

// API Error response
export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

// Auth context type
export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};
