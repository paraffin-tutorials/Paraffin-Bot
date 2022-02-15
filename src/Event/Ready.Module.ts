import Logger from '../Service/Logger.Service';
import { UpdateServersCount } from '../Service/Helper.Service';

export default class ReadyModule
{
    private readonly eventName: string;
    private readonly eventOnce: boolean;

    constructor()
    {
        this.eventName = 'ready';
        this.eventOnce = true;
    }

    name()
    {
        return this.eventName;
    }

    once()
    {
        return this.eventOnce;
    }

    async execute(Args: any, Client: any)
    {
        Client.user.setActivity('Paraffin-Tutorials', { type: 'COMPETING' });

        Logger.info(`Bot is Logged in as ${Client.user.tag}!`);

        UpdateServersCount(Client);
    }
};
