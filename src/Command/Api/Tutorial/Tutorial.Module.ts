import { Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import TutorialService from './Tutorial.Service';

export default class TutorialModule
{
    private readonly commandService: any;
    private readonly commandData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('tutorial')
            .setDescription('Paraffin Tutorials tutorial information!')
            .addStringOption((Options) => Options
                .setName('name')
                .setDescription('Tutorial Name')
                .setRequired(true)
            );

        this.commandService = new TutorialService();
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
