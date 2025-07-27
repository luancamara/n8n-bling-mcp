// src/nodes/Bling/customizations/BlingResourceParser.ts
import { DefaultResourceParser } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
import * as lodash from 'lodash';

export class BlingResourceParser extends DefaultResourceParser {
    private readonly RESOURCE_TRANSLATIONS: Record<string, string> = {
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

    private readonly RESOURCE_DESCRIPTIONS: Record<string, string> = {
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

    name(tag: OpenAPIV3.TagObject): string {
        const customName = this.RESOURCE_TRANSLATIONS[tag.name];
        if (customName) return customName;

        return lodash.startCase(tag.name.replace(/[-_]/g, ' '));
    }

    value(tag: Pick<OpenAPIV3.TagObject, "name">): string {
        return tag.name.replace(/[^a-zA-Z0-9_-]/g, '');
    }

    description(tag: OpenAPIV3.TagObject): string {
        const customDescription = this.RESOURCE_DESCRIPTIONS[tag.name];
        if (customDescription) return customDescription;

        return tag.description || `Manage ${this.name(tag).toLowerCase()}`;
    }
}
