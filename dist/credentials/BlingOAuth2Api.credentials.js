"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingOAuth2Api = void 0;
class BlingOAuth2Api {
    constructor() {
        this.name = 'blingOAuth2Api';
        this.extends = ['oAuth2Api'];
        this.displayName = 'Bling OAuth2 API';
        this.documentationUrl = 'https://developer.bling.com.br/aplicativos';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'authorizationCode',
            },
            {
                displayName: 'Authorization URL',
                name: 'authUrl',
                type: 'hidden',
                default: 'https://www.bling.com.br/Api/v3/oauth/authorize',
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'hidden',
                default: 'https://api.bling.com.br/Api/v3/oauth/token',
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: 'response_type=code',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'header',
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                default: '',
                required: true,
                description: 'Client ID obtido ao criar o aplicativo no Bling',
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Client Secret obtido ao criar o aplicativo no Bling',
            },
        ];
        this.test = {
            request: {
                baseURL: '={{$credentials.environment === "production" ? "https://api.bling.com.br" : "https://sandbox.api.bling.com.br"}}',
                url: '/Api/v3/empresas',
                method: 'GET',
            },
        };
    }
}
exports.BlingOAuth2Api = BlingOAuth2Api;
//# sourceMappingURL=BlingOAuth2Api.credentials.js.map