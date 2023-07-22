import { Client, CommandInteraction, SlashCommandNumberOption } from 'discord.js';
import { getAssetPath, OptionsContainer } from '../../command';
import * as fs from 'fs';
import { randint } from '../../functions';

export default {
    name: 'rules-of-the-internet',
    description: 'Prints a random rule of the internet',
    options: [
        new SlashCommandNumberOption().setName('rule').setDescription('A specific rule?'),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const options: OptionsContainer = new OptionsContainer(interaction);

        await interaction.followUp({
            content: getRule(options.getNumber('rule')),
        });
    },
};

function getRules(): string[] {
    return fs.readFileSync(getAssetPath('rules-of-the-internet.txt'), 'utf8').split('\n');
}

function getRule(number: number | null): string {
    const rules = getRules();
    if (number === null) {
        number = randint(0, rules.length);
    } else {
        // -1 otherwise it will pick the rule after coz arrays start at 0
        number = number - 1;
    }
    return rules[number];
}
