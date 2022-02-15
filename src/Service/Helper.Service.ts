import Moment from 'moment';

import Logger from './Logger.Service';

export function UpdateServersCount(Client: any)
{
    const ThisChannel = Client.channels.cache.get(process.env.SERVER_COUNTER_CHANNEL_ID);
    const ServersCount = Client.guilds.cache.size;

    ThisChannel.setName(`・servers : ${ServersCount}`);

    Logger.info(`Update Servers Count in Channel!`);
}

export function FormatDate(Date: Date)
{
    return Moment(Date).format('D MMM YYYY');
}
