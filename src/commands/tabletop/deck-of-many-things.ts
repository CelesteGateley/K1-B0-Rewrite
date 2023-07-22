import { Client, CommandInteraction, SlashCommandBooleanOption } from 'discord.js';
import { getAssetPath, OptionsContainer } from '../../command';
import fs from 'fs';

export default {
    name: 'deck-of-many-things',
    description: 'Pull from the deck of many things',
    options: [
        new SlashCommandBooleanOption().setName('all').setDescription('Show all cards?'),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const options = new OptionsContainer(interaction);
        const deck: Map<string, string> = new Map(Object.entries(JSON.parse(fs.readFileSync(getAssetPath('many-things.json'), 'utf8'))));

        if (options.getBoolean('all') ?? false) {
            let response = '';
            deck.forEach((card, name) => response += `**${name}**: ${card}\n`);
            return await interaction.followUp({
                content: response,
            });
        } else {
            const keys = Array.from(deck.keys());
            const card = keys[Math.floor(Math.random() * keys.length)];

            await interaction.followUp({
                content: `You drew **${card}**\n${deck.get(card)}`,
            });
        }
    },
};
