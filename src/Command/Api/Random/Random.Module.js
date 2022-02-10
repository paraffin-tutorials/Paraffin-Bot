const { SlashCommandBuilder } = require('@discordjs/builders');

const RandomService = require('./Random.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('random')
            .setDescription('Random Tutorial or User!')
            .addStringOption((Option) => Option
                .setName('type')
                .setDescription('Get Random Tutorial or User Information!')
                .addChoice('User','user')
                .addChoice('Tutorial', 'tutorial')
                .setRequired(true)
            ),

        service: new RandomService(),

        async execute(Interaction)
        {
            const Type = await Interaction.options.getString('type');

            await this.service.send(Interaction, Type);
        }
    };
