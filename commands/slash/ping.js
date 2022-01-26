const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
		.setDescription('Bot Ping!'),
		
    async execute(interaction) {
				
		return interaction.reply({content: `pong!` });
	},
};