"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAntinukeLog = exports.getAntinukeLogs = exports.deleteAntinukeLog = void 0;
const index_1 = require("../index");
async function deleteAntinukeLog(log_id) {
    const { error } = await index_1.client.supabase
        .from('audit_logs')
        .delete()
        .eq('id', log_id);
    return error;
}
exports.deleteAntinukeLog = deleteAntinukeLog;
async function getAntinukeLogs(supabase, guild_id, user_id, action) {
    const antinukeLogs = await supabase.from("audit_logs").select().eq('guild_id', guild_id).eq('user_id', user_id).eq('action', action);
    return antinukeLogs;
}
exports.getAntinukeLogs = getAntinukeLogs;
async function createAntinukeLog(redis, guild_id, user_id, reason, action_type, timestamp, meta_data) {
    // const { error, data } = await supabase.from('audit_logs').insert({
    //     guild_id: guild_id,
    //     user_id: user_id,
    //     reason: reason,
    //     action: action_type,
    //     created_at: timestamp,
    //     meta_data: meta_data
    // });
    // console.log(error);
    // if (!error) {
    // await redis.set(
    //     `audit_log:${data[0].id}:${guild_id}:${user_id}:${action_type}`,
    //     meta_data
    // );
    // await redis.expire(`audit_log:${data[0].id}:${guild_id}:${user_id}:${action_type}`, 10);
    // // }
    // return error;
}
exports.createAntinukeLog = createAntinukeLog;
