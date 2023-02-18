"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeExpired = void 0;
const redis_1 = require("redis");
function SubscribeExpired(e, r) {
    const sub = new redis_1.createClient();
    const expired_subKey = `__keyevent@0__:expired`;
    sub.subscribe(expired_subKey, () => {
        console.log(`Subscribed ${expired_subKey}`);
        sub.on('message', async (chan, msg) => {
            console.log(`KEY EXPIRED: ${msg} (CHANNEL: ${chan})`);
            switch (msg.split(":")[0]) {
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
exports.SubscribeExpired = SubscribeExpired;
