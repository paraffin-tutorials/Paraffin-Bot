const { SlashCommandBuilder } = require('@discordjs/builders');

const HelpService = require('./Help.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('Paraffin Tutorials Bot Help Menu!'),

        service: new HelpService(),

        async execute(Interaction)
        {
            await this.service.Send(Interaction);
        }
    }
