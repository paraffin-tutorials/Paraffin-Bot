const VoiceDiscord = require('@discordjs/voice');

module.exports =
    {
        name: "VoiceConnection",
        once: true,

        execute(Client)
        {
            const Connection = VoiceDiscord.joinVoiceChannel(
            	{
            		channelId: "channel id",
            		guildId: "guild id",
            		selfDeaf: true,
            		adapterCreator: Client.guilds.cache.get("guild id").voiceAdapterCreator,
            	});
        },
    };
