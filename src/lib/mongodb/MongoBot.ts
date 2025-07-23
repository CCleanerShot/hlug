import { Db, MongoClient } from "mongodb";
import { MONGODB_CONNECTION_QUERY, MONGODB_CONNECTION_URI, MONGODB_C_GOOGLE_USERS,MONGODB_D_AUTH } from "$env/static/private";
import type { GoogleUser } from "./collections/GoogleUser";
import { MongoCollection } from "./MongoCollections";

class MongoBot {
    client: MongoClient

    private MONGODB_D_AUTH: Db;

    MONGODB_C_GOOGLE_USERS: MongoCollection<GoogleUser>

    constructor() {
        this.client = new MongoClient(MONGODB_CONNECTION_URI + MONGODB_CONNECTION_QUERY);
        this.MONGODB_D_AUTH = this.client.db(MONGODB_D_AUTH);
        this.MONGODB_C_GOOGLE_USERS = new MongoCollection(this.MONGODB_D_AUTH.collection(MONGODB_C_GOOGLE_USERS));
    }
}

export const mongoBot = new MongoBot();