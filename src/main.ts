import Path from 'path';
import Moment from 'moment';
import DotEnv from 'dotenv';
import Fetch from 'node-fetch';

DotEnv.config({ path: Path.resolve('config', 'Config.env') });

import Logger from './Service/Logger.Service';
import ClientService from './Service/Client.Service';

async function Bootstrap()
{
    const Client = new ClientService();

    await Client.start();
}

process.on('unhandledRejection', async (Error: any) =>
{
    Logger.error(Error);

    await Fetch(process.env.ERROR_EVENT_WEBHOOK,
        {
            method: 'post',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(
                {
                    embeds:
                        [
                            {
                                color: '16756775',
                                title: '⚠️ New Bot Error',
                                fields:
                                    [
                                        {
                                            name: '📌 Type: ',
                                            value: `\`\`\`${Error.name + ''.split('',250).join() || 'N/A'}\`\`\``
                                        },
                                        {
                                            name: '📃 Reason: ',
                                            value: `\`\`\`${Error.message + ''.split('',500).join() || 'N/A'}\`\`\``
                                        }
                                    ],
                                footer:
                                    {
                                        text: `${process.env.EMBED_ERROR_COMMANDS_FOOTER} • ${Moment().locale('en').format('MMMM Do YYYY, h:mm:ss a')}`,
                                        icon_url: process.env.FAVICON
                                    }
                            }
                        ]
                })
        }
    );
});

Bootstrap();
