import type { AnyFieldApi } from '@tanstack/react-form';

export const FieldError = ({ field }: { field: AnyFieldApi }) => {
  if (!field.state.meta.isTouched || !field.state.meta.errors?.length) return null;

  // Extract error messages from the Zod error objects
  const errorMessages = field.state.meta.errors.map((error: { message: string }) => error.message);

  return <p className='text-sm font-medium text-destructive mt-1'>{errorMessages.join(', ')}</p>;
};
