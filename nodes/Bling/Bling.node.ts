// src/nodes/Bling/Bling.node.ts
import {
    INodeType,
    INodeTypeDescription,
    NodeConnectionType,
} from 'n8n-workflow';

import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import * as blingOpenApi from './bling-openapi.json';
import { BlingResourceParser } from './customizations/BlingResourceParser';
import { BlingOperationParser } from './customizations/BlingOperationParser';
import { blingDefaults } from './customizations/blingDefaults';

// Build properties from OpenAPI specification
const config: N8NPropertiesBuilderConfig = {
    resource: new BlingResourceParser(),
    operation: new BlingOperationParser(),
};

const parser = new N8NPropertiesBuilder(blingOpenApi, config);
const properties = parser.build(blingDefaults);

export class Bling implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Bling ERP',
        name: 'bling',
        icon: 'file:bling.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with Bling ERP API v3 for managing products, orders, contacts, and more',
        defaults: {
            name: 'Bling ERP',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'blingOAuth2Api',
                required: true,
            },
        ],
        requestDefaults: {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            baseURL: '={{$credentials.environment === "production" ? "https://api.bling.com.br" : "https://sandbox.api.bling.com.br"}}/Api/v3',
        },
        properties,
    };
}
