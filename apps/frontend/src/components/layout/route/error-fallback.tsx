import { FallbackProps } from 'react-error-boundary';

import { logger } from '@application/services/logger';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  logger.error('React Rendering Error', error);

  return (
    <div className="p-4 border border-red-500 bg-red-50 rounded-lg">
      <h2 className="text-red-700 font-bold">Ops! Algo deu errado na interface.</h2>

      <button onClick={resetErrorBoundary} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Tentar novamente
      </button>
    </div>
  );
};
