const fs = require('fs');
const Path = require('path');
const DotEnv = require('dotenv');

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents , Collection } = require('discord.js');

const Bot = new Client(
	{
		intents:
			[
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_VOICE_STATES,
			]
	});

const token = process.env.TOKEN;
const botId = process.env.BOT_ID;
const prefix = process.env.PREFIX;

Bot.SlashCommands = new Collection();
Bot.Commands = new Collection();

// Handler and Slash register
const SlashCommands = fs.readdirSync(Path.resolve('src', 'Command', 'Slash')).filter(file => file.endsWith('.js'));

for (const File of SlashCommands)
{
	const Command = require(Path.resolve('src', 'Command', 'Slash', File));
	Bot.SlashCommands.set(Command.data.name, Command);
}

const rest = new REST({ version: "9" }).setToken(token);

const CommandJsonData =
	[
		...Array.from(Bot.SlashCommands.values()).map((c) => c.data.toJSON()),
	];

(async () =>
{
	try
	{
		await rest.put(Routes.applicationCommands(botId),
			{
				body: CommandJsonData,
			});
	}
	catch (error)
	{
		console.error(error);
	}
})();

// Event
const EventFiles = fs
	.readdirSync(Path.resolve('src', 'Event'))
	.filter((file) => file.endsWith(".js"));

for (const File of EventFiles)
{
	const Event = require(Path.resolve('src', 'Event', File));
	if (Event.once)
	{
		Bot.once(Event.name, (...args) => Event.execute(...args, Bot));
	}
	else
	{
		Bot.on(
            Event.name,
			async (...args) => await Event.execute(...args, Bot)
		);
	}
}

// Message create
Bot.on('messageCreate', message =>
{
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!Bot.commands.has(command)) return;

	try
	{
		Bot.commands.get(command).execute(message, args);
	}
	catch (error)
	{
		console.error(error);
	}
});

const MessageCommands = fs.readdirSync(Path.resolve('src', 'Command', 'Message')).filter(file => file.endsWith('.js'));

for (const File of MessageCommands)
{
	const Command = require(Path.resolve('src', 'Command', 'Message', File));
	Bot.Commands.set(Command.name, Command);
}

exports.Client = Bot;
