// src/nodes/Bling/customizations/blingDefaults.ts
import { Override } from '@devlikeapro/n8n-openapi-node';

export const blingDefaults: Override[] = [
    // Common ID field patterns
    {
        find: {
            name: 'id',
            type: 'string',
        },
        replace: {
            default: '={{ $json.id }}',
            description: 'ID from previous node output',
        },
    },

    // Date fields with current date defaults
    {
        find: {
            name: 'data',
            type: 'string',
            format: 'date',
        },
        replace: {
            default: '={{ $now.format("yyyy-MM-dd") }}',
            description: 'Date in YYYY-MM-DD format',
        },
    },

    // Common pagination parameters
    {
        find: {
            name: 'limite',
            type: 'integer',
        },
        replace: {
            default: 100,
            description: 'Maximum number of items to return (1-100)',
        },
    },

    {
        find: {
            name: 'pagina',
            type: 'integer',
        },
        replace: {
            default: 1,
            description: 'Page number for pagination',
        },
    },

    // Product-specific defaults
    {
        find: {
            name: 'situacao',
            type: 'string',
        },
        replace: {
            default: 'A',
            description: 'Status: A=Active, I=Inactive',
            options: [
                { name: 'Active', value: 'A' },
                { name: 'Inactive', value: 'I' },
            ],
        },
    },

    // Contact type defaults
    {
        find: {
            name: 'tipo',
            type: 'string',
        },
        replace: {
            options: [
                { name: 'Customer', value: 'cliente' },
                { name: 'Supplier', value: 'fornecedor' },
                { name: 'Both', value: 'ambos' },
            ],
            default: 'cliente',
        },
    },
];
