"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (client, interaction) => {
    const interaction_name = interaction.data.name;
    client.slash_commands.forEach(async (slash_command) => {
        if (slash_command.attributes.name === interaction_name) {
            await slash_command.callback(client, interaction);
        }
    });
};
