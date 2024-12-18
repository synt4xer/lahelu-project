import { Response } from 'express';
import { ResponseUtil } from '../../src/utils/response.util';
import { ErrorResponse } from '../../src/types/response.type';

describe('ResponseUtil', () => {
  let mockResponse: Partial<Response>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockRequest: any;

  beforeEach(() => {
    mockRequest = {
      originalUrl: '/test-path',
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      req: mockRequest,
    };
  });

  describe('success', () => {
    it('should return success response with default status code 200', () => {
      const testData = { message: 'Success' };

      ResponseUtil.success(mockResponse as Response, testData);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: testData,
        error: null,
        metadata: {
          timestamp: expect.any(String),
          path: '/test-path',
        },
      });
    });

    it('should return success response with custom status code', () => {
      const testData = { message: 'Created' };
      const statusCode = 201;

      ResponseUtil.success(mockResponse as Response, testData, statusCode);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: testData,
        error: null,
        metadata: {
          timestamp: expect.any(String),
          path: '/test-path',
        },
      });
    });
  });

  describe('error', () => {
    it('should return error response with default status code 500', () => {
      const errorResponse: ErrorResponse = {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      };

      ResponseUtil.error(mockResponse as Response, errorResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        error: errorResponse,
        metadata: {
          timestamp: expect.any(String),
          path: '/test-path',
        },
      });
    });

    it('should return error response with custom status code', () => {
      const errorResponse: ErrorResponse = {
        code: 'NOT_FOUND',
        message: 'Resource not found',
      };
      const statusCode = 404;

      ResponseUtil.error(mockResponse as Response, errorResponse, statusCode);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        error: errorResponse,
        metadata: {
          timestamp: expect.any(String),
          path: '/test-path',
        },
      });
    });
  });
});
