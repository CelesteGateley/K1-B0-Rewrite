import { CommandInteraction, Client, Interaction } from 'discord.js';
import { Commands } from '../command';
import { logger } from '../logger';

export default (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({ content: 'An error has occurred' });
        return;
    }

    await interaction.deferReply();
    try {
        await slashCommand.run(client, interaction);
    } catch (e) {
        logger.error(e as Error);
        await interaction.followUp('Sorry, something went wrong whilst running this command!');
    }
};
