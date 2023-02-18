
import { supabase } from "../supabase";

export async function getVerificationSettings(guild_id: any) {

    const { data, error } = await supabase.from("verification").select().eq('guild_id', guild_id);

    return {data, error};

}

export async function finishVerification(
    guild_id: any,
    user_id: any,
    ip_address: any,
    cookie: any,
    fingerprint: any
) {

    const { error } = await supabase.from('verification_logs').insert({
        guild_id: guild_id,
        user_id: user_id,
        ip_address: ip_address,
        cookie: cookie,
        fingerprint: fingerprint
    });

    console.log(error);

    return error;

}
