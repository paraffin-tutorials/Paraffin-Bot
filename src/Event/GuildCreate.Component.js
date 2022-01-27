const {  MessageEmbed , WebhookClient } = require('discord.js');

const { UpdateServersCount } = require('../Service/Helper.Service');

module.exports =
    {
        name: 'guildCreate',

        execute(Guild)
        {
            const Embed = new MessageEmbed()
                .setDescription(`***New Server Added***\n\n**Server Name** ${Guild.name} \n**Server ID** : ${Guild.id} \n**Members Count** : ${Guild.memberCount} `)
                .setColor("#e92e2e");

            const Webhook = new WebhookClient({ url: process.env.GUILD_EVENT_WEBHOOK });

            Webhook.send({ embeds : [Embed] });

            UpdateServersCount(Client);
        }
    }
