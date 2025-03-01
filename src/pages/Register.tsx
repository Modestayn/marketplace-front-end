import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { AuthService } from '../services/AuthService';
import { useState } from 'react';

// Extract validation schema to improve readability
const schema = z.object({
  name: z.string().min(3, "Ім'я має бути мінімум 3 символи"),
  email: z.string().email('Неправильний формат форми'),
  password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
});

// Extract FieldInfo component with proper TypeScript typing
function FieldInfo({ field, customError }: { field: any; customError?: string }) {
  const hasFieldError = customError !== undefined && customError !== '';
  const hasValidationError = field.state.meta.isTouched && field.state.meta.errors.length > 0;

  return (
    <>
      {hasFieldError ? (
        <p className='text-red-500 text-sm'>{customError}</p>
      ) : hasValidationError ? (
        <p className='text-red-500 text-sm'>{field.state.meta.errors.join(', ')}</p>
      ) : null}
    </>
  );
}

// Define field types for better type safety
const formFields = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'email', type: 'text', label: 'Email' },
  { name: 'password', type: 'password', label: 'Password' },
] as const;

export default function Register() {
  const [message, setMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
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
        setFieldErrors({});
        setGeneralError(null);
      } catch (err) {
        setMessage(null);
        if (err instanceof z.ZodError) {
          // Map ZodErrors to their respective fields
          const errors: Record<string, string> = {};
          err.errors.forEach((e) => {
            if (e.path.length > 0) {
              const fieldName = e.path[0].toString();
              errors[fieldName] = e.message;
            }
          });
          setFieldErrors(errors);
          setGeneralError(null);
        } else if (err instanceof Error) {
          setGeneralError(err.message);
          setFieldErrors({});
        }
      }
    },
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

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
        {formFields.map(({ name, label }) => (
          <div key={name} className='mb-4'>
            <form.Field
              name={name}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className='block'>
                    {label}:
                  </label>
                  <div className='relative'>
                    <input
                      id={field.name}
                      name={field.name}
                      type={name === 'password' && !showPassword ? 'password' : 'text'}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='border p-2 w-full'
                    />
                    {name === 'password' && (
                      <button
                        type='button'
                        onClick={handleTogglePassword}
                        className='absolute right-2 top-2 text-gray-500'
                      >
                        {showPassword ? 'Відобразити' : 'Скрити'}
                      </button>
                    )}
                  </div>
                  <FieldInfo field={field} customError={fieldErrors[name]} />
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
      {generalError && <p className='text-red-500 whitespace-pre-wrap'>{generalError}</p>}
    </div>
  );
}
