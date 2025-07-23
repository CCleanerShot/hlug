import { google } from 'googleapis';
import { OAUTH_GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_OAUTH_GOOGLE_CLIENT_ID, PUBLIC_OAUTH_GOOGLE_REDIRECT_URI } from '$env/static/public';

export const oauthClient = new google.auth.OAuth2({
	client_id: PUBLIC_OAUTH_GOOGLE_CLIENT_ID,
	clientSecret: OAUTH_GOOGLE_CLIENT_SECRET,
	redirectUri: PUBLIC_OAUTH_GOOGLE_REDIRECT_URI
});
