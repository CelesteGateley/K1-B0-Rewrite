import { Client, SlashCommandBooleanOption, CommandInteraction } from 'discord.js';
import { Command, OptionsContainer } from '../command';

export const Ping: Command = {
    name: 'ping',
    description: 'Test the bots interaction',
    options: [
        new SlashCommandBooleanOption().setName('type').setDescription('yes or no'),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const options = new OptionsContainer(interaction);
        const content = 'Pong!';

        console.log(options.getBoolean('type'));

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};
