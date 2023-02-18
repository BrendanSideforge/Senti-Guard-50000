"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingHelper = void 0;
const index_1 = require("../index");
async function loggingHelper(guild_id, type, data) {
    // console.log(guild_id);
    const logging = await index_1.client.supabase.from("logging").select().eq("guild_id", guild_id.toString());
    // console.log(await client.supabase.from("logging").select());
    if (!logging || !logging.data) {
        return;
    }
    // console.log(logging);
    switch (type) {
        case "verification":
            const channelId = logging.data[0].verification;
            // console.log(data);
            await index_1.client.createMessage(channelId, {
                embeds: [
                    {
                        title: "Verification Feedback!",
                        color: data.similarUsers.length ? 0xDC143C : 0x00FF00,
                        description: [
                            `:shield: <@${data.userId}> has passed verification successfully!`,
                            "",
                            [data.similarUsers.map((user) => {
                                    return `<@${user.user_id}> **->** verified at \`${user.created_at}\``;
                                })].join('\n')
                        ].join("\n")
                    }
                ]
            });
            break;
        default:
            break;
    }
}
exports.loggingHelper = loggingHelper;
