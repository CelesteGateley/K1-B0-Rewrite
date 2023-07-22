import { Client, CommandInteraction, GuildMember, PresenceStatus, SlashCommandUserOption, User } from 'discord.js';
import { getAttachment, OptionsContainer } from '../../command';
import { randint } from '../../functions';


export default {
    name: 'shoot',
    description: 'Shoot a particular target',
    options: [
        new SlashCommandUserOption().setName('user').setDescription('Who do you want to shoot?'),
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const image_dodge: string = `images/dodge/${randint(1, 12)}.gif`;
        const image_shot: string = `images/shot/${randint(1, 10)}.gif`;
        const image_suicide: string = `images/suicide/${randint(1, 6)}.gif`;
        const user: User | null = (new OptionsContainer(interaction)).getUser('user');

        // Suicide
        if (user === null || interaction.user.id === user.id) {
            return interaction.followUp({
                content: `${interaction.user} committed suicide!`,
                files: [getAttachment(image_suicide)],
            });
        }

        const guildMember: GuildMember | null = await interaction.guild?.members.fetch(user) ?? null;
        const status: PresenceStatus | null = guildMember?.presence?.status ?? null;

        // Random Dodge (unavailable if offline, idle or unknown
        if (randint(1, 20) === 1 && !(status === 'offline' || status === 'idle' || status === null)) {
            return interaction.followUp({
                content: `You attempted to shoot ${user}, but they dodged your bullet! Better luck next time, ${interaction.user}`,
                files: [getAttachment(image_dodge)],
            });
        }

        // Shoot them
        return interaction.followUp({
            content: `${user} was shot dead by ${interaction.user}!`,
            files: [getAttachment(image_shot)],
        });
    },
};

