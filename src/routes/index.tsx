import { createBrowserRouter } from 'react-router-dom';

import { LoginScreen } from '@screens/auth/login.screen';
import { DashboardScreen } from '@screens/dashboard/dashboard.screen';

import { AppLayout } from '@components/layout/route/app-layout';
import { AuthLayout } from '@components/layout/route/auth-layout';

import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';
import { ROUTES } from './route-paths';

export const router = createBrowserRouter([
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: ROUTES.login,
        element: <LoginScreen />,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: ROUTES.home,
        element: <DashboardScreen />,
      },
    ],
  },
]);
