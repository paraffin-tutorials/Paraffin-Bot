const { SlashCommandBuilder } = require('@discordjs/builders');

const TutorialsService = require('./Tutorials.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('tutorials')
            .setDescription('All Paraffin Tutorials tutorials information!')
            .addStringOption((Option) => Option
                .setName('sort')
                .setDescription('Sort tutorials!')
                .addChoice('Views', 'views')
                .addChoice('Likes','likes')
                .addChoice('Comments', 'comments')
                .addChoice('name', 'name')
                .addChoice('Create At', 'createAt')
                .setRequired(false)
            ),

        defer: true,

        service: new TutorialsService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
