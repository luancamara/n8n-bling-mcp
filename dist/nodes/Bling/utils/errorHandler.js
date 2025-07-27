"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingErrorHandler = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class BlingErrorHandler {
    static handleBlingError(error, node) {
        var _a;
        if (error.httpCode) {
            switch (error.httpCode) {
                case '400':
                    throw new n8n_workflow_1.NodeOperationError(node, `Bad Request: ${error.message}. Check your input data.`);
                case '401':
                    throw new n8n_workflow_1.NodeOperationError(node, 'Authentication failed. Please check your OAuth credentials.');
                case '403':
                    throw new n8n_workflow_1.NodeOperationError(node, 'Access forbidden. Check your API permissions and scopes.');
                case '404':
                    throw new n8n_workflow_1.NodeOperationError(node, `Resource not found: ${error.message}`);
                case '422':
                    throw new n8n_workflow_1.NodeOperationError(node, `Validation error: ${error.message}. Check required fields.`);
                case '429':
                    throw new n8n_workflow_1.NodeOperationError(node, 'Rate limit exceeded. Please wait before making more requests.');
                case '500':
                    throw new n8n_workflow_1.NodeOperationError(node, `Bling server error: ${error.message}. Try again later.`);
                default:
                    throw new n8n_workflow_1.NodeOperationError(node, `Bling API error (${error.httpCode}): ${error.message}`);
            }
        }
        if ((_a = error.error) === null || _a === void 0 ? void 0 : _a.type) {
            switch (error.error.type) {
                case 'VALIDATION_ERROR':
                    throw new n8n_workflow_1.NodeOperationError(node, `Validation Error: ${error.error.message}`);
                case 'MISSING_REQUIRED_FIELD_ERROR':
                    throw new n8n_workflow_1.NodeOperationError(node, `Missing Required Field: ${error.error.message}`);
                case 'RESOURCE_NOT_FOUND':
                    throw new n8n_workflow_1.NodeOperationError(node, `Resource Not Found: ${error.error.message}`);
                default:
                    throw new n8n_workflow_1.NodeOperationError(node, `Bling Error: ${error.error.message}`);
            }
        }
        throw new n8n_workflow_1.NodeOperationError(node, `Unexpected error: ${error.message || error}`);
    }
    static validateDateRange(startDate, endDate, node) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        if (end.getTime() - start.getTime() > oneYear) {
            throw new n8n_workflow_1.NodeOperationError(node, 'Date range cannot exceed 1 year due to Bling API limitations.');
        }
    }
    static validatePagination(page, limit, node) {
        if (page < 1) {
            throw new n8n_workflow_1.NodeOperationError(node, 'Page number must be 1 or greater.');
        }
        if (limit < 1 || limit > 100) {
            throw new n8n_workflow_1.NodeOperationError(node, 'Limit must be between 1 and 100.');
        }
    }
}
exports.BlingErrorHandler = BlingErrorHandler;
//# sourceMappingURL=errorHandler.js.map