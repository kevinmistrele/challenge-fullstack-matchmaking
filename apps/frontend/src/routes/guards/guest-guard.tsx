import { Navigate } from 'react-router-dom';

import { authService } from '@application/services/auth-service';

import { ROUTES } from '../route-paths';

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <>{children}</>;
}
