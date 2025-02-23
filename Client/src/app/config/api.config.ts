import { InjectionToken } from '@angular/core';

// Used for dependency injection
// and can be used to insert settings such as the API URL
// and the time value to wait before the request times out.
export interface ApiConfig {
  apiUrl: string;
  timeout: number;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');
