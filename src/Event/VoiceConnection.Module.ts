import Logger from '../Service/Logger.Service';
import VoiceDiscord from '@discordjs/voice';

export default class VoiceConnectionModule
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
        const GuildId = process.env.AUTO_JOIN_GUILD;
        const ChannelId = process.env.AUTO_JOIN_CHANNEL;

        await VoiceDiscord.joinVoiceChannel(
            {
                channelId: ChannelId,
                guildId: GuildId,
                selfDeaf: true,
                adapterCreator: Client.guilds.cache.get(GuildId).voiceAdapterCreator,
            });

        let Channel = Client.channels.cache.get(ChannelId);

        Logger.info(`Bot is Joined in '${Channel.name}' Voice-Channel!`);
    }
};
