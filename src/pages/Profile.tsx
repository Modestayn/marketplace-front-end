import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader } from '@/components/Loader';
import { CreditCardIcon, MailIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { ProtectedRoute } from '@/providers/ProtectedRoute';
import { UserService } from '@/services/UserService.ts';

// Field error component
function FieldError({ field }: { field: AnyFieldApi }) {
  if (!field.state.meta.isTouched || !field.state.meta.errors?.length) return null;

  // Extract error messages from the Zod error objects
  const errorMessages = field.state.meta.errors.map((error: { message: string }) => error.message);

  return <p className='text-sm font-medium text-destructive mt-1'>{errorMessages.join(', ')}</p>;
}

function ProfileForm() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Profile update schema
  const schema = z.object({
    name: z.string().min(3, t('profile.name.validation.min_length')),
    email: z.string().email(t('profile.email.validation.invalid_format')),
  });

  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsUpdating(true);
        setUpdateSuccess(false);
        setUpdateError(null);

        await UserService.updateProfile(value);

        setUpdateSuccess(true);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setUpdateError(errorMessage);
      } finally {
        setIsUpdating(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.personal_info')}</CardTitle>
        <CardDescription>{t('profile.personal_info_description')}</CardDescription>
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
                <Label htmlFor={field.name}>{t('profile.name.label')}</Label>
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
                <Label htmlFor={field.name}>{t('profile.email.label')}</Label>
                <div className='relative'>
                  <MailIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <Input
                    id={field.name}
                    name={field.name}
                    type='email'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`pl-9 ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-destructive' : ''}`}
                  />
                </div>
                <FieldError field={field} />
              </div>
            )}
          />

          <Button type='submit' className='mt-4' disabled={isUpdating || !form.state.canSubmit}>
            {isUpdating ? (
              <>
                <Loader size='sm' className='mr-2' />
                {t('profile.updating')}
              </>
            ) : (
              t('profile.update')
            )}
          </Button>
        </form>

        {updateSuccess && (
          <Alert className='mt-4 border-green-500 text-green-700 bg-green-50'>
            <AlertDescription>{t('profile.update_success')}</AlertDescription>
          </Alert>
        )}

        {updateError && (
          <Alert className='mt-4 border-destructive bg-destructive/10'>
            <AlertDescription>{updateError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function SecuritySection() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.security')}</CardTitle>
        <CardDescription>{t('profile.security_description')}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='border rounded-lg p-4'>
          <div className='flex items-start gap-4'>
            <div className='p-2 rounded-full bg-primary/10'>
              <ShieldIcon className='h-5 w-5 text-primary' />
            </div>
            <div>
              <h3 className='font-medium'>{t('profile.change_password')}</h3>
              <p className='text-sm text-muted-foreground mt-1'>
                {t('profile.change_password_description')}
              </p>
              <Button size='sm' variant='outline' className='mt-3'>
                {t('profile.change_password_button')}
              </Button>
            </div>
          </div>
        </div>

        <div className='border rounded-lg p-4'>
          <div className='flex items-start gap-4'>
            <div className='p-2 rounded-full bg-primary/10'>
              <CreditCardIcon className='h-5 w-5 text-primary' />
            </div>
            <div>
              <h3 className='font-medium'>{t('profile.two_factor')}</h3>
              <p className='text-sm text-muted-foreground mt-1'>
                {t('profile.two_factor_description')}
              </p>
              <Button size='sm' variant='outline' className='mt-3'>
                {t('profile.two_factor_button')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// function AccountManagementSection() {
//   const { t } = useTranslation();
//
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{t('profile.account_management')}</CardTitle>
//         <CardDescription>{t('profile.account_management_description')}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className='border border-destructive/30 rounded-lg p-4'>
//           <div className='flex items-start gap-4'>
//             <div className='p-2 rounded-full bg-destructive/10'>
//               <AlertOctagon className='h-5 w-5 text-destructive' />
//             </div>
//             <div>
//               <h3 className='font-medium text-destructive'>{t('profile.delete_account')}</h3>
//               <p className='text-sm text-muted-foreground mt-1'>
//                 {t('profile.delete_account_description')}
//               </p>
//               <Button size='sm' variant='destructive' className='mt-3'>
//                 {t('profile.delete_account_button')}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

export default function Profile() {
  const { t } = useTranslation();

  return (
    <ProtectedRoute>
      <div className='container mx-auto flex items-center justify-center'>
        <div className='container py-8 max-w-4xl'>
          <h1 className='text-3xl font-bold mb-8'>{t('profile.title')}</h1>
          <div className='grid gap-8'>
            <ProfileForm />
            <SecuritySection />
            {/*<AccountManagementSection />*/}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
