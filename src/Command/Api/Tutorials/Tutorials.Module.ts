import { Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import TutorialsService from './Tutorials.Service';

export default class TutorialsModule
{
    private readonly commandService: any;
    private readonly commandData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('tutorials')
            .setDescription('All Paraffin Tutorials tutorials information!')
            .addStringOption((Option) => Option
                .setName('sort')
                .setDescription('Sort tutorials!')
                .addChoice('Views', 'views')
                .addChoice('Likes','likes')
                .addChoice('Comments', 'comments')
                .addChoice('name', 'name')
                .addChoice('Create At', 'createAt')
                .setRequired(false)
            );

        this.commandService = new TutorialsService();
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
