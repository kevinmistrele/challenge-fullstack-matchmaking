import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import { authService } from '../services/auth-service';
import { logger } from '../services/logger';
import { createRefreshQueue } from './refresh-queue';

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * Logic for attaching the Bearer token to requests
 */
const attachAuthToken = (config: InternalAxiosRequestConfig) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

/**
 * Logic for handling 401s and token refreshing
 */
const handleAuthError =
  (api: AxiosInstance, refreshQueue: ReturnType<typeof createRefreshQueue>) =>
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequest;

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return handleGeneralError(error);
    }

    // Handle concurrent 401s by queuing them
    if (refreshQueue.getRefreshingState()) {
      return new Promise<string | null>((resolve, reject) => {
        refreshQueue.enqueue({ resolve, reject });
      }).then((token) => {
        if (token) originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    refreshQueue.setRefreshingState(true);

    try {
      const newToken = await authService.refreshToken();
      if (!newToken) throw new Error('Failed to refresh token');

      refreshQueue.processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      refreshQueue.processQueue(refreshError as Error, null);
      return Promise.reject(refreshError);
    } finally {
      refreshQueue.setRefreshingState(false);
    }
  };

/**
 * Logic for logging and UI notifications
 */
const handleGeneralError = (error: AxiosError) => {
  logger.error('API Error', error);
  const message = (error.response?.data as { message?: string })?.message ?? 'Erro inesperado';
  toast.error(message);
  return Promise.reject(error);
};

export function createApiClient(): AxiosInstance {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const refreshQueue = createRefreshQueue();

  api.interceptors.request.use(attachAuthToken);

  api.interceptors.response.use((response) => response, handleAuthError(api, refreshQueue));

  return api;
}
