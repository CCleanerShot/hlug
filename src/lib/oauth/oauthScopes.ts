export function oauthGetScope (scope: typeof oauthScopes[number]) {
    return oauthBaseURL + scope;
}

export function oauthGetScopes() {
    return oauthScopes.map(e => oauthBaseURL + e);
}

export const oauthBaseURL = 'https://www.googleapis.com/auth/';
export const oauthScopes = ['userinfo.email', "userinfo.profile"] as const;