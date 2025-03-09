import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { AuthService } from '../services/AuthService';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, KeyIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

// Extract validation schema
const schema = z.object({
  name: z.string().min(3, "Ім'я має бути мінімум 3 символи"),
  email: z.string().email('Неправильний формат форми'),
  password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
});

// Field error component
function FieldInfo({ field, customError }: { field: any; customError?: string }) {
  const hasFieldError = customError !== undefined && customError !== '';
  const hasValidationError = field.state.meta.isTouched && field.state.meta.errors.length > 0;

  if (!hasFieldError && !hasValidationError) return null;

  const errorMessage = hasFieldError ? customError : field.state.meta.errors.join(', ');

  return <p className='text-sm font-medium text-destructive mt-1'>{errorMessage}</p>;
}

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
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold text-primary'>Join Us</CardTitle>
          <CardDescription>Create your account in seconds</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await form.handleSubmit();
            }}
            className='space-y-4'
          >
            <form.Field
              name='name'
              children={(field) => (
                <div className='space-y-1'>
                  <Label htmlFor={field.name}>Name</Label>
                  <div className='relative'>
                    <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='text'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`pl-9 ${fieldErrors[field.name] || (field.state.meta.isTouched && field.state.meta.errors.length) ? 'border-destructive' : ''}`}
                      placeholder='Your name'
                    />
                  </div>
                  <FieldInfo field={field} customError={fieldErrors[field.name]} />
                </div>
              )}
            />

            <form.Field
              name='email'
              children={(field) => (
                <div className='space-y-1'>
                  <Label htmlFor={field.name}>Email</Label>
                  <div className='relative'>
                    <MailIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='text'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`pl-9 ${fieldErrors[field.name] || (field.state.meta.isTouched && field.state.meta.errors.length) ? 'border-destructive' : ''}`}
                      placeholder='Your email'
                    />
                  </div>
                  <FieldInfo field={field} customError={fieldErrors[field.name]} />
                </div>
              )}
            />

            <form.Field
              name='password'
              children={(field) => (
                <div className='space-y-1'>
                  <Label htmlFor={field.name}>Password</Label>
                  <div className='relative'>
                    <KeyIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? 'text' : 'password'}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`pl-9 ${fieldErrors[field.name] || (field.state.meta.isTouched && field.state.meta.errors.length) ? 'border-destructive' : ''}`}
                      placeholder='Your password'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground'
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <EyeOffIcon className='h-4 w-4' />
                      ) : (
                        <EyeIcon className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                  <FieldInfo field={field} customError={fieldErrors[field.name]} />
                </div>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              disabled={!form.state.canSubmit || form.state.isSubmitting}
            >
              {form.state.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {message && (
            <Alert className='mt-4 border-green-500 text-green-700 bg-green-50'>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {generalError && (
            <Alert className='mt-4 border-destructive bg-destructive/10'>
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className='flex flex-col space-y-4 mt-4'>
          <div className='text-sm text-center text-muted-foreground'>
            Already have an account?{' '}
            <Link to='/login' className='text-primary hover:underline font-medium'>
              Sign in
            </Link>
          </div>
          <p className='text-xs text-center text-muted-foreground'>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
