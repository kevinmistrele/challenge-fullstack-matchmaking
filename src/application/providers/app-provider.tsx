import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from '@components/ui/sonner';
import { store } from '@application/store';
import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@components/layout/route/error-fallback';

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
