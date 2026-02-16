import { useQuery } from '@tanstack/react-query';

import { api } from '@application/api/client';

import type { User } from '../rules/validate-user';

async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get('/users');
  return data;
}

export function useUsersData() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
