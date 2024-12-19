import { Response } from 'express';
import { ApiResponse, ErrorResponse } from '../types/response.type';

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    hasMore?: boolean,
    nextCursor?: string | null,
    statusCode: number = 200,
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      hasMore,
      nextCursor,
      error: null,
      metadata: {
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
      },
    };

    res.status(statusCode).json(response);
  }

  static error(res: Response, error: ErrorResponse, statusCode: number = 500): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error,
      metadata: {
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
      },
    };

    res.status(statusCode).json(response);
  }
}
