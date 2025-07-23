import type { PageServerLoad } from './$types';
import { oauthClient } from '$lib/oauth/oauthClient';
import { oauthGetScopes } from '$lib/oauth/oauthScopes';

export const load: PageServerLoad<{ oauth_google: string }> = () => {
	const scope = oauthGetScopes();
	const url = oauthClient.generateAuthUrl({ scope, access_type: "offline", prompt: "consent" });
	
	return {
		description: "Houston Linux User Groups' Activity Home Page",
		oauth_google: url,
		title: 'HLUG'
	};
};
