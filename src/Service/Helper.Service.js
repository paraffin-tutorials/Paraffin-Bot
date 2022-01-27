const Logger = require('./Logger.Service');

exports.UpdateServersCount = (Client) =>
{
    const ThisChannel = Client.channels.cache.get(process.env.SERVER_COUNTER_CHANNEL_ID);
    const ServersCount = Client.guilds.cache.size;

    ThisChannel.setName(`・servers : ${ServersCount}`);

    Logger.info(`Update Servers Count in Channel!`);
}
