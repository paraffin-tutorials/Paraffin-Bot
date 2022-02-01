const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Collection } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

const Logger = require('./Logger.Service');

module.exports = (Client) =>
{
    Client.CommandArray = [];
    Client.Commands = new Collection();

    const ClientId = process.env.BOT_ID;

    Client.HandleCommands = async (CommandFolders) =>
    {
        for (const Folder of CommandFolders)
        {
            const CommandFiles = fs
                .readdirSync(path.resolve('src', 'Command', Folder))
                .filter((File) => File.endsWith('.Module.js'));

            for (const File of CommandFiles)
            {
                const Command = require(`../Command/${Folder}/${File}`);

                await Client.Commands.set(Command.data.name, Command);

                Client.CommandArray.push(Command.data.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        try
        {
            Logger.info(`Started refreshing application (/) commands.`);

            await rest.put(Routes.applicationCommands(ClientId),
                {
                    body: Client.CommandArray,
                });

            Logger.info(`Successfully reloaded application (/) commands.`);
        }
        catch (error)
        {
            console.log(error);
        }
    };
};
