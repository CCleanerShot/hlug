//@ts-nocheck

import { PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY } from "$env/static/public";

export const initGoogle = async () => {
	// Creates the global `google` variable
	((g) => {
		var h,
			a,
			k,
			p = 'The Google Maps JavaScript API',
			c = 'google',
			l = 'importLibrary',
			q = '__ib__',
			m = document,
			b = window;
		b = b[c] || (b[c] = {});
		var d = b.maps || (b.maps = {}),
			r = new Set(),
			e = new URLSearchParams(),
			u = () =>
				h ||
				(h = new Promise(async (f, n) => {
					await (a = m.createElement('script'));
					e.set('libraries', [...r] + '');
					for (k in g)
						e.set(
							k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
							g[k]
						);
					e.set('callback', c + '.maps.' + q);
					a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
					d[q] = f;
					a.onerror = () => (h = n(Error(p + ' could not load.')));
					a.nonce = m.querySelector('script[nonce]')?.nonce || '';
					m.head.append(a);
				}));
		d[l]
			? console.warn(p + ' only loads once. Ignoring:', g)
			: (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
	})({
		key: PUBLIC_GOOGLE_MAPS_PLATFORM_API_KEY,
		v: 'weekly'
		// Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
		// Add other bootstrap parameters as needed, using camel case.
	});

    
} 