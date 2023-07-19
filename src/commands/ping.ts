import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../command';

export const Ping: Command = {
    name: 'ping',
    description: 'Test the bots interaction',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            ephemeral: true,
            content: 'Pong!',
        });
    },
};
