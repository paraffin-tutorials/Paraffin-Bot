const { MessageActionRow, MessageButton , MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

     module.exports = 
        {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test cmd'),
	async execute(interaction) 
        {
       
        const row = new MessageActionRow()
        .addComponents(
                new MessageButton()
                .setLabel('Test')
                .setEmoji("😍")// baraye emoji id haye emoji ham mitoni bezari 
                .setCustomId('test')
                .setStyle('DANGER'), //PRIMARY SECONDARY SUCCESS DANGER LINK inaro toye style mitnoni bezari
               
                new MessageButton()
                .setLabel('test') 
                .setEmoji("😐")
                .setURL('google.com')
                .setStyle('LINK'),// inm nemone link vali to link custum id nemikhad va nabayad bezari
               
                );


    	const embed = new MessageEmbed()
        .setDescription("TEST")
        .setThumbnail("../Asset/favicon.png")
        .setImage("../Asset/favicon.png")
        .setColor("RANDOM")

 // send message and button
 return interaction.reply({embeds: [embed] , components: [row]});
},
};


