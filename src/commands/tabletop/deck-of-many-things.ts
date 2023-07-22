import { Client, CommandInteraction } from 'discord.js';
import { getAssetPath } from '../../command';
import fs from 'fs';

export default {
    name: 'deck-of-many-things',
    description: 'Pull from the deck of many things',
    run: async (client: Client, interaction: CommandInteraction) => {
        const deck: Map<string, string> = new Map(Object.entries(JSON.parse(fs.readFileSync(getAssetPath('many-things.json'), 'utf8'))));

        const keys = Array.from(deck.keys());
        const card = keys[Math.floor(Math.random() * keys.length)];

        await interaction.followUp({
            content: `You drew **${card}**\n${deck.get(card)}`,
        });
    },
};
