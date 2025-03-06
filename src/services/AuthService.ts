import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

const apiBaseURL = 'http://your-api-url.com';

const api = axios.create({
  baseURL: apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
});

type IRegisterResponse = {
  message: string;
};

export const AuthService = {
  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      const response = await api.get(`/users/check-email`, { params: { email } });
      return response.data.exists;
    } catch (error) {
      throw new Error('Помилка перевірки наявності користувача: ' + (error as Error).message);
    }
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<IRegisterResponse> => {
    try {
      const response = await api.post('/users/register', data);
      return response.data;
    } catch (error) {
      throw new Error('Помилка реєстрації: ' + (error as Error).message);
    }
  },
};

export const useCheckUserExists = (email: string) => {
  return useQuery({
    queryKey: ['checkUserExists', email],
    queryFn: () => AuthService.checkUserExists(email),
    enabled: !!email,
  });
};

export const useRegister = () => {
  return useMutation<IRegisterResponse, Error, { name: string; email: string; password: string }>({
    mutationFn: (data) => AuthService.register(data),
    onError: (error: Error) => {
      console.error('Ошибка регистрации:', error);
    },
    onSuccess: (data) => {
      console.log('Пользователь зарегистрирован', data);
    },
  });
};
