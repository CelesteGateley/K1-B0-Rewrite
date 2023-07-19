import {
    CommandInteraction,
    ChatInputApplicationCommandData,
    Client,
    Channel,
    AttachmentBuilder,
} from 'discord.js';
import { Ping } from './commands/ping';
import { Winnable } from './commands/images/winnable';

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
        return this.interaction.options.getBoolean(option);
    }

    getString(option: string): boolean|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getString(option);
    }

    getNumber(option: string): number|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getNumber(option);
    }

    getChannel(option: string): Channel|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getChannel(option);
    }
}

export function getAttachment(filename: string): AttachmentBuilder {
    const root: string = process.cwd();
    return new AttachmentBuilder(root + '/assets/' + filename, { name: filename });
}

export const Commands: Command[] = [Ping, Winnable];
