const { SlashCommandBuilder } = require('@discordjs/builders');

const UserService = require('./User.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('user')
            .setDescription('User Information!')
            .addStringOption(options => options.setName('name').setDescription('User Name').setRequired(true)),

        service: new UserService(),

        async execute(Interaction)
        {
            const UserName = Interaction.options.getString('name');

            const User = this.service.Find(UserName);

            console.log(User);

            return Interaction.reply({ content: `hi!` });
        }
    };
