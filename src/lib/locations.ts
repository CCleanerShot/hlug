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
			cons: ['Loud/Busy on Wednesdays'],
			pros: []
		},
		pictures: []
	},
	{
		address: '1519 Fulton St, Houston, TX 77009',
		coords: { lat: 29.774036, long: -95.356543 },
		name: 'Bad Astronaut Brewing Co.',
		overview: {
			cons: ['No A/C'],
			pros: ['Huge area']
		},
		pictures: []
	},
	{
		address: '1334 Brittmoore Rd, Houston, TX 77043',
		coords: { lat: 29.795050, long: -95.569832 },
		name: 'The Cannon West Houston',
		overview: {
			cons: ["In Katy"],
			pros: []
		},
		pictures: []
	}
];
