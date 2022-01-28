const {  MessageEmbed , WebhookClient } = require('discord.js');

const { UpdateServersCount } = require('../Service/Helper.Service');

module.exports =
    {
        name: 'guildCreate',

        execute(Guild, Client)
        {
            const Embed = new MessageEmbed()
                .setTitle(`New Server Added`)
                .setDescription(`**Server Name** ${Guild.name} \n**Server ID** : ${Guild.id} \n**Members Count** : ${Guild.memberCount} `)
                .setFooter({ text: 'Paraffin Guild event system', iconURL: 'https://paraffin-tutorials.ir/img/favicon.png' })
                .setTimestamp()
                .setColor("#e92e2e");

            const Webhook = new WebhookClient({ url: process.env.GUILD_EVENT_WEBHOOK });

            Webhook.send({ embeds : [Embed] });

            UpdateServersCount(Client);
        }
    }