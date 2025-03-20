import { createContext } from 'react';
import type { AuthContextType } from '@/types/IAuth.tsx';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});
