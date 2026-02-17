# 📖 Developer Guide - Standard Web Seed

This guide explains how to extend and maintain the project using the enterprise standards implemented.

---

## 🪵 Logger System (Adapter Pattern)

The logging system is decoupled. You can send logs to multiple destinations (Console, API, Firebase) simultaneously.

### How to use logs:

```typescript
import { logger } from '@application/services/logger';

logger.info('User viewed dashboard', { userId: 123 });
logger.error('Failed to fetch data', error);
```

---

### How to create a new Provider:

1. Create a class that implements `LogProvider`.
2. Implement the `send` method.

```typescript
// src/application/services/logger/providers/firebase-provider.ts
import { LogProvider } from '../types';

export class FirebaseLogProvider implements LogProvider {
  send(level: string, message: string, data?: unknown) {
    // logic to send to Firebase Analytics/Firestore
  }
}
```

---

### How to register providers:

In your `main.tsx`, add the providers you want to use:

```typescript
import { logger } from '@application/services/logger';
import { ConsoleLogProvider } from '@application/services/logger/providers/console-provider';
import { ApiLogProvider } from '@application/services/logger/providers/api-provider';

logger.addProvider(new ConsoleLogProvider());
logger.addProvider(new ApiLogProvider());
```

---

## 🛡️ Validation with Zod

We use Zod in the Feature Layer to ensure data integrity from APIs and forms.

### Defining a Schema:

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
```

---

### Validating Data:

```typescript
const result = UserSchema.safeParse(apiData);

if (!result.success) {
  logger.error('Invalid user data', result.error);
}
```

---

## 🛤️ Routing System

Routes are divided into Public and Private groups using Layouts and Guards.

### Adding a new route:

1. Open `src/routes/index.tsx`
2. Add your route inside the appropriate `children` array.

```typescript
// For a protected route:
{
  element: <PrivateGuard />,
  children: [
    { path: '/my-new-secure-page', element: <MyNewScreen /> }
  ]
}
```

---

## 🧪 Testing Pyramid

We use three levels of testing to ensure total reliability.

---

### 1️⃣ Unit Tests (Vitest)

Used for business logic in Slices, Utils, and Hooks.

- File pattern: `*.test.ts`
- Run:

```bash
npm run test
```

---

### 2️⃣ API Mocking (MSW)

Intercepts network requests.  
Always add a handler for new API endpoints.

File: `src/test/mocks/handlers.ts`

```typescript
import { http, HttpResponse } from 'msw';

http.get('*/my-endpoint', () => {
  return HttpResponse.json({ data: 'mocked' });
});
```

---

### 3️⃣ E2E Tests (Playwright)

Validates the full user journey in real browsers.

- Folder: `/tests-e2e`
- Run:

```bash
npm run test:e2e
```

💡 Tip: Use `npx playwright codegen` to record tests.

---

## 🛠️ Quality Standards

- **Function Length:** Max 50 lines (Enforced by Husky)
- **Complexity:** Max 10 (Enforced by Husky)
- **Architecture Flow:** Always follow  
  `Application → Feature → Screen`

---

## 🚀 Why This Architecture Elevates Your Level

### 1️⃣ Platform Mindset
You are not just coding features — you are defining standards that prevent the team from making architectural mistakes.

### 2️⃣ Observability
The pluggable logging system shows concern about what happens after deployment.

### 3️⃣ Strong Contracts
Using Zod combined with Logger demonstrates professional error handling instead of silent `try/catch` blocks.

## 🚀 Continuous Deployment (CD)
The deployment pipeline is triggered automatically after the **Quality Gate (CI)** passes on the `main` branch.

### Setting up a new provider:
1. Choose your provider (Vercel, Netlify, AWS).
2. Add the required credentials (e.g., `VERCEL_TOKEN`, `AWS_ACCESS_KEY`) to your **GitHub Repository Secrets**.
3. Update the `deploy` job in `.github/workflows/ci.yml` with the provider's CLI command.

### Preview Environments:
For a truly professional workflow, it is recommended to enable **Preview Deployments** for Pull Requests. This allows reviewers to see the changes live before merging.
---

## 📦 Project Philosophy

This seed is built to:

- Scale safely
- Enforce architectural boundaries
- Enable strong typing everywhere
- Be CI/CD ready
- Support international-level engineering standards

---

> If you’re extending this template, always prioritize maintainability over speed.

