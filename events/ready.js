module.exports = {
	name: "ready",
	once: true,

	execute(client) {
console.clear()

       client.user.setActivity('Paraffin toturial', { type: 'COMPETING' }); 
		console.log(`-> 🟢 Logged in as ${client.user.tag}!`)
		console.log(` -> 🟢 Loaded all (/) commands`)
		const connection = voiceDiscord.joinVoiceChannel({
			channelId: "channel id",
			guildId: "guild id",
			selfDeaf: true,
			adapterCreator: client.guilds.cache.get("guild id").voiceAdapterCreator,
		});
	},
};
