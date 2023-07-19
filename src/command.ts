import { CommandInteraction, ChatInputApplicationCommandData, Client, Channel } from 'discord.js';
import { Ping } from './commands/ping';

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}

// Typescript is kinda goofy about how it wants to work with CommandInteraction options, so class time
export class OptionsContainer {
    private interaction: CommandInteraction;

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
    }

    getBoolean(option: string): boolean|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return interaction.options.getBoolean(option);
    }

    getString(option: string): boolean|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return interaction.options.getString(option);
    }

    getNumber(option: string): number|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return interaction.options.getNumber(option);
    }

    getChannel(option: string): Channel|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return interaction.options.getChannel(option);
    }
}

export const Commands: Command[] = [Ping];