import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import { Navigate, useRouter } from '@tanstack/react-router';
import { Loader } from '@/components/Loader';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Store the path user was trying to access
    const currentPath = router.state.location.pathname;
    return <Navigate to='/login' search={{ from: currentPath }} />;
  }

  // Render children if authenticated
  return <>{children}</>;
};
