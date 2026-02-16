# 🚀 Standard Web Seed

A production-ready, highly opinionated **React + TypeScript** template designed for scalability, performance, and enterprise-grade code quality. This boilerplate implements a strictly decoupled **3-Layer Architecture** and automated quality enforcement.

---

## 🏗️ Architecture Overview

The project follows a **Separation of Concerns (SoC)** approach, dividing the codebase into three distinct layers to ensure maintainability and long-term scalability:

* **Application Layer (`/application`)**: The technical foundation. It contains infrastructure, API clients (Axios), global state management (Redux Saga), and global providers.
* **Feature Layer (`/features`)**: The core business logic. It contains domain-specific hooks (TanStack Query), business rules (Zod validation schemas), and domain types.
* **Screen Layer (`/screens`)**: The user experience layer. It focuses on UI orchestration, page-specific components, and routing.

---

## 🛠️ Tech Stack

* **Core**: React 19 + Vite + TypeScript (Strict Mode).
* **Styling**: Tailwind CSS v4 + Shadcn UI.
* **State Management**: Redux Toolkit & Redux Saga.
* **Data Fetching**: TanStack Query (React Query) v5.
* **Validation**: Zod (Schema-based validation).
* **Navigation**: React Router Dom v7.
* **Notifications**: Sonner (Rich toast notifications).

---

## 🛡️ Quality & Hardening

This template enforces strict coding standards automatically via **Husky** and **lint-staged** to prevent technical debt:

* **Short Functions Rule**: All functions are restricted to a maximum of **50 lines** to ensure readability and single responsibility.
* **Cyclomatic Complexity**: Limited to **10** to prevent deeply nested logic and "spaghetti code".
* **Import Organization**: Automated grouping and sorting (External -> Application -> Features -> Screens -> UI).
* **Security**: Pre-configured protection against common vulnerabilities like XSS and unsafe inner HTML rendering.

---

## 📂 Project Structure

```bash
src/
├── application/     # Infrastructure (API, Store, Providers)
├── features/        # Business Logic (Hooks, Rules, Types)
├── screens/         # UI/UX (Pages, Screen-specific hooks)
├── components/      # Global Design System (UI & Layout)
├── routes/          # Navigation Configuration
└── types/           # Global TypeScript Contracts
```

## 🧪 Testing Strategy

The project implements a comprehensive testing pyramid:

* **Unit & Integration**: Powered by **Vitest** + **React Testing Library**.
* **API Mocking**: **MSW (Mock Service Worker)** for network-level interception.
* **E2E Testing**: **Playwright** for real-user journey validation across Chromium, Firefox, and WebKit.

To run all tests:
```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```