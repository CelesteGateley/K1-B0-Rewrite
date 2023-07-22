import { Client } from 'discord.js';
import { getCommands } from '../command';
import { logger } from '../logger';

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(await getCommands());

        logger.info(`Logged in as ${client.user.username}`);
    });
};
