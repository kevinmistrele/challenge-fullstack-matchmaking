import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

import { ROUTES } from '@/routes/route-paths';

export function LoginScreen() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem('@seed:token', 'fake-token');
    navigate(ROUTES.home);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input placeholder="email@example.com" />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" placeholder="••••••••" />
        </div>

        <Button className="w-full" onClick={handleLogin}>
          Entrar
        </Button>
      </CardContent>
    </Card>
  );
}
