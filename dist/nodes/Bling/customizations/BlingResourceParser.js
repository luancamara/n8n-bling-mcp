"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingResourceParser = void 0;
const n8n_openapi_node_1 = require("@devlikeapro/n8n-openapi-node");
const lodash = __importStar(require("lodash"));
class BlingResourceParser extends n8n_openapi_node_1.DefaultResourceParser {
    constructor() {
        super(...arguments);
        this.RESOURCE_TRANSLATIONS = {
            'produtos': 'Products',
            'pedidos-vendas': 'Sales Orders',
            'pedidos-compras': 'Purchase Orders',
            'contatos': 'Contacts',
            'categorias-produtos': 'Product Categories',
            'estoques': 'Stock',
            'nfes': 'Invoices',
            'contas-receber': 'Accounts Receivable',
            'contas-pagar': 'Accounts Payable',
            'vendedores': 'Sales Representatives',
            'empresas': 'Companies'
        };
        this.RESOURCE_DESCRIPTIONS = {
            'produtos': 'Manage products, variations, and inventory items',
            'pedidos-vendas': 'Handle sales orders and customer purchases',
            'pedidos-compras': 'Manage purchase orders and supplier transactions',
            'contatos': 'Customer, supplier, and contact management',
            'categorias-produtos': 'Product categorization and organization',
            'estoques': 'Inventory tracking and stock management',
            'nfes': 'Electronic invoice generation and management',
            'contas-receber': 'Accounts receivable and customer payments',
            'contas-pagar': 'Accounts payable and supplier payments',
            'vendedores': 'Sales team and representative management',
            'empresas': 'Company and branch management'
        };
    }
    name(tag) {
        const customName = this.RESOURCE_TRANSLATIONS[tag.name];
        if (customName)
            return customName;
        return lodash.startCase(tag.name.replace(/[-_]/g, ' '));
    }
    value(tag) {
        return tag.name.replace(/[^a-zA-Z0-9_-]/g, '');
    }
    description(tag) {
        const customDescription = this.RESOURCE_DESCRIPTIONS[tag.name];
        if (customDescription)
            return customDescription;
        return tag.description || `Manage ${this.name(tag).toLowerCase()}`;
    }
}
exports.BlingResourceParser = BlingResourceParser;
//# sourceMappingURL=BlingResourceParser.js.map