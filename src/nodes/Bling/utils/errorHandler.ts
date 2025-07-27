// src/nodes/Bling/utils/errorHandler.ts
import { NodeOperationError } from 'n8n-workflow';

export class BlingErrorHandler {
    static handleBlingError(error: any, node: any): never {
        if (error.httpCode) {
            switch (error.httpCode) {
                case '400':
                    throw new NodeOperationError(node, `Bad Request: ${error.message}. Check your input data.`);
                case '401':
                    throw new NodeOperationError(node, 'Authentication failed. Please check your OAuth credentials.');
                case '403':
                    throw new NodeOperationError(node, 'Access forbidden. Check your API permissions and scopes.');
                case '404':
                    throw new NodeOperationError(node, `Resource not found: ${error.message}`);
                case '422':
                    throw new NodeOperationError(node, `Validation error: ${error.message}. Check required fields.`);
                case '429':
                    throw new NodeOperationError(node, 'Rate limit exceeded. Please wait before making more requests.');
                case '500':
                    throw new NodeOperationError(node, `Bling server error: ${error.message}. Try again later.`);
                default:
                    throw new NodeOperationError(node, `Bling API error (${error.httpCode}): ${error.message}`);
            }
        }

        // Handle specific Bling error types
        if (error.error?.type) {
            switch (error.error.type) {
                case 'VALIDATION_ERROR':
                    throw new NodeOperationError(node, `Validation Error: ${error.error.message}`);
                case 'MISSING_REQUIRED_FIELD_ERROR':
                    throw new NodeOperationError(node, `Missing Required Field: ${error.error.message}`);
                case 'RESOURCE_NOT_FOUND':
                    throw new NodeOperationError(node, `Resource Not Found: ${error.error.message}`);
                default:
                    throw new NodeOperationError(node, `Bling Error: ${error.error.message}`);
            }
        }

        throw new NodeOperationError(node, `Unexpected error: ${error.message || error}`);
    }

    static validateDateRange(startDate: string, endDate: string, node: any): void {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const oneYear = 365 * 24 * 60 * 60 * 1000; // One year in milliseconds

        if (end.getTime() - start.getTime() > oneYear) {
            throw new NodeOperationError(node, 'Date range cannot exceed 1 year due to Bling API limitations.');
        }
    }

    static validatePagination(page: number, limit: number, node: any): void {
        if (page < 1) {
            throw new NodeOperationError(node, 'Page number must be 1 or greater.');
        }

        if (limit < 1 || limit > 100) {
            throw new NodeOperationError(node, 'Limit must be between 1 and 100.');
        }
    }
}
