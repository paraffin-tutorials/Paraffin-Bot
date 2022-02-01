const Logger = require('../Service/Logger.Service');
const VoiceDiscord = require('@discordjs/voice');

module.exports =
    {
        name: "ready",
        once: true,

        async execute(Args, Client)
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

            Logger.info(`Bot is Joined in "${Channel.name}" Voice-Channel!`);
        }
    };
