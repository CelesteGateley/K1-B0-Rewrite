import {
    CommandInteraction,
    ChatInputApplicationCommandData,
    Client,
    Channel,
    AttachmentBuilder, User,
} from 'discord.js';
import { resolve } from 'path';
import { readdir } from 'fs/promises';

const commands: Command[] = [];

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

    getString(option: string): string|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getString(option);
    }

    getNumber(option: string): number|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getNumber(option);
    }

    getUser(option: string): User|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getUser(option);
    }

    getChannel(option: string): Channel|null {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.interaction.options.getChannel(option);
    }
}

export function getAssetPath(filename: string): string {
    return process.cwd() + '/assets/' + filename;
}

export function getAttachment(filename: string): AttachmentBuilder {
    return new AttachmentBuilder(getAssetPath(filename), { name: filename });
}

export async function getCommands(): Promise<Command[]> {
    if (commands.length === 0) {
        await (async () => {
            for await (const f of getFiles(process.cwd() + '/src/commands/')) {
                if (f.match('[a-zA-Z0-9-]*\\.template\\.ts')) continue;
                import(f).then(
                    (module) => {
                        commands.push(module.default);
                    },
                );
            }
        })();
    }
    return commands;
}

async function* getFiles(directory: string): AsyncGenerator<string> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
        const res = resolve(directory, entry.name);
        if (entry.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}
