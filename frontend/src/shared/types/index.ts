// Re-export store types
export type { User } from '../../core/state/authStore';

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Navigation event types
export type ScanResult = {
  imageUris: string[];
  title?: string;
};
