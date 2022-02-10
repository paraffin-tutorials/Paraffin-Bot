const Path = require('path');
const Moment = require('moment');
const DotEnv = require('dotenv');
const Fetch = require('node-fetch');

DotEnv.config({ path: Path.resolve('config', 'Config.env') });

const Logger = require('./Service/Logger.Service');
const ClientService = require('./Service/Client.Service');

const Client = new ClientService();

Logger.info('App is Running!');

Client.run().then(() => {});

// process.on('unhandledRejection', (Error) =>
// {
//     Fetch(process.env.ERROR_EVENT_WEBHOOK,
//         {
//             method: 'post',
//             headers:
//                 {
//                     'Content-Type': 'application/json'
//                 },
//             body: JSON.stringify(
//                 {
//                     embeds:
//                         [
//                             {
//                                 color: '16756775',
//                                 title: '⚠️ New Bot Error',
//                                 fields:
//                                     [
//                                         {
//                                             name: '📌 Type: ',
//                                             value: `\`\`\`${Error.name + ''.split('',250).join() || 'N/A'}\`\`\``
//                                         },
//                                         {
//                                             name: '📃 Reason: ',
//                                             value: `\`\`\`${Error.message + ''.split('',500).join() || 'N/A'}\`\`\``
//                                         }
//                                     ],
//                                 footer:
//                                     {
//                                         text: `${process.env.EMBED_ERROR_COMMANDS_FOOTER} • ${Moment().locale('en').format('MMMM Do YYYY, h:mm:ss a')}`,
//                                         icon_url: process.env.FAVICON
//                                     }
//                             }
//                         ]
//                 })
//         }
//     );
// });
