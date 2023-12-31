import { Client } from 'discord.js';
import 'dotenv/config';
import ready from './listeners/ready';
import interactionCreate from './listeners/interactionCreate';

const client = new Client({
    intents: [],
});

client.login(process.env.DISCORD_KEY);

ready(client);

interactionCreate(client);
