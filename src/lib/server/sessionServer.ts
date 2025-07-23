import { type Cookies, type RequestEvent } from '@sveltejs/kit';

export const sessionServer = {
	setAccessToken: (cookies: Cookies, access_token: string, expiry_date: Date) => {
		cookies.set('access_token', access_token!, {
			expires: new Date(expiry_date!),
			httpOnly: true,
			path: '/',
			sameSite: 'lax'
		});
	},
	setRefreshToken: (cookies: Cookies, refresh_token: string) => {
		cookies.set('refresh_token', refresh_token!, {
		httpOnly: true,
		path: '/',
		sameSite: 'lax'
	});
},
	setName: (cookies: Cookies, name: string) => {
		cookies.set("google_name", name, {
			httpOnly: true,
			path: "/",
			sameSite: "lax"
		})
	}
};
