import type { Meetup } from './types';

export const meetups: Meetup[] = [
	{
		address: '11630 Chimney Rock Rd, Houston, TX 77035',
		coords: { lat: 29.652634, long: -95.481378 },
		name: 'Dr.Shannon Walker Neighborhood Library',
		overview: {
			cons: ['Closes at 8pm'],
			pros: []
		},
		pictures: []
	},
	{
		address: '3402 Fondren Rd, Houston, TX 77063',
		coords: { lat: 29.727327, long: -95.520929 },
		name: 'Ranosh Cafe',
		overview: {
			cons: ['Contains a hookah (smoking) building nearby', 'Limited parking'],
			pros: []
		},
		pictures: []
	},
	{
		address: '4201 Main St, Houston, TX 77002',
		coords: { lat: 29.73444, long: -95.38208 },
		name: 'The Ion (Downstairs)',
		overview: {
			cons: ['Already kicked out once'],
			pros: ['Tacos']
		},
		pictures: []
	},
	{
		address: '100 N Jackson St, Houston, TX 77002',
		coords: { lat: 29.760920, long: -95.352501 },
		name: 'Frost Town Brewing',
		overview: {
			cons: ['No A/C'],
			pros: ['Huge area']
		},
		pictures: []
	}
];
