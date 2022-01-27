const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if(!interaction.isCommand()) return;
		if(!interaction.inGuild()) return  interaction.reply("cmd ro nemitonid dar dm estefaade konid")

		
		const web = new WebhookClient({url: 'webhook url'})
		
        const newembed = new MessageEmbed()
		.addFields( 
			{ name: 'یوزر ', value: ` ${interaction.user.tag}`,   inline: true },
			{ name: 'آیدی ', value: ` ${interaction.user.id}`,   inline: true },
			{ name: ' سرور', value: ` ${interaction.guild.name}`,   inline: true },
			{ name: 'چنل', value: `${interaction.channel.name}`,   inline: true },
			{ name: '**سی ام دی**', value: `/${interaction.commandName}`, inline: true },
		   )
		   
        .setTimestamp()
        .setColor("#32ba7c")
      web.send({embeds: [newembed] });
    

	},
};