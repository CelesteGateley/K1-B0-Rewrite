import { Client, CommandInteraction } from 'discord.js';

export default {
    name: 'command',
    description: 'This is a template',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            content: 'Template command should not be executed!',
        });
    },
};
