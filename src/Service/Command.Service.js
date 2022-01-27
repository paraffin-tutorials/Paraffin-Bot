const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const Logger = require('./Logger.Service');

module.exports = (Client) =>
{
    const ClientId = process.env.BOT_ID;

    Client.handleCommands = async (CommandFolders, Path) =>
    {
        Client.commandArray = [];

        for (const Folder of CommandFolders)
        {
            const CommandFiles = fs
                .readdirSync(path.resolve('src', 'Command', Folder))
                .filter((file) => file.endsWith('.js'));

            for (const File of CommandFiles)
            {
                const Command = require(`../Command/${Folder}/${File}`);

                await Client.commands.set(Command.data.name, Command);

                Client.commandArray.push(Command.data.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        await (async () =>
        {
            try
            {
                Logger.info(`Started refreshing application (/) commands.`);

                await rest.put(Routes.applicationCommands(ClientId),
                    {
                        body: Client.commandArray,
                    });

                Logger.info(`Successfully reloaded application (/) commands.`);
            }
            catch (error)
            {
                console.log(error);
            }
        })();
    };
};
