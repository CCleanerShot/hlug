import { LogLevel } from '$lib/enums';
import type { Handle } from '@sveltejs/kit';
import { utilityServer } from '$lib/server/utilityServer';

export const handle: Handle = async ({ event, resolve }) => {
	const url = event.url.toString();
	utilityServer.logServer(LogLevel.NONE, `(${event.request.method}) ${url.toString()}`);

	// chrome dev tools
	if (url.toString().includes('.well-known/appspecific/com.chrome.devtools.json')) {
		return utilityServer.errorNotFound();
	}

	const response = await resolve(event, {});
	return response;
};
