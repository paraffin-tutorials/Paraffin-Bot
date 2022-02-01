const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('random')
            .setDescription('Random Tutorial or User!'),

        async execute(Interaction)
        {
            return Interaction.reply({ content: `hi!` });
        },
    };
