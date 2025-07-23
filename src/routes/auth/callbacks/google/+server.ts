import type { RequestHandler } from '@sveltejs/kit';
import { oauthClient } from '$lib/oauth/oauthClient';
import { oauthBaseURL } from '$lib/oauth/oauthScopes';

const tokenMissing = new Response('token missing');
const invalidCode = new Response('invalid code');

export const GET: RequestHandler = async ({ cookies, fetch, url }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		// TODO: log that the token is missing
		return tokenMissing;
	}

	const { res, tokens } = await oauthClient.getToken(code);

	if (!res) {
		return invalidCode;
	}

	if (res.status >= 300 || res.status < 200) {
		return invalidCode;
	}

	const { access_token, expiry_date, id_token, refresh_token, scope, token_type } = tokens;
	oauthClient.setCredentials(tokens);

	cookies.set('access_token', access_token!, {
		expires: new Date(expiry_date!),
		httpOnly: true,
		path: '/',
		sameSite: 'lax'
	});

	cookies.set('refresh_token', refresh_token!, {
		httpOnly: true,
		path: '/',
		sameSite: 'strict'
	});

	const headers: HeadersInit = { Authorization: `Bearer ${access_token}` };
	const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", { headers });
	const json = await response.json();
	return new Response('asd');
};
