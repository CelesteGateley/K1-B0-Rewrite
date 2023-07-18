import { Client } from 'discord.js';
import 'dotenv/config';
import ready from './listeners/ready';

const client = new Client({
	intents: [],
});

client.login(process.env.DISCORD_KEY);

ready(client);