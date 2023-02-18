
import * as Eris from "eris";

export default async (
    client: Eris.Client | any,
    interaction: Eris.Interaction | any
) => {

    const interaction_name: string = interaction.data.name;

    client.slash_commands.forEach(async (slash_command: object | any) => {

        if (
            slash_command.attributes.name === interaction_name
        ) {

            
            await slash_command.callback(
                client,
                interaction
            );

        }

    });

}
