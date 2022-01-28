const Logger = require('../Service/Logger.Service');
const { UpdateServersCount } = require('../Service/Helper.Service');

module.exports =
    {
        name: "ready",
        once: true,

        async execute(Args, Client)
        {
            Client.user.setActivity('Paraffin Tutorials', { type: 'COMPETING' });

            Logger.info(`Bot is Logged in as ${Client.user.tag}!`);

            UpdateServersCount(Client);
        }
    };
