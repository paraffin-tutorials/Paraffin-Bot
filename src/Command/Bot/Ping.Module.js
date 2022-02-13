const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
        .setDescription('Bot Ping'),
    async execute(interaction) {
                
            const embed = new MessageEmbed()
            
            .addField('⌛ API ', `> \`${Math.round(interaction.client.ws.ping)}ms\``, true)
            
        return interaction.reply({embeds: [embed] });
    },
};