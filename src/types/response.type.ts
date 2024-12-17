export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ErrorResponse | null;
  metadata?: {
    timestamp: string;
    path: string;
    // version: string;
  };
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}