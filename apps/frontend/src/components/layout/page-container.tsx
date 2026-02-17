import { Outlet } from 'react-router-dom';

export function PageContainer() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 font-bold text-primary">Mistrele Stack</header>
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
