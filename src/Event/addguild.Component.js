const {  MessageEmbed , WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildCreate',
	execute(guild) {
        servers = global.servers + 1
        let add = `webhook url`
        const newembed = new MessageEmbed()
	.setDescription(`**بات به یک سرور اضاف شد**\n\nاسم سرور ${guild.name} \n id : ${guild.id}     \n member : ${guild.memberCount} `)
	.setColor("#32ba7c")
	const webhook = new WebhookClient({url: `${add}`})
  webhook.send({embeds : [newembed]})
 

	
    }
}