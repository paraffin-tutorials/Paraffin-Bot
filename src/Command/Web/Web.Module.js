const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('website')
            .setDescription('Website Information & Status!'),

        async execute(interaction)
        {
            return interaction.reply({ content: `hi!` });
        },
    };
