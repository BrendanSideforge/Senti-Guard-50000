import * as fs from "fs";

export function getEvents(client) {

    fs.readdir('./dist/events', (err, files) => {

        if (err) return console.error(err);

        files.forEach(async (file) => {

            if (!file.endsWith(".js")) return;

            const event = await (await import(`../events/${file}`)).default;
            const eventname: string = file.split(".")[0];

            // load the event here with the "on" method
            client.on(eventname, event.bind(null, client));

            console.log(`Loaded the event: ${eventname}`);

        });

    });

}
