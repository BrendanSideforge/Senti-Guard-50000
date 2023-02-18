import { loggingHelper } from "./loggingHandler";
import { checkForSimilarUsers } from "./verificationCheckers";

export async function handlePayload(payload: any) {

    switch (payload.table) {

        case "verification_logs":

            const similarUsers: any = await checkForSimilarUsers(
                payload.new.user_id,
                payload.new.ip_address,
                payload.new.fingerprint,
                payload.new.cookie
            );

            await loggingHelper(
                payload.new.guild_id,
                "verification",
                {
                    userId: payload.new.user_id,
                    similarUsers: similarUsers
                }
            );
            break;
        default:
            console.log(`Change recieved: ${payload.table}`);
            break;
    }

}
