
export async function getUserGuilds(
    provider_token: string
) {

    const apiResponse: any = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${provider_token}`
        }
    });

    return await apiResponse.json();

}

export async function getGuildById(
    guild_id: string,
    guilds: object | any
) {

    let guild: object | any;

    for (let i = 0; i < guilds.length; i++) {

        const iterationGuild: object | any = guilds[i];

        if (iterationGuild.id === guild_id) {
            guild = iterationGuild;
        }

    }

    return guild;

}
