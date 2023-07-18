import { CommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';
import { Ping } from './commands/ping';

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}

export const Commands: Command[] = [Ping];