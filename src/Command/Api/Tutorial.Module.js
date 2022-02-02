const { SlashCommandBuilder } = require('@discordjs/builders');

const TutorialService = require('./Tutorial.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('tutorial')
            .setDescription('Tutorial Information!')
            .addStringOption(options => options.setName('name').setDescription('Tutorial Name').setRequired(true)),

        service: new TutorialService(),

        async execute(Interaction)
        {
            const TutorialName = Interaction.options.getString('name');

            const Tutorial = this.service.Find(TutorialName);

            console.log(Tutorial);

            return Interaction.reply({ content: `hi!` });
        }
    };
