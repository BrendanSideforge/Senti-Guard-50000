"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const tslib_1 = require("tslib");
const Eris = tslib_1.__importStar(require("eris"));
const verificationCheckers_1 = require("../helpers/verificationCheckers");
exports.command = {
    attributes: {
        name: "detect",
        description: "Alternate account detector.",
        options: [
            {
                "name": "user",
                "description": "User to inspect.",
                "type": Eris.Constants.ApplicationCommandOptionTypes.USER,
                "required": true
            },
            // {
            //     "name": "only_smol",
            //     "description": "Whether to show only baby animals",
            //     "type": Eris.Constants.ApplicationCommandOptionTypes.BOOLEAN,
            //     "required": false
            // }
        ],
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    callback: async (client, interaction) => {
        console.log(interaction);
        // console.log(interaction.data.options);
        // console.log(interaction.user);
        const similarUsers = await (0, verificationCheckers_1.getSimilarUsers)(interaction.data.options[0].value);
        // console.log(similarUsers);
        if (!similarUsers) {
            await client.createMessage(interaction.channel.id, ":x: This user has not verified through the web verification before.");
            return;
        }
        if (!similarUsers.length) {
            await client.createMessage(interaction.channel.id, ":x: There are no matching credentials existing in different users that are similar to this one.");
            return;
        }
        let similarUsersFormat = [];
        for (let i = 0; i < similarUsers.length; i++) {
            const user = similarUsers[i];
            similarUsers.push(`<@${user.user_id}> **(${user.user_id})**`);
        }
        try {
            await client.createMessage(interaction.channel.id, {
                embeds: [{
                        title: "Similar User Results",
                        color: 0xFFFF00,
                        description: similarUsersFormat.join("\n")
                    }]
            });
        }
        catch (e) {
            console.log(e);
            // await interaction.createMessage(e);
        }
    }
};
