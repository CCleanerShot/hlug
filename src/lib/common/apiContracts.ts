import type { Routes } from '$lib/common/routes';
import type { GoogleUserNoIdOrEmail } from '$lib/types';

type ApiContract = {
	method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PUT';
	response: any;
	route: Routes['API'][number];
	params?: any;
};

// NOTE: I've decided to extract the values outside first so that type-information is more easily readable
const GET_GUEST_LIST = {
	method: 'GET',
	response: { data: { guests: [] as GoogleUserNoIdOrEmail[]} } as const,
	route: '/api/guest-list',
	params: {} as const
} as const satisfies ApiContract;

/** Record of API Contracts that map to their cooresponding routes. For now, all routes use the body as params. The status codes represent the normal response. */
export const API_CONTRACTS = {
	'GET=>/api/guest-list': GET_GUEST_LIST,
} as const satisfies Record<string, ApiContract>;
