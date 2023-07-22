import { Client, CommandInteraction } from 'discord.js';
import { getAttachment } from '../../command';

export default {
    name: 'do-robots-have-dicks',
    description: 'Well? Do They?',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            files: [getAttachment('images/k1b0blush.jpg')],
        });
    },
};
