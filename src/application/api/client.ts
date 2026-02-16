import axios from 'axios';
import { toast } from 'sonner';

import { authService } from '../services/auth-service';
import { logger } from '../services/logger';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

apiClient.interceptors.request.use((config) => {
  const token = authService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   RESPONSE INTERCEPTOR
========================= */

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await authService.refreshToken();

      if (newToken) {
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }

      processQueue(error, null);
    }

    logger.error('API Error', error);
    toast.error(error.response?.data?.message || 'Erro inesperado');

    return Promise.reject(error);
  },
);
