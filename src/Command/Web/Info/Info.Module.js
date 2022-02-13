const { SlashCommandBuilder } = require('@discordjs/builders');

const InfoService = require('./Info.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('web-info')
            .setDescription('Paraffin Tutorials website Information & Status!'),

        defer: true,

        service: new InfoService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
