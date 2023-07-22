import { Client, CommandInteraction } from 'discord.js';

export default {
    name: 'flip',
    description: 'Flip a coin',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            content: (Math.random() > 0.5 ? 'Heads' : 'Tails'),
        });
    },
};
