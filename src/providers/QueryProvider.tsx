import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { AuthProvider } from './auth/AuthProvider.tsx';

type AppProvidersProps = {
  children: ReactNode;
};

// Type predicate for API error responses
type ApiErrorResponse = {
  status: number;
  // Add other properties that might be in the response
};

function isApiError(error: unknown): error is Error & { response: ApiErrorResponse } {
  return (
    error instanceof Error &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'status' in error.response
  );
}

export function QueryProvider({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              // Don't retry on 401 Unauthorized errors
              if (isApiError(error) && error.response.status === 401) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
