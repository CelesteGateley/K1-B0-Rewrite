import { Client } from 'discord.js';
import { getCommands } from '../command';
import { logger } from '../logger';

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(await getCommands());

        await client.user.setPresence({ activities: [{ name: 'New and Improved! Now with slash commands!' }], status: 'online' });

        logger.info(`Logged in as ${client.user.username}`);
    });
};
