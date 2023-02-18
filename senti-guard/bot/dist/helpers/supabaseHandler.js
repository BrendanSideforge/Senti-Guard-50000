"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePayload = void 0;
const loggingHandler_1 = require("./loggingHandler");
const verificationCheckers_1 = require("./verificationCheckers");
async function handlePayload(payload) {
    switch (payload.table) {
        case "verification_logs":
            const similarUsers = await (0, verificationCheckers_1.checkForSimilarUsers)(payload.new.user_id, payload.new.ip_address, payload.new.fingerprint, payload.new.cookie);
            await (0, loggingHandler_1.loggingHelper)(payload.new.guild_id, "verification", {
                userId: payload.new.user_id,
                similarUsers: similarUsers
            });
            break;
        default:
            console.log(`Change recieved: ${payload.table}`);
            break;
    }
}
exports.handlePayload = handlePayload;
