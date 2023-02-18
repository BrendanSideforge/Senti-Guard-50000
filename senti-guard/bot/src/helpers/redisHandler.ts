
import { createClient } from "redis";
import { deleteAntinukeLog } from "./antinukeHandler";

export function SubscribeExpired(e, r) {

    const sub: createClient = new createClient();
    const expired_subKey: string = `__keyevent@0__:expired`;

    sub.subscribe(expired_subKey, () => {
        console.log(`Subscribed ${expired_subKey}`);

        sub.on('message', async (chan, msg) => {
            console.log(`KEY EXPIRED: ${msg} (CHANNEL: ${chan})`);

            switch(msg.split(":")[0]) {

                // case "audit_log":

                //     await deleteAntinukeLog(
                //         msg.split(":")[1]
                //     );

                //     break;
                default:
                    break;

            }
        });
    });

}

