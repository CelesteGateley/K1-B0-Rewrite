import { Client, CommandInteraction } from 'discord.js';

export default {
    name: 'ping',
    description: 'Test the bots interaction',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            ephemeral: true,
            content: 'Pong!',
        });
    },
};
