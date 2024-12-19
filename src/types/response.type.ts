export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T | null;
  hasMore?: boolean;
  nextCursor?: string | null;
  error?: ErrorResponse | null;
  metadata?: {
    timestamp: string;
    path: string;
  };
}

export interface ErrorResponse {
  code: string;
  message: string;
}
