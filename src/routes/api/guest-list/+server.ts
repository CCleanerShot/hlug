import { mongoBot } from '$lib/mongodb/MongoBot';
import { API_CONTRACTS } from '$lib/common/apiContracts';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({}) => {
	const { response } = API_CONTRACTS['GET=>/api/guest-list'];
	const dbResponse = await mongoBot.MONGODB_C_GOOGLE_USERS.Find();

    for (const user of dbResponse) {
        const _e = user as any;
        delete _e.id;
        delete _e.email;
    }
    
	return json({ data: { guests: dbResponse } } as typeof response);
};
