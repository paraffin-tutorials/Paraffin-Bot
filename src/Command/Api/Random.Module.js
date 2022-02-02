const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('random')
            .setDescription('Random Tutorial or User!')
            .addStringOption(option => option
                .setName('choose')
                .setDescription('bakhsh morede nazar ra entekhab konid')
                .addChoice('User','user')
                .addChoice('Tutorials', 'toturial')
                .setRequired(true)),

        async execute(Interaction)
        {
            const choose = await interaction.options.getString('choose'); 
            if(choose === "user")
            {

            }

            if(choose === "toturial")
            {

            }
            
        },
    };
