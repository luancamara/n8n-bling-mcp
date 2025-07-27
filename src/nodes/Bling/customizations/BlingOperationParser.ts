import { DefaultOperationParser, OperationContext } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
import * as lodash from 'lodash';

export class BlingOperationParser extends DefaultOperationParser {
    private readonly OPERATION_TRANSLATIONS: Record<string, string> = {
        'get': 'Get',
        'post': 'Create',
        'put': 'Update',
        'patch': 'Update',
        'delete': 'Delete'
    };

    name(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        if (operation.operationId) {
            return lodash.startCase(operation.operationId);
        }

        const method = context.method.toLowerCase();
        const pathString = String(context.path);
        const pathSegments = pathString.split('/').filter(segment => segment && !segment.startsWith('{'));
        const lastSegment = pathSegments[pathSegments.length - 1];

        const action = this.OPERATION_TRANSLATIONS[method] || lodash.startCase(method);

        if (pathString.includes('{id}') || pathString.includes('{')) {
            return method === 'get' ? `Get ${lodash.startCase(lastSegment)}` :
                method === 'put' || method === 'patch' ? `Update ${lodash.startCase(lastSegment)}` :
                    method === 'delete' ? `Delete ${lodash.startCase(lastSegment)}` : action;
        }

        return method === 'get' ? `List ${lodash.startCase(lastSegment)}` :
            method === 'post' ? `Create ${lodash.startCase(lastSegment)}` : action;
    }

    value(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        if (operation.operationId) {
            return lodash.camelCase(operation.operationId);
        }

        const method = context.method.toLowerCase();
        const pathString = String(context.path);
        const pathSegments = pathString.split('/').filter(segment => segment && !segment.startsWith('{'));
        const lastSegment = pathSegments[pathSegments.length - 1];

        if (pathString.includes('{')) {
            return `${method}${lodash.startCase(lastSegment).replace(/\s/g, '')}`;
        }

        return `${method}${lodash.startCase(lastSegment).replace(/\s/g, '')}`;
    }

    action(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
        return operation.summary || this.name(operation, context);
    }

    shouldSkip(operation: OpenAPIV3.OperationObject, context: OperationContext): boolean {
        // Skip deprecated operations
        if (operation.deprecated) return true;

        // Skip internal operations
        if (operation.tags?.includes('Internal')) return true;

        return false;
    }
}
