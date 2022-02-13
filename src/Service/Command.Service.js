const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Collection } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

const Logger = require('./Logger.Service');

module.exports = (Client) =>
{
    Client.HandleCommands = async (CommandsFolders) =>
    {
        Client.CommandArray = [];
        Client.Commands = new Collection();

        const ClientId = process.env.BOT_ID;

        for (const CommandsFolder of CommandsFolders)
        {
            const CommandFolders = fs.readdirSync(path.resolve('src', 'Command', CommandsFolder));

            for (const CommandFolder of CommandFolders)
            {
                const CommandFiles = fs
                    .readdirSync(path.resolve('src', 'Command', CommandsFolder, CommandFolder))
                    .filter((File) => File.endsWith('.Module.js'));

                for (const CommandFile of CommandFiles)
                {
                    const Command = require(path.resolve('src', 'Command', CommandsFolder, CommandFolder, CommandFile));

                    await Client.Commands.set(Command.data.name, Command);

                    await Client.CommandArray.push(Command.data.toJSON());
                }
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
        catch (Error)
        {
            Logger.error(Error);
        }
    };
};
