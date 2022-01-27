const {  MessageEmbed , WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildDelete',
	execute(guild) {
        let remove = `webhook url`
        servers = global.servers - 1
        const newembed = new MessageEmbed()
	.setDescription(`**بات از یک سرور حذف شد**\n\nاسم سرور ${guild.name} \n id : [${guild.id}] \n servers count: ${servers}`)
	.setColor("#32ba7c")
 const webhook = new WebhookClient({url: `${remove}`})
  webhook.send({embeds : [newembed]})

	},
}