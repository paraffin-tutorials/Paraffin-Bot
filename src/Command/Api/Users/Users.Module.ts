import { Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import UsersService from './Users.Service';

export default class UsersModule
{
    private commandDefer: boolean;
    private readonly commandService: any;
    private readonly commandData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('users')
            .setDescription('All Paraffin Tutorials users information!')
            .addStringOption((Option) => Option
                .setName('sort')
                .setDescription('Sort users!')
                .addChoice('Followers','followers')
                .addChoice('Following', 'following')
                .addChoice('Username', 'username')
                .addChoice('Create At', 'createAt')
                .setRequired(false)
            );

        this.commandDefer = true;

        this.commandService = new UsersService();
    }

    data()
    {
        return this.commandData;
    }

    service()
    {
        return this.commandService;
    }

    async execute(Interaction: Interaction)
    {
        await this.commandService.send(Interaction);
    }
}
