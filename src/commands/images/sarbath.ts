import { Client, CommandInteraction } from 'discord.js';
import { getAttachment } from '../../command';

export default {
    name: 'sarbath',
    description: 'It\'s always winnable',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            files: [getAttachment('images/sarbath.jpg')],
        });
    },
};
