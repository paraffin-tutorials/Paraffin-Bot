const { SlashCommandBuilder } = require('@discordjs/builders');

const RandomService = require('./Random.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('random')
            .setDescription('Random tutorial & user information!')
            .addStringOption((Option) => Option
                .setName('type')
                .setDescription('Type of your random query!')
                .addChoice('User','user')
                .addChoice('Tutorial', 'tutorial')
                .setRequired(true)
            ),

        defer: true,

        service: new RandomService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
