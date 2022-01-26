const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require('fs')
const { Client, Intents , Collection} = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES,
], })
const prefix = "p!"
const token = process.env.token
const client_id = process.env.clientid
client.slashCommands = new Collection();
client.commands = new Collection();

//handler and slash register

const commandfiles = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'));

for (const file of commandfiles) {
	const command = require(`./commands/slash/${file}`);
	client.slashCommands.set(command.data.name, command);
}

const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
];

(async () => {
	try {
		await rest.put(Routes.applicationCommands(client_id), {
			body: commandJsonData,
		});
	} catch (error) {
		console.error(error);
	}
})();

// event 
const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

//message create
client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
});

const commandFiles = fs.readdirSync('./commands/message').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/message/${file}`);
	client.commands.set(command.name, command);
}

client.login(token)