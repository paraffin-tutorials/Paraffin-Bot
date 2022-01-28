const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Stats of the Bot!'),

        async execute(interaction)
        {
            return interaction.reply({ content: `hi!` });
        },
    };
