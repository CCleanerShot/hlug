import type { LayoutServerLoad } from "./$types"
import { utilityServer } from "$lib/server/utilityServer";
import { oauthClient } from "$lib/oauth/oauthClient";
import { sessionServer } from "$lib/server/sessionServer";

export const load: LayoutServerLoad = async ({cookies}) => {
    let loggedIn = false;
    let name = "";

    const execute = async () => {
        const accessToken = cookies.get("access_token");
        const refreshToken = cookies.get("refresh_token");
        const googleName = cookies.get("google_name");

        if(!accessToken || !refreshToken) {
            return;
        }

        const testUser = await utilityServer.getMeGoogle(accessToken)
        
        if(testUser) {
            loggedIn = true;
            name = testUser.name;
            return;
        }

        const res = await oauthClient.refreshAccessToken();

        if(!res.res) {
            return;
        }

        if(res.res.status >= 300 || res.res.status < 200) {
            return;
        }

        const {access_token, refresh_token} = res.credentials

        if(!access_token) {
            return;
        }
        
        if(refresh_token) {
            sessionServer.setRefreshToken(cookies, refresh_token);
        }

        const testUserRetry = await utilityServer.getMeGoogle(accessToken)
        
        if(testUserRetry) {
            loggedIn = true;
            name = testUserRetry.name;
            return;
        }
    }

    await execute()

    return {
        title: "Houston Linux Users Group | Guest List",
        description: "Where you can see the current list of members that like to attend.",
        loggedIn,
        name,
    }
}