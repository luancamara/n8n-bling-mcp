import { DefaultOperationParser, OperationContext } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
export declare class BlingOperationParser extends DefaultOperationParser {
    private readonly OPERATION_TRANSLATIONS;
    name(operation: OpenAPIV3.OperationObject, context: OperationContext): string;
    value(operation: OpenAPIV3.OperationObject, context: OperationContext): string;
    action(operation: OpenAPIV3.OperationObject, context: OperationContext): string;
    shouldSkip(operation: OpenAPIV3.OperationObject, context: OperationContext): boolean;
}
