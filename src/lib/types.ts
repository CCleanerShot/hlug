export type Meetup = {
	address: string;
	coords: { lat: number; long: number };
	overview: { cons: string[]; pros: string[] };
	name: string;
    pictures: string[]
};
