import axios, { AxiosInstance } from 'axios';

/**
 * BCL API Client
 * Handles HTTP communication with the BCL IMS API
 */
class BclApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BCL_API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include access token
    this.client.interceptors.request.use(async config => {
      // Skip token for auth endpoints
      if (config.url?.includes('/auth/generate')) {
        return config;
      }

      const token = await this.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        // Retry on 403 (token expired) - but only once
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          this.accessToken = null; // Clear cached token
          const token = await this.getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return this.client(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Get or refresh BCL access token
   */
  async getAccessToken(): Promise<string> {
    // Return cached token if still valid (with 5 min buffer)
    if (this.accessToken && this.tokenExpiresAt) {
      const bufferTime = 5 * 60 * 1000; // 5 minutes
      if (new Date() < new Date(this.tokenExpiresAt.getTime() - bufferTime)) {
        return this.accessToken;
      }
    }

    // Fetch new token
    const response = await this.client.post('/api/auth/generate', {
      VendorID: process.env.BCL_VENDOR_ID,
      SecretKey: process.env.BCL_SECRET_KEY,
    });

    if (response.data?.[0]?.AccessToken) {
      this.accessToken = response.data[0].AccessToken;
      // Assume token is valid for 1 hour
      this.tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
      return this.accessToken!;
    }

    throw new Error('Failed to obtain BCL access token');
  }

  /**
   * Make authenticated POST request to BCL API
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  /**
   * Make authenticated GET request to BCL API
   */
  async get<T>(endpoint: string, params?: any): Promise<T> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }
}

// Singleton instance
export const bclClient = new BclApiClient();
