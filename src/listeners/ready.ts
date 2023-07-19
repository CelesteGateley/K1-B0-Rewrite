import { Client } from 'discord.js';
import { Commands } from '../command';
import { logger } from '../logger';

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);

        logger.info(`Logged in as ${client.user.username}`);
    });
};
