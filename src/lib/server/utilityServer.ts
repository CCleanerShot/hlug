import { LogLevel } from '$lib/enums';
import type { OAuthGoogleUserResponse } from '$lib/types';
import { error } from '@sveltejs/kit';

export const utilityServer = {
	errorInvalidCredentials: () => {
		return error(401, 'Invalid credentials.');
	},
	errorNotFound: () => {
		return error(404, 'Not found.');
	},
	getMeGoogle: async (
		access_token: string,
		_fetch?: typeof globalThis.fetch
	): Promise<OAuthGoogleUserResponse | undefined> => {
		let fetch = globalThis.fetch;
		
		if(_fetch) {
			fetch = _fetch;
		}

		const headers: HeadersInit = { Authorization: `Bearer ${access_token}` };
		const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', { headers });

		if (res.status >= 300 || res.status < 200) {
			return undefined;
		}

		const body = await res.json();
		return body;
	},
	logServer: (logLevel: LogLevel, ...data: any[]) => {
		let prefix;

		switch (logLevel) {
			case LogLevel.NONE:
				prefix = '>';
				break;
			case LogLevel.WARN:
				prefix = '?';
				break;
			case LogLevel.ERROR:
				prefix = '!';
				break;
		}

		console.log(`${prefix}:`, ...data);
	}
};
