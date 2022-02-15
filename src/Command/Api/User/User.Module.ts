import { SlashCommandBuilder } from '@discordjs/builders';

import UserService from './User.Service';

export default class UserModule
{
    private readonly commandService: any;
    private readonly commandData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor()
    {
        this.commandData = new SlashCommandBuilder()
            .setName('user')
            .setDescription('Paraffin Tutorials user information!')
            .addStringOption((Options) => Options
                .setName('username')
                .setDescription('Username')
                .setRequired(true)
            );

        this.commandService = new UserService();
    }

    data()
    {
        return this.commandData;
    }

    service()
    {
        return this.commandService;
    }

    async execute(Interaction: { options: { getString: (arg0: string) => any; }; })
    {
        const Username = Interaction.options.getString('username');

        await this.commandService.send(Interaction, Username);
    }
}
