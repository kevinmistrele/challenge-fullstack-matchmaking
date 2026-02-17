import { Navigate } from 'react-router-dom';

import { authService } from '@application/services/auth-service';

import { ROUTES } from '../route-paths';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = authService.isAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
}
