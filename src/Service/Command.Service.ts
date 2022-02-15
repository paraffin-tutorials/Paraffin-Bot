import fs from 'fs';
import path from 'path';
import { REST } from '@discordjs/rest';
import { Collection } from 'discord.js';
import { Routes } from 'discord-api-types/v9';

import Logger from './Logger.Service';

export default function HandleCommands(Client: any)
{
    Client.HandleCommands = async (CommandsFolders: [string]) =>
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

            // @ts-ignore
            await rest.put(Routes.applicationCommands(ClientId),
                {
                    body: Client.CommandArray
                });

            Logger.info(`Successfully reloaded application (/) commands.`);
        }
        catch (Error)
        {
            Logger.error(Error);
        }
    }
};
