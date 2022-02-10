const { SlashCommandBuilder } = require('@discordjs/builders');

const UserService = require('./User.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('user')
            .setDescription('User Information!')
            .addStringOption((Options) => Options
                .setName('username')
                .setDescription('User Name')
                .setRequired(true)
            ),

        service: new UserService(),

        async execute(Interaction)
        {
            const Username = Interaction.options.getString('username');

            await this.service.send(Interaction, Username);
        }
    };
