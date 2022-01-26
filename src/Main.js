const Path = require('path');
const Moment = require("moment");
const DotEnv = require('dotenv');
const Fetch = require("node-fetch");

DotEnv.config({ path: Path.resolve('config', 'Config.env') });

const token = process.env.TOKEN;
const webhook = process.env.WEBHOOK;

const Logger = require('./Service/Logger.Service');
const { Client } = require('./Service/Client.Service');

Logger.info('App is Running ...');

Client.login(token);

process.on('unhandledRejection', err =>
{
    Fetch(webhook,
        {
            method: "post",
            headers:
                {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(
                {
                    embeds:
                        [
                            {
                                color: '16756775',
                                title: "⚠️ New Bot Error",
                                fields:
                                    [
                                        {
                                            name: "📌 Type: ",
                                            value: `\`\`\`${err.name + "".split("", 150).join("") || "N/A"}\`\`\``
                                        },
                                        {
                                            name: "📃 Reason: ",
                                            value: `\`\`\`${err.message + "".split("", 150).join("") || "N/A"}\`\`\``
                                        }
                                    ],
                                footer:
                                    {
                                        text: `Paraffin error handler system • ${Moment().locale("en").format("MMMM Do YYYY, h:mm:ss a")}`,
                                        icon_url: "https://paraffin-tutorials.ir/img/favicon.png"
                                    }
                            }
                        ]
                })
        }
    );
});
