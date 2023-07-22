import { Client, CommandInteraction, SlashCommandNumberOption } from 'discord.js';
import { getAssetPath, OptionsContainer } from '../../command';
import * as fs from 'fs';
import { randint } from '../../functions';

export default {
    name: 'wild-magic',
    description: 'Get a random wild magic entry',
    options: [
        new SlashCommandNumberOption().setName('chance').setDescription('What is the chance of failure').setMaxValue(100),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const options = new OptionsContainer(interaction);

        if (options.getNumber('chance') ?? randint(0, 100) > 100) {
            return await interaction.followUp({
                content: 'Your magic succeeded!!',
            });
        }

        const keys: Map<string, string> = new Map(Object.entries(JSON.parse(fs.readFileSync(getAssetPath('wild-magic.json'), 'utf8'))));
        const effect = keys.get('' + Math.floor(Math.random() * keys.size));

        await interaction.followUp({
            content: '***Your wild magic has surged!!***\n**Effect:** ' + effect,
        });
    },
};
