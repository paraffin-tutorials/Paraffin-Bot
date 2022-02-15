const { SlashCommandBuilder } from '@discordjs/builders');

const InviteService from './Invite.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('invite')
            .setDescription('Invite the Bot!'),

        service: new InviteService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
