"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Eris = tslib_1.__importStar(require("eris"));
const antinukeHandler_1 = require("../helpers/antinukeHandler");
exports.default = async (client, channel) => {
    const auditLogEntry = await client.getGuildAuditLog(channel.guild.id, {
        actionType: Eris.Constants.AuditLogActions.CHANNEL_CREATE,
        limit: 1
    });
    await (0, antinukeHandler_1.createAntinukeLog)(client.redis, channel.guild.id, auditLogEntry.users[0].id, auditLogEntry.entries[0].reason, "channel_create", new Date(), {
        channel_id: channel.id
    });
    const antinukeLogs = (await (0, antinukeHandler_1.getAntinukeLogs)(client.supabase, channel.guild.id, auditLogEntry.users[0].id, "channel_create")).data;
    if (antinukeLogs.length >= 3) {
        console.log("Nuke Detected!");
    }
};
