const { Client, Intents } = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES,
], })


client.once("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity('Paraffin toturial', { type: 'COMPETING' }); 
    const connection = voiceDiscord.joinVoiceChannel({
        channelId: "channel id",
        guildId: "guild id",
        selfDeaf: true,
        adapterCreator: client.guilds.cache.get("guild id").voiceAdapterCreator,
    });
})

client.login(process.env.token)