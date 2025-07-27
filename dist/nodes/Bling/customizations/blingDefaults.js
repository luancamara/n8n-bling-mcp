"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blingDefaults = void 0;
exports.blingDefaults = [
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
//# sourceMappingURL=blingDefaults.js.map