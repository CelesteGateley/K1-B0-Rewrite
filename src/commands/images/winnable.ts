import { Client, CommandInteraction } from 'discord.js';
import { Command, getAttachment } from '../../command';

export const Winnable: Command = {
    name: 'winnable',
    description: 'It\'s always winnable',
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            content: '<https://youtu.be/eXyfk6QUzp8?t=473>',
            files: [getAttachment('images/winnable.jpg')],
        });
    },
};
