const { SlashCommandBuilder } = require('@discordjs/builders');

const SearchService = require('./Search.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('search')
            .setDescription('Search in all tutorials & users!')
            .addStringOption((Option) => Option
                .setName('type')
                .setDescription('Type of your search query!')
                .addChoice('User','user')
                .addChoice('Tutorial', 'tutorial')
                .setRequired(true)
            )
            .addStringOption((Options) => Options
                .setName('keyword')
                .setDescription('Keyword to find your query!')
                .setRequired(true)
            ),

        defer: true,

        service: new SearchService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
