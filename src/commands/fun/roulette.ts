import { Client, CommandInteraction, SlashCommandNumberOption } from 'discord.js';
import { Command, OptionsContainer } from '../../command';
import { randint, sleep } from '../../functions';


export const Roulette: Command = {
    name: 'roulette',
    description: 'Play russian roulette',
    options: [
        new SlashCommandNumberOption().setName('bullets').setDescription('How many bullets (up to 6)?').setMaxValue(6),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const options: OptionsContainer = new OptionsContainer(interaction);

        const bullets: number = options.getNumber('bullets') ?? 1;

        let message: string = 'You spin the cylinder of the revolver with ' + bullets + '' + (bullets === 1 ? ' bullet' : ' bullets') + ' in it...';

        await interaction.editReply(message);
        await sleep(1000);

        message += '\n...you place the muzzle against your head and pull the trigger...';
        await interaction.editReply(message);
        await sleep(1000);

        if (randint(1, 6) <= bullets) {
            message += '\n...your brain gets splattered all over the wall.';
        } else {
            message += '\n...you live to see another day.';
        }
        await interaction.editReply(message);
    },
};

