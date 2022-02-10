module.exports =
    {
        name: 'interactionCreate',

        async execute(Interaction, Client)
        {
            if(!Interaction.guild.available) return;

            if(Interaction.isCommand())
            {
                if(!Client.Commands.has(Interaction.commandName)) return;

                const Command = Client.Commands.get(Interaction.commandName);

                if (!Command) return;

                try
                {
                    await Command.execute(Interaction, Client);
                }
                catch (Error)
                {
                    console.error(Error);
                }
            }
        }
    };
