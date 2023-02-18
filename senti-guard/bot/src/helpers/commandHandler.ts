import * as Eris from "eris";
import * as fs from "fs";

export function getSlashCommands(
    client: Eris.Client | any
) {

    fs.readdir('./dist/commands', async (err, files) => {
        if (err) {
            await client.RedisHelper.publishError(
                client,
                err
            );
            return;
        }

        files.forEach(async (file) => {

            if (!file.endsWith(".js")) return;

            const props: any = await import(`../commands/${file}`);

            client.slash_commands.push(props.command);
        })

    });

}

export async function bulkLoadSlashCommands(
    client: Eris.Client | any
) {

    client.slash_commands.forEach(async (command: object | any) => {
        if (process.env.runtime === "production") {
            await client.createCommand(
                command.attributes
            );
        } else if (process.env.runtime === "dev") {
            await client.createGuildCommand(process.env.development_guild_id,
                command.attributes
            );
        }
    })

}
