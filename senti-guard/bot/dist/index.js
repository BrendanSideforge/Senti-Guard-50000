"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
const Eris = tslib_1.__importStar(require("eris"));
const commandHandler_1 = require("./helpers/commandHandler");
const eventHandler_1 = require("./helpers/eventHandler");
const RedisHandler = tslib_1.__importStar(require("./helpers/redisHandler"));
const utils = tslib_1.__importStar(require("util"));
const Redis = tslib_1.__importStar(require("redis"));
const Supabase = tslib_1.__importStar(require("@supabase/supabase-js"));
const supabaseHandler_1 = require("./helpers/supabaseHandler");
exports.client = new Eris.Client(process.env.MAIN_TOKEN, {
    intents: [
        "guilds",
        "guildMessages",
        "all"
    ],
    messageLimit: 10000
});
exports.client.startedAt = new Date();
exports.client.slash_commands = [];
exports.client.supabase = Supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
exports.client.redis = new Redis.createClient();
exports.client.redis.get = utils.promisify(exports.client.redis.get);
exports.client.redis.smembers = utils.promisify(exports.client.redis.smembers);
exports.client.redis.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], RedisHandler.SubscribeExpired);
exports.client.automod_guild_settings = {};
exports.client.on("ready", async () => {
    const username = exports.client.user.username;
    const id = exports.client.user.id;
    (0, eventHandler_1.getEvents)(exports.client);
    (0, commandHandler_1.getSlashCommands)(exports.client);
    setTimeout(async () => {
        await (0, commandHandler_1.bulkLoadSlashCommands)(exports.client);
    }, 1000);
});
const mySubscription = exports.client.supabase
    .from('*')
    .on('INSERT', (payload) => {
    (0, supabaseHandler_1.handlePayload)(payload);
})
    .subscribe();
exports.client.redis.on("ready", async () => {
    console.log("REDIS LOADED");
});
exports.client.redis.on("error", async (e) => {
    console.log(`REDIS ERROR: ${e}`);
});
exports.client.connect();
