const { SlashCommandBuilder } = require('@discordjs/builders');

const PingService = require('./Ping.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Paraffin Tutorials discord bot & discord websocket ping!'),

        service: new PingService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
