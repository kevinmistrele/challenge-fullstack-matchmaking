import { http, HttpResponse } from 'msw';

/**
 * Handlers de simulação de API para o ambiente de testes.
 * Seguindo a Camada de Aplicação, centralizamos aqui os mocks globais.
 */
export const handlers = [
  // Mock de exemplo: Listagem de Usuários
  http.get('*/users', () => {
    return HttpResponse.json(
      [
        {
          id: '1',
          name: 'Kevin Tavares Mistrele',
          email: 'kevin@example.com',
          role: 'Pleno Front-End Engineer',
        },
        {
          id: '2',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Junior Developer',
        },
      ],
      { status: 200 },
    );
  }),

  // Mock de exemplo: Login (POST)
  http.post('*/login', async ({ request }) => {
    const info = await request.json();

    // Simulação de erro de validação simples
    if (!info) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({
      token: 'mocked-jwt-token-for-testing',
      user: { id: '1', name: 'Kevin Mistrele' },
    });
  }),
];
