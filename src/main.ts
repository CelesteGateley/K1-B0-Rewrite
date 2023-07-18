import { Client } from "discord.js";
import "dotenv/config";

const client = new Client({
    intents: []
});

client.login(process.env.DISCORD_KEY).then(() => {});

console.log(client);