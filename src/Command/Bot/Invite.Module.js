const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('invite')
            .setDescription('Invite the Bot!'),

        async execute(Interaction)
        {
            return Interaction.reply({ content: `hi!` });
        },
    };
