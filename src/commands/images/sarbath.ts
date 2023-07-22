import { Client, CommandInteraction } from 'discord.js';
import { getAttachment } from '../../command';

export default {
    name: 'sarbath',
    description: 'For when it\'s going to be a long one',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            files: [getAttachment('images/sarbath.jpg')],
        });
    },
};
