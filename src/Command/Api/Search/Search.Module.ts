import { Interaction } from 'discord.js';
import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';

import SearchService from './Search.Service';

export default class SearchModule
{
    private readonly commandService: any;
    private readonly commandData: Omit<Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, "addSubcommand" | "addSubcommandGroup">;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('search')
            .setDescription('Search in all tutorials & users!')
            .addStringOption((Option: SlashCommandStringOption) => Option
                .setName('type')
                .setDescription('Type of your search query!')
                .addChoice('User','user')
                .addChoice('Tutorial', 'tutorial')
                .setRequired(true)
            )
            .addStringOption((Options: SlashCommandStringOption) => Options
                .setName('keyword')
                .setDescription('Keyword to find your query!')
                .setRequired(true)
            );

        this.commandService = new SearchService();
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
