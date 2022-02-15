import { Interaction } from 'discord.js';
import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';

import RandomService from './Random.Service';

export default class SearchModule
{
    private readonly commandService: RandomService;
    private readonly commandData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('random')
            .setDescription('Random tutorial & user information!')
            .addStringOption((Option: SlashCommandStringOption) => Option
                .setName('type')
                .setDescription('Type of your random query!')
                .addChoice('User','user')
                .addChoice('Tutorial', 'tutorial')
                .setRequired(true)
            );

        this.commandService = new RandomService();
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
