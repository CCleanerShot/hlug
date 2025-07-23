import type { GoogleUser } from "./mongodb/collections/GoogleUser";

export type Meetup = {
	address: string;
	coords: { lat: number; long: number };
	overview: { cons: string[]; pros: string[] };
	name: string;
    pictures: string[]
};

export type OAuthGoogleUserResponse = {
  id: string,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string;
}

export type GoogleUserNoIdOrEmail = Omit<GoogleUser, "id" | "email">