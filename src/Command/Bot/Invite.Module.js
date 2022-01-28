const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('invite')
            .setDescription('Invite the Bot!'),

        async execute(interaction)
        {
            return interaction.reply({ content: `hi!` });
        },
    };
