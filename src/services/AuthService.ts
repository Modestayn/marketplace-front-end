import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url.com',
  timeout: 10000,
});

type IRegisterResponse = {
  message: string;
};

export const AuthService = {
  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      const response = await api.get(`/users/check-email?email=${email}`);
      return response.data.exists;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Помилка перевірки наявності користувача: ' + error.message);
      }
      throw new Error('Помилка перевірки наявності користувача');
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
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Помилка реєстрації: ' + error.message);
      }
      throw new Error('Помилка реєстрації');
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
