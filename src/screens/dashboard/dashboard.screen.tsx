import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/route-paths';

export function DashboardScreen() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('@seed:token');
    navigate(ROUTES.login);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>

        <CardContent>
          <p>Bem-vindo ao sistema 🚀</p>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}
