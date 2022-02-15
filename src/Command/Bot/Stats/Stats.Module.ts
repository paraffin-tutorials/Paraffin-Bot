const { SlashCommandBuilder } from '@discordjs/builders');

const StatsService from './Stats.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('bot-stats')
            .setDescription('Paraffin Tutorials discord-not Information & Status!'),

        service: new StatsService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
