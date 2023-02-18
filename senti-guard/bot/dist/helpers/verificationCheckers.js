"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForSimilarUsers = exports.getSimilarUsers = void 0;
const index_1 = require("../index");
async function getSimilarUsers(user_id) {
    const userInformation = await index_1.client.supabase.from('verification_logs').select().in("user_id", [user_id.toString()]);
    if (!userInformation.data || !userInformation.data.length) {
        return null;
    }
    const userSelection = await index_1.client.supabase.from("verification_logs").select();
    let filteredUsers = [];
    let foundUsers = [];
    const lastIndex = userInformation.data.length - 1;
    // console.log(userSelection);
    for (let i = 0; i < userSelection.data.length; i++) {
        const user = userSelection.data[i];
        // console.log(user.user_id, user_id);
        if (user.user_id !== user_id && !(foundUsers.includes(user.user_id))) {
            console.log(userInformation.data);
            console.log(userInformation.data[lastIndex]);
            if (user.cookie == userInformation.data[lastIndex].cookie
                || user.fingerprint == userInformation.data[lastIndex].fingerprint
                || user.ip_address == userInformation.data[lastIndex].ip_address) {
                filteredUsers.push(user);
                foundUsers.push(user.user_id);
            }
        }
    }
    return filteredUsers;
}
exports.getSimilarUsers = getSimilarUsers;
async function checkForSimilarUsers(user_id, ip_address, fingerprint, cookie) {
    const similarUsers = await index_1.client.supabase.from("verification_logs").select();
    let filteredUsers = [];
    let foundUsers = [];
    for (let i = 0; i < similarUsers.data.length; i++) {
        const user = similarUsers.data[i];
        if (user.user_id !== user_id && !(foundUsers.includes(user.user_id))) {
            if (user.cookie == cookie
                || user.fingerprint == fingerprint
                || user.ip_address == ip_address) {
                filteredUsers.push(user);
                foundUsers.push(user.user_id);
            }
        }
    }
    return filteredUsers;
}
exports.checkForSimilarUsers = checkForSimilarUsers;
