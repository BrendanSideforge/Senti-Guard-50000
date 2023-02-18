"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
function getEvents(client) {
    fs.readdir('./dist/events', (err, files) => {
        if (err)
            return console.error(err);
        files.forEach(async (file) => {
            if (!file.endsWith(".js"))
                return;
            const event = await (await Promise.resolve().then(() => tslib_1.__importStar(require(`../events/${file}`)))).default;
            const eventname = file.split(".")[0];
            // load the event here with the "on" method
            client.on(eventname, event.bind(null, client));
            console.log(`Loaded the event: ${eventname}`);
        });
    });
}
exports.getEvents = getEvents;
