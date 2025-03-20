import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth.ts';
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
import { Loader } from '@/components/Loader.tsx';

// Field error component
function FieldError({ field }: { field: AnyFieldApi }) {
  if (!field.state.meta.isTouched || field.state.meta.errors.length === 0) return null;

  return (
    <p className='text-sm font-medium text-destructive mt-1'>
      {field.state.meta.errors.join(', ')}
    </p>
  );
}

export default function Register() {
  const { t } = useTranslation();
  const { register, isLoading, error: authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Extract validation schema with translations
  const schema = z.object({
    name: z.string().min(3, t('register.name.validation.min_length')),
    email: z.string().email(t('register.email.validation.invalid_format')),
    password: z.string().min(6, t('register.password.validation.min_length')),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        schema.parse(value);
        await register({
          name: value.name,
          email: value.email,
          password: value.password,
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error('Validation error:', err.errors);
        }
      }
    },
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-4.1rem)] bg-gradient-to-br from-indigo-50 to-purple-50 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-bold text-primary'>{t('register.title')}</CardTitle>
          <CardDescription>{t('register.description')}</CardDescription>
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
                  <Label htmlFor={field.name}>{t('register.name.label')}</Label>
                  <div className='relative'>
                    <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='text'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`pl-9 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-destructive' : ''}`}
                      placeholder={t('register.name.placeholder')}
                    />
                  </div>
                  <FieldError field={field} />
                </div>
              )}
            />

            <form.Field
              name='email'
              children={(field) => (
                <div className='space-y-1'>
                  <Label htmlFor={field.name}>{t('register.email.label')}</Label>
                  <div className='relative'>
                    <MailIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='text'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`pl-9 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-destructive' : ''}`}
                      placeholder={t('register.email.placeholder')}
                    />
                  </div>
                  <FieldError field={field} />
                </div>
              )}
            />

            <form.Field
              name='password'
              children={(field) => (
                <div className='space-y-1'>
                  <Label htmlFor={field.name}>{t('register.password.label')}</Label>
                  <div className='relative'>
                    <KeyIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? 'text' : 'password'}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`pl-9 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-destructive' : ''}`}
                      placeholder={t('register.password.placeholder')}
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
                  <FieldError field={field} />
                </div>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading || !form.state.canSubmit}>
              {isLoading ? (
                <>
                  <Loader size='sm' className='mr-2' />
                  {t('register.submit.creating')}
                </>
              ) : (
                t('register.submit.create')
              )}
            </Button>
          </form>

          {authError && (
            <Alert className='mt-4 border-destructive bg-destructive/10'>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className='flex flex-col space-y-4 mt-4'>
          <div className='text-sm text-center text-muted-foreground'>
            {t('register.login_prompt')}{' '}
            <Link to='/login' className='text-primary hover:underline font-medium'>
              {t('register.login_link')}
            </Link>
          </div>
          <p className='text-xs text-center text-muted-foreground'>{t('register.terms')}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
