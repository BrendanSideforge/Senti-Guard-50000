
import { supabase } from "../supabase";

export async function getModerationSettings(guild_id: any) {

    const { data, error } = await supabase.from("moderation").select().eq('guild_id', guild_id);

    return {data, error};

}
