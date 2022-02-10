const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('support')
            .setDescription('Support Server of the Bot!'),

        async execute(Interaction)
        {
            return Interaction.reply({ content: `hi!` });
        },
    };
