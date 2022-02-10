const { SlashCommandBuilder } = require('@discordjs/builders');

const TutorialService = require('./Tutorial.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('tutorial')
            .setDescription('Tutorial Information!')
            .addStringOption((Options) => Options
                .setName('name')
                .setDescription('Tutorial Name')
                .setRequired(true)
            ),

        service: new TutorialService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
