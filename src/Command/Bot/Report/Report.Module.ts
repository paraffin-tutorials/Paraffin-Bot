const { SlashCommandBuilder } from '@discordjs/builders');

const ReportService from './Report.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('report')
            .setDescription('Report your Idea or Bug!')
            .addStringOption((Option) => Option
                .setName('type')
                .setDescription('Choose your report type!')
                .addChoice('Bug','bug')
                .addChoice('Idea', 'idea')
                .setRequired(true)
            )
            .addStringOption((Options) => Options
                .setName('content')
                .setDescription('Content of your report!')
                .setRequired(true)
            ),

        service: new ReportService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
