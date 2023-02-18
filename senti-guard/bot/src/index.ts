
import * as dotenv from "dotenv";
dotenv.config();

import * as Eris from "eris";

import { getSlashCommands, bulkLoadSlashCommands } from "./helpers/commandHandler";
import { getEvents } from "./helpers/eventHandler";
import * as RedisHandler from "./helpers/redisHandler";

import * as utils from "util";
import * as Redis from "redis";
import * as Supabase from '@supabase/supabase-js';
import { handlePayload } from "./helpers/supabaseHandler";

export const client: Eris.Client | any = new Eris.Client(process.env.MAIN_TOKEN, {
    intents: [
        "guilds",
        "guildMessages",
        "all"
    ],
    messageLimit: 10000
});
client.startedAt = new Date();
client.slash_commands = [];
client.supabase = Supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
client.redis = new Redis.createClient();
client.redis.get = utils.promisify(client.redis.get);
client.redis.smembers = utils.promisify(client.redis.smembers);
client.redis.send_command(
    'config',
    ['set', 'notify-keyspace-events', 'Ex'],
    RedisHandler.SubscribeExpired
);
client.automod_guild_settings = {};

client.on("ready", async () => {

    const username: string = client.user.username;
    const id: string = client.user.id;

    getEvents(client);
    getSlashCommands(client);

    setTimeout(async () => {
        await bulkLoadSlashCommands(client)
    }, 1000);

});

const mySubscription = client.supabase
  .from('*')
  .on('INSERT', (payload) => {
    handlePayload(payload);
  })
  .subscribe();

client.redis.on("ready", async () => {
    console.log("REDIS LOADED");
});

client.redis.on("error", async (e) => {
    console.log(`REDIS ERROR: ${e}`);
});

client.connect();
