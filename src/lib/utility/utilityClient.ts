import { API_CONTRACTS } from '$lib/common/apiContracts';

type ClientResponse<T extends any> = Omit<Response, 'json'> & JSON<T>;
type JSON<T> = { /** same as json(), but exists for intellisense */ JSON: () => Promise<T> };

export const utilityClient = {
	/** Wrapper function for `fetch()`. Includes a wrapper `JSON()` method for intellisense. */
	fetch: async <T extends keyof typeof API_CONTRACTS, K extends (typeof API_CONTRACTS)[T]['response']>(
		request: T,
		params: (typeof API_CONTRACTS)[T]['params'],
		replaceFetch?: typeof globalThis.fetch
	): Promise<ClientResponse<K>> => {
		let fetch = globalThis.fetch;

		if (replaceFetch) {
			fetch = replaceFetch;
		}

		const { method, route } = API_CONTRACTS[request];
		const requestInit: RequestInit = { headers: { 'Content-Type': 'application/json' }, method };
		let finalRoute: string = route;
		let result: Response;

		if (method == 'GET') {
			const kvPairs = Object.entries(params);

			if (kvPairs.length > 0) {
				finalRoute += '?';
			}

			for (const [key, value] of kvPairs) {
				finalRoute += `${key}=${value}&`;
			}

			if (finalRoute[finalRoute.length - 1] === '&') {
				finalRoute = finalRoute.slice(0, finalRoute.length - 1);
			}
		} else {
			requestInit.body = JSON.stringify(params);
		}

		result = await fetch(finalRoute, requestInit);
		(result as any).JSON = result.json;
		return result as any as ClientResponse<K>;
	},
};
