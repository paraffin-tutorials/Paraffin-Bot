const { SlashCommandBuilder } = require('@discordjs/builders');

const UsersService = require('./Users.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('users')
            .setDescription('All Paraffin Tutorials users information!')
            .addStringOption((Option) => Option
                .setName('sort')
                .setDescription('Sort users!')
                .addChoice('Followers','followers')
                .addChoice('Following', 'following')
                .addChoice('Username', 'username')
                .addChoice('Create At', 'createAt')
                .setRequired(false)
            ),

        defer: true,

        service: new UsersService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
