
import * as Eris from "eris";
import { createAntinukeLog, getAntinukeLogs } from "../helpers/antinukeHandler";

export default async (
    client: Eris.Client | any,
    channel: Eris.TextChannel | any
) => {

    const auditLogEntry: any = await client.getGuildAuditLog(
        channel.guild.id,
        {
            actionType: Eris.Constants.AuditLogActions.CHANNEL_CREATE,
            limit: 1
        }
    );

    await createAntinukeLog(
        client.redis,
        channel.guild.id,
        auditLogEntry.users[0].id,
        auditLogEntry.entries[0].reason,
        "channel_create",
        new Date(),
        {
            channel_id: channel.id
        }
    );
    
    const antinukeLogs: any = (await getAntinukeLogs(
        client.supabase,
        channel.guild.id,
        auditLogEntry.users[0].id,
        "channel_create"
    )).data;

    if (antinukeLogs.length >= 3) {

        console.log("Nuke Detected!");

    }

}
