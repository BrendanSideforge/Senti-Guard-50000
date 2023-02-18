
import * as Eris from "eris";
import { getSimilarUsers } from "../helpers/verificationCheckers";

export const command = {
    attributes: {
        name: "detect",
        description: "Alternate account detector.",
        options: [ //An array of Chat Input options https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
            {
                "name": "user", //The name of the option
                "description": "User to inspect.",
                "type": Eris.Constants.ApplicationCommandOptionTypes.USER, //This is the type of string, see the types here https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
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
        // console.log(interaction);
        // console.log(interaction.data.options);
        // console.log(interaction.user);
        const similarUsers: any = await getSimilarUsers(interaction.data.options[0].value);
        // console.log(similarUsers);
        if (!similarUsers) {
            await client.createMessage(
                interaction.channel.id,
                ":x: This user has not verified through the web verification before."
            );
            return;
        }

        if (!similarUsers.length) {
            await client.createMessage(
                interaction.channel.id,
                ":x: There are no matching credentials existing in different users that are similar to this one."
            );
            return;
        }

        let similarUsersFormat: Array<string> = [];

        for (let i = 0; i < similarUsers.length; i++) {

            const user: any = similarUsers[i];

            similarUsers.push(`<@${user.user_id}> **(${user.user_id})**`);

        }

        try {
            await client.createMessage(
                interaction.channel.id,
            {
                embeds: [ {
                    title: "Similar User Results",
                    color: 0xFFFF00,
                    description: similarUsersFormat.join("\n")
                } ]     
            });
        } catch(e) {
            console.log(e);
            // await interaction.createMessage(e);
        }

    }
}
