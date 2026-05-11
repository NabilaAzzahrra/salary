/**
 * Custom API client using fetch to mimic Axios behavior.
 * Automatically handles the Authorization header if a token is present in localStorage.
 */

const BASE_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id";

const api = {
  /**
   * Helper to handle fetch responses and mimic Axios response structure
   */
  async request(endpoint: string, options: RequestInit = {}) {
    // Determine if endpoint is a full URL or just a path
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    // Get token from localStorage if available (client-side only)
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("access_token");
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      // Try to parse JSON, if it fails, return empty object or text
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
        // If it looks like JSON but content-type is wrong, try parsing anyway
        try {
          if (typeof data === 'string' && (data.startsWith('{') || data.startsWith('['))) {
            data = JSON.parse(data);
          }
        } catch (e) {
          // Keep as text if parsing fails
        }
      }

      // If response is not ok (4xx, 5xx), throw to mimic Axios behavior
      if (!response.ok) {
        const error: any = new Error(data?.message || `Request failed with status ${response.status}`);
        error.response = {
          status: response.status,
          data: data,
        };
        throw error;
      }

      return {
        status: response.status,
        data: data,
        headers: response.headers,
      };
    } catch (error: any) {
      // If it's already a formatted error (thrown above), re-throw it
      if (error.response) throw error;

      // Otherwise, create a network error that looks like Axios error
      const networkError: any = new Error("Network Error");
      networkError.response = {
        status: 0,
        data: { message: error.message || "Terjadi kesalahan koneksi ke server." },
      };
      throw networkError;
    }
  },

  async get(url: string, options: RequestInit = {}) {
    return this.request(url, {
      ...options,
      method: 'GET',
    });
  },

  async post(url: string, data: any, options: RequestInit = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put(url: string, data: any, options: RequestInit = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(url: string, options: RequestInit = {}) {
    return this.request(url, {
      ...options,
      method: 'DELETE',
    });
  }
};

export default api;

