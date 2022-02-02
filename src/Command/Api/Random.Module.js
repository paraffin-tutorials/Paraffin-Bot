const { SlashCommandBuilder } = require('@discordjs/builders');

const RandomService = require('./Random.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('random')
            .setDescription('Random Tutorial or User!')
            .addStringOption(option => option
                .setName('choose')
                .setDescription('Get Random Tutorial or User Information!')
                .addChoice('User','user')
                .addChoice('Tutorial', 'tutorial')
                .setRequired(true)),

        service: new RandomService(),

        async execute(Interaction)
        {
            const Type = await Interaction.options.getString('type');
            const Data = this.service.Find(Type);

            console.log(Data)
        }
    };
