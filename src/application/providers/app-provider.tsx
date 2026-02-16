import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@application/store';

import { ErrorFallback } from '@components/layout/route/error-fallback';
import { Toaster } from '@components/ui/sonner';

import { QueryProvider } from './QueryProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {children}
          <Toaster richColors position="top-right" />
        </ErrorBoundary>
      </QueryProvider>
    </ReduxProvider>
  );
}
