import { logger } from './logger';
import { tokenStorage } from './token-storage';

class AuthService {
  login(accessToken: string, refreshToken: string) {
    tokenStorage.setTokens(accessToken, refreshToken);
  }

  logout() {
    tokenStorage.clear();
    window.location.href = '/login';
  }

  isAuthenticated() {
    return Boolean(tokenStorage.getAccessToken());
  }

  getAccessToken() {
    return tokenStorage.getAccessToken();
  }

  async refreshToken() {
    try {
      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      // Here you would typically call your backend API to get a new access token using the refresh token
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      tokenStorage.setTokens(data.accessToken, data.refreshToken);

      return data.accessToken;
    } catch (error) {
      logger.error('Refresh token failed', error);
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
