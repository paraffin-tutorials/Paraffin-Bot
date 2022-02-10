const fs = require('fs');
const path = require('path');
const { Client, Intents } = require('discord.js');

const Logger = require('./Logger.Service');

class ClientService
{
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
                                    name: 'Paraffin Tutorials',
                                    type: 'COMPETING'
                                }
                            ]
                    }
            });
    }

    async eventHandler()
    {
        const EventsFiles = fs.readdirSync(path.resolve('src', 'Event')).filter((File) => File.endsWith('.Module.js'));

        require(`./Event.Service`)(this.client);

        this.client.HandleEvents(EventsFiles);
    }

    async commandHandler()
    {
        const CommandsFolders = fs.readdirSync(path.resolve('src', 'Command'));

        require(`./Command.Service`)(this.client);

        this.client.HandleCommands(CommandsFolders);
    }

    async clientLogin()
    {
        await this.client.login(process.env.TOKEN);
    }

    async run()
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

module.exports = ClientService;
