import { DefaultResourceParser } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
export declare class BlingResourceParser extends DefaultResourceParser {
    private readonly RESOURCE_TRANSLATIONS;
    private readonly RESOURCE_DESCRIPTIONS;
    name(tag: OpenAPIV3.TagObject): string;
    value(tag: Pick<OpenAPIV3.TagObject, "name">): string;
    description(tag: OpenAPIV3.TagObject): string;
}
