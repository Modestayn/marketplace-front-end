import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthService } from '../services/AuthService';

const registerSchema = z.object({
  name: z.string().min(2, "Ім'я повинно містити мінімум 2 символи"),
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Пароль повинен містити мінімум 6 символів'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterResponse = { message: string };

type RegisterError = { message: string };

export default function Register() {
  const [message, setMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<RegisterResponse, RegisterError, RegisterFormData>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: (data) => {
      setMessage(data.message);
    },
    onError: (error) => {
      setMessage(error.message || 'Сталася помилка при реєстрації');
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          {...register('name')}
          placeholder="Введіть ваше Ім'я"
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          type='email'
          {...register('email')}
          placeholder='Введіть ваш Email'
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type='password'
          {...register('password')}
          placeholder='Введіть ваш пароль'
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
