import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { AuthService } from '../services/AuthService';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(3, "Ім'я має бути мінімум 3 символи"),
  email: z.string().email('Неправильний формат форми'),
  password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className='text-red-500 text-sm'>{field.state.meta.errors.join(', ')}</p>
      ) : null}
    </>
  );
}

export default function Register() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        schema.parse(value);
        const response = await AuthService.register(value);
        setMessage(response.message);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(err.errors.map((e) => e.message).join('\n'));
        } else if (err instanceof Error) {
          setError(err.message + '\n');
        }
      }
    },
  });

  return (
    <div>
      <h1>Registration Form</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        {['name', 'email', 'password'].map((fieldName: string) => (
          <div key={fieldName} className='mb-4'>
            <form.Field
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name={fieldName}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className='block'>
                    {fieldName}:
                  </label>
                  <div className='relative'>
                    <input
                      id={field.name}
                      name={field.name}
                      type={fieldName === 'password' && !showPassword ? 'password' : 'text'}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='border p-2 w-full'
                    />
                    {fieldName === 'password' && (
                      <button
                        type='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-2 top-2 text-gray-500'
                      >
                        {showPassword ? 'Відобразити' : 'Скрити'}
                      </button>
                    )}
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
        ))}
        <button
          type='submit'
          disabled={!form.state.canSubmit || form.state.isSubmitting}
          className='bg-blue-500 text-white p-2 rounded'
        >
          {form.state.isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
      {message && <p className='text-green-500'>{message}</p>}
      {error && <p className='text-red-500 whitespace-pre-wrap'>{error}</p>}
    </div>
  );
}
