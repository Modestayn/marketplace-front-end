import { ReactNode, useEffect, useState } from 'react';
import type { LoginCredentials, RegisterData, User } from '@/types/IAuth.tsx';
import { AuthService, setupAuthInterceptor } from '@/services/AuthService.ts';
import { router } from '@/router.ts';
import { AuthContext } from '@/providers/auth/AuthContext.ts';

// Local storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Auth provider component

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from local storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedToken) {
          setupAuthInterceptor(storedToken);
          setToken(storedToken);

          // Try to get user data from local storage first for quick rendering
          const storedUser = localStorage.getItem(USER_KEY);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          // Validate token by fetching current user
          try {
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
          } catch (error) {
            // If token is invalid, clear auth state
            console.error('Error validating token:', error);
            handleLogout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Setup auth interceptor when token changes
  useEffect(() => {
    setupAuthInterceptor(token);
  }, [token]);

  // Login handler
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);

      // Save to state
      setToken(response.token);
      setUser(response.user);

      // Save to local storage
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));

      // Navigate to home or dashboard
      router.navigate({ to: '/' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.register(data);

      // Save to state
      setToken(response.token);
      setUser(response.user);

      // Save to local storage
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));

      // Navigate to home or dashboard
      router.navigate({ to: '/' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    // Clear state
    setToken(null);
    setUser(null);

    // Clear local storage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call logout API
      if (token) {
        await AuthService.logout();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      handleLogout();
      setIsLoading(false);
      router.navigate({ to: '/login' });
    }
  };

  // Context value
  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
