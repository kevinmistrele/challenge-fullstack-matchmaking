import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

// Import server created in src/mocks/server.ts
import { server } from './mocks/server';

// Initialize MSW before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 2. clear the DOM and reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// 3. Close the server after all tests are done, preventing this from affecting irrelevant tests
afterAll(() => server.close());
