const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('website')
            .setDescription('Website Information & Status!'),

        async execute(Interaction)
        {
            return Interaction.reply({ content: `hi!` });
        },
    };
