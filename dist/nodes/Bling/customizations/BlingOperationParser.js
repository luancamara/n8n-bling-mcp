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
exports.BlingOperationParser = void 0;
const n8n_openapi_node_1 = require("@devlikeapro/n8n-openapi-node");
const lodash = __importStar(require("lodash"));
class BlingOperationParser extends n8n_openapi_node_1.DefaultOperationParser {
    constructor() {
        super(...arguments);
        this.OPERATION_TRANSLATIONS = {
            'get': 'Get',
            'post': 'Create',
            'put': 'Update',
            'patch': 'Update',
            'delete': 'Delete'
        };
    }
    name(operation, context) {
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
    value(operation, context) {
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
    action(operation, context) {
        return operation.summary || this.name(operation, context);
    }
    shouldSkip(operation, context) {
        var _a;
        if (operation.deprecated)
            return true;
        if ((_a = operation.tags) === null || _a === void 0 ? void 0 : _a.includes('Internal'))
            return true;
        return false;
    }
}
exports.BlingOperationParser = BlingOperationParser;
//# sourceMappingURL=BlingOperationParser.js.map