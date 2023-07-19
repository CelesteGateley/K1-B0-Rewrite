import { Client, CommandInteraction } from 'discord.js';
import { Command } from '../../command';
import { getValorant } from '../../manager/valorant';

export const ValorantApiStatus: Command = {
    name: 'valorant-status',
    description: 'Check the status of the valorant client',
    run: async (client: Client, interaction: CommandInteraction) => {
        const valorant = getValorant();

        let message: string;

        if (valorant === null) {
            message = 'VALORANT is not available right now';
        } else {
            const platform = await valorant.StatusV1.getPlatformData();
            message = `VALORANT API is currently live and registered on the ${platform.name} datacenter`;
        }

        await interaction.followUp({
            content: message,
        });
    },
};
