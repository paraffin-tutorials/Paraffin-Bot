import fs from 'fs';
import path from 'path';
import { Client, Intents } from 'discord.js';

import Logger from './Logger.Service';

export default class ClientService
{
    private readonly client: any;

    constructor()
    {
        this.client = new Client(
            {
                intents: [ Intents.FLAGS.GUILDS ],
                presence:
                    {
                        status: 'online',
                        activities:
                            [
                                {
                                    name: 'Paraffin-Tutorials',
                                    type: 'COMPETING'
                                }
                            ]
                    }
            });
    }

    async eventHandler()
    {
        const EventsFiles = fs.readdirSync(path.resolve('src', 'Event')).filter((File) => File.endsWith('.Module.js'));

        require('src/Service/Event.Service')(this.client);

        this.client.HandleEvents(EventsFiles);
    }

    async commandHandler()
    {
        const CommandsFolders = fs.readdirSync(path.resolve('src', 'Command'));

        require('src/Service/Command.Service')(this.client);

        this.client.HandleCommands(CommandsFolders);
    }

    async clientLogin()
    {
        await this.client.login(process.env.TOKEN);
    }

    async start()
    {
        try
        {
            await this.eventHandler();
            await this.commandHandler();
            await this.clientLogin();
        }
        catch (Error)
        {
            Logger.error(Error);
        }
    }
}
