import { Client, CommandInteraction, SlashCommandStringOption } from 'discord.js';
import { Command, OptionsContainer } from '../../command';

export const RollDice: Command = {
    name: 'roll',
    description: 'Roll any number of dice',
    options: [
        new SlashCommandStringOption().setRequired(true).setName('dice').setDescription('What dice do you want to roll?'),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const options: OptionsContainer = new OptionsContainer(interaction);
        let dice = options.getString('dice');
        if (dice === null) {
            dice = '1d20';
        }
        const argString = dice.replace(' ', '').replace('-', '+-');
        const values = argString.split('+');

        let valuesMessage = '**Result:** ';
        let total = 0;
        let error = false;

        for (let x = 0; x < values.length; x++) {
            const parsedVal = Number(values[x]);
            if (isNaN(parsedVal)) {
                let count: string|number = values[x].split('d')[0];
                let sides: string|number = values[x].split('d')[1];
                let negative: boolean = false;

                if (count === '') { count = '1'; }
                if (isNaN(Number(count)) || isNaN(Number(sides))) { error = true; break; }

                count = parseInt(count);
                sides = parseInt(sides);

                if (count < 0) {
                    negative = true;
                    count = Math.abs(count);
                }

                if (values[x].split('d')[0] === '') { valuesMessage += '1'; }

                valuesMessage += values[x].replace('-', '') + ' (';

                for (let counter = 0; counter < count; counter++) {

                    const roll = Math.floor(Math.random() * sides) + 1;

                    valuesMessage += roll;
                    if (counter < count - 1) { valuesMessage += ', '; }

                    if (negative) {
                        total -= roll;
                    } else {
                        total += roll;
                    }
                }

                valuesMessage += ')';
            } else {
                total += parsedVal;
                valuesMessage += values[x].replace('-', '');
            }

            if (x < values.length - 1) {
                if (values[x + 1].includes('-')) {
                    valuesMessage += ' - ';
                } else {
                    valuesMessage += ' + ';
                }
            }
        }

        if (error) {
            return interaction.followUp({
                content: '\nThere was an error processing your command with args "**' + dice + '**".' +
                    ' \nPlease check the values and try again! Please note that subtraction has not been implemented!',
            });
        }

        const msg = ':game_die:\n' + valuesMessage + '\n**Total:** ' + total;
        return interaction.followUp({ content: msg });
    },
};
