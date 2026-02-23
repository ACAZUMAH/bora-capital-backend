import axios, { AxiosInstance } from 'axios';
import https from 'https';

/**
 * BCL API Client
 * Handles HTTP communication with the BCL IMS API
 */
class BclApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiresAt: Date | null = null;
  private tokenRefreshPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.BCL_API_BASE_URL}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      // // TODO: Remove once BCL renews their SSL certificate
      // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
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
    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise;
    }
    // Return cached token if still valid (with 10 sec buffer)
    if (this.accessToken && this.tokenExpiresAt) {
      const bufferTime = 10 * 1000; // 10 seconds
      if (new Date() < new Date(this.tokenExpiresAt.getTime() - bufferTime)) {
        return this.accessToken;
      }
    }

    // Fetch new token with promise deduplication
    this.tokenRefreshPromise = this.fetchNewToken();
    try {
      return await this.tokenRefreshPromise;
    } finally {
      this.tokenRefreshPromise = null;
    }
  }

  private async fetchNewToken(): Promise<string> {
    const response = await this.client.post('/api/auth/generateaccesstoken', {
      VendorID: `${process.env.BCL_VENDOR_ID}`,
      SecretKey: `${process.env.BCL_SECRET_KEY}`,
    });
    if (response.data?.[0]?.AccessToken) {
      this.accessToken = response.data[0].AccessToken;
      this.tokenExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute
      return this.accessToken!;
    }
    throw new Error('Failed to obtain BCL access token');
  }

  /**
   * Make authenticated POST request to BCL API
   */
  async post(endpoint: string, data: any) {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  /**
   * Make authenticated GET request to BCL API
   */
  async get(endpoint: string, params?: any) {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }
}

// Singleton instance
export const bclClient = new BclApiClient();
