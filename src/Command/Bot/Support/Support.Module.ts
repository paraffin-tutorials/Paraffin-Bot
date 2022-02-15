const { SlashCommandBuilder } from '@discordjs/builders');

const SupportService from './Support.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('support')
            .setDescription('Paraffin Tutorials Support discord server!'),

        service: new SupportService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
