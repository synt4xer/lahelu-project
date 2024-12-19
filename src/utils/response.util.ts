import { Response } from 'express';
import { ApiResponse, ErrorResponse } from '../types/response.type';

export class ResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T | null,
    statusCode: number = 200,
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
      },
    };

    res.status(statusCode).json(response);
  }

  static successWithPagination<T>(
    res: Response,
    message: string,
    data: T | null,
    hasMore: boolean = false,
    nextCursor: string | null = null,
    statusCode: number = 200,
  ): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      hasMore,
      nextCursor,
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
      error,
      metadata: {
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
      },
    };

    res.status(statusCode).json(response);
  }
}
