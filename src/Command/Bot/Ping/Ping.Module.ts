const { SlashCommandBuilder } from '@discordjs/builders');

const PingService from './Ping.Service');

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
