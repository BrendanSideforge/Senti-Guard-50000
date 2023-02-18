
import { userInfo } from "os";
import { client } from "../index";

export async function loggingHelper(guild_id: any, type: string, data: any) {

    // console.log(guild_id);
    const logging: any = await client.supabase.from("logging").select().eq("guild_id", guild_id.toString());

    // console.log(await client.supabase.from("logging").select());

    if (!logging || !logging.data) {
        return;
    }

    // console.log(logging);

    switch(type) {
        
        case "verification":
            
            const channelId: any = logging.data[0].verification;
            
            // console.log(data);
            await client.createMessage(
                channelId,
                {
                    embeds: [
                        {
                            title: "Verification Feedback!",
                            color: data.similarUsers.length ? 0xDC143C : 0x00FF00,
                            description: [
                                `:shield: <@${data.userId}> has passed verification successfully!`,
                                "",
                                [data.similarUsers.map(
                                    (user: any) => {
                                        return `<@${user.user_id}> **->** verified at \`${user.created_at}\``
                                    }
                                )].join('\n')
                            ].join("\n")
                        }
                    ]
                }
            )

            break;

        default:
            break;

    }

}
