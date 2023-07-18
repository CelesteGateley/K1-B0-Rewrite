import { CommandInteraction, Client } from 'discord.js';
import { Command } from '../command';

export const Ping: Command = {
	name: 'ping',
	description: 'Test the bots interaction',
	run: async (client: Client, interaction: CommandInteraction) => {
		const content = 'Pong!';

		await interaction.followUp({
			ephemeral: true,
			content,
		});
	},
};