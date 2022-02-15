export default class InteractionCreateModule
{
    private readonly eventName: string;
    private readonly eventOnce: boolean;

    constructor()
    {
        this.eventName = 'interactionCreate';
        this.eventOnce = false;
    }

    name()
    {
        return this.eventName;
    }

    once()
    {
        return this.eventOnce;
    }

    async execute(Interaction: { guild: { available: any; }; isCommand: () => any; commandName: any; deferReply: () => any; }, Client: any)
    {
        if(!Interaction.guild.available) return;

        if(Interaction.isCommand())
        {
            if(!Client.Commands.has(Interaction.commandName)) return;

            const Command = Client.Commands.get(Interaction.commandName);

            if (!Command) return;

            try
            {
                if (Command.defer)
                {
                    await Interaction.deferReply();
                }
                await Command.execute(Interaction, Client);
            }
            catch (Error)
            {
                console.error(Error);
            }
        }
    }
};
