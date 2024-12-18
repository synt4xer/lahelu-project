import { Response } from 'express';
import { ApiResponse, ErrorResponse } from '../types/response.type';

export class ResponseUtil {
  static success<T>(res: Response, data: T, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      error: null,
      metadata: {
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
        // version: 'v1', // no versioning yet
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
        // version: 'v1', // no versioning yet
      },
    };

    res.status(statusCode).json(response);
  }
}
