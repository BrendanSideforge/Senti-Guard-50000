import { client } from "../index";

export async function deleteAntinukeLog(
    log_id: number
) {

    const { error } = await client.supabase
        .from('audit_logs')
        .delete()
        .eq('id', log_id);

    return error;

}

export async function getAntinukeLogs(
    supabase: any,
    guild_id: any,
    user_id: any,
    action: any
) {

    const antinukeLogs: any = await supabase.from("audit_logs").select().eq('guild_id', guild_id).eq('user_id', user_id).eq('action', action);

    return antinukeLogs;

}

export async function createAntinukeLog(
    redis: any,
    guild_id: any,
    user_id: any,
    reason: any,
    action_type: string,
    timestamp: Date,
    meta_data: any
) {

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
