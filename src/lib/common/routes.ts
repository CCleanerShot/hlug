export const ROUTES = {
	API: ['/api/guest-list'] as const,
	PAGES: ['/list', '/meetups'] as const
} as const;

export type Routes = typeof ROUTES;
