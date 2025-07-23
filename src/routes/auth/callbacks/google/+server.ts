import { mongoBot } from '$lib/mongodb/MongoBot';
import { oauthClient } from '$lib/oauth/oauthClient';
import { sessionServer } from '$lib/server/sessionServer';
import { utilityServer } from '$lib/server/utilityServer';
import { redirect, type RequestHandler } from '@sveltejs/kit';

const accessTokenExpires = new Response('access token expired or invalid');
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
	const json = await utilityServer.getMeGoogle(access_token!, fetch);

	
	if (!json) {
		return accessTokenExpires;
	}

	sessionServer.setAccessToken(cookies, access_token!, new Date(expiry_date!));
	sessionServer.setRefreshToken(cookies, refresh_token!);
	sessionServer.setName(cookies, json.name);
	const existingUser = await mongoBot.MONGODB_C_GOOGLE_USERS.FindOne({ id: json.id });

	if (!existingUser) {
		await mongoBot.MONGODB_C_GOOGLE_USERS.InsertOne(json);
	}

	return redirect(303, '/list');
};
