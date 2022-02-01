module.exports = (Client) =>
{
    Client.HandleEvents = async (EventFiles) =>
    {
        for (const File of EventFiles)
        {
            const Event = require(`../Event/${File}`);

            if (Event.once)
            {
                await Client.once(Event.name, (...Args) => Event.execute(...Args, Client));
            }
            else
            {
                await Client.on(Event.name, (...Args) => Event.execute(...Args, Client));
            }
        }
    };
};
