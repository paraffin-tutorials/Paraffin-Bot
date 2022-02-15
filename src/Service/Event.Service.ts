export default function HandleEvents(Client: any)
{
    Client.HandleEvents = async (EventFiles: [string]) =>
    {
        for (const File of EventFiles)
        {
            const Event = require(`../Event/${File}`);

            if (Event.once)
            {
                await Client.once(Event.name, (...Args: any) => Event.execute(...Args, Client));
            }
            else
            {
                await Client.on(Event.name, (...Args: any) => Event.execute(...Args, Client));
            }
        }
    }
};
