"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkLoadSlashCommands = exports.getSlashCommands = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
function getSlashCommands(client) {
    fs.readdir('./dist/commands', async (err, files) => {
        if (err) {
            await client.RedisHelper.publishError(client, err);
            return;
        }
        files.forEach(async (file) => {
            if (!file.endsWith(".js"))
                return;
            const props = await Promise.resolve().then(() => tslib_1.__importStar(require(`../commands/${file}`)));
            client.slash_commands.push(props.command);
        });
    });
}
exports.getSlashCommands = getSlashCommands;
async function bulkLoadSlashCommands(client) {
    client.slash_commands.forEach(async (command) => {
        if (process.env.runtime === "production") {
            await client.createCommand(command.attributes);
        }
        else if (process.env.runtime === "dev") {
            await client.createGuildCommand(process.env.development_guild_id, command.attributes);
        }
    });
}
exports.bulkLoadSlashCommands = bulkLoadSlashCommands;
