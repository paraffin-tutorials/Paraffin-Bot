const fs = require('fs');
const path = require('path');
const { Client, Intents } = require('discord.js');

const client = new Client(
    {
        intents: [ Intents.FLAGS.GUILDS ],
        presence:
            {
                status: 'online',
                activity:
                    {
                        name: 'Paraffin Tutorials',
                        type: 'COMPETING'
                    }
            }
    });

const EventsFiles = fs.readdirSync(path.resolve('src', 'Event')).filter(file => file.endsWith('.Module.js'));
const CommandFolders = fs.readdirSync(path.resolve('src', 'Command'));

const RunClient = async () =>
{
    require(`./Event.Service`)(client);
    require(`./Command.Service`)(client);

    client.HandleEvents(EventsFiles, path.resolve('src', 'Event'));
    client.HandleCommands(CommandFolders, path.resolve('src', 'Command'));

    await client.login(process.env.TOKEN);
};

module.exports = RunClient;
