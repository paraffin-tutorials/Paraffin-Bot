import { Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import HelpService from './Help.Service';

export default class HelpModule
{
    private readonly commandService: any;
    private readonly commandData: SlashCommandBuilder;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('help')
            .setDescription('Paraffin Tutorials Bot Help Menu!');

        this.commandService = new HelpService();
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
