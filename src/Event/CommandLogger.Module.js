const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports =
    {
        name: 'interactionCreate',

        execute(Interaction)
        {
            if (!Interaction.isCommand())
            {
                return;
            }
            if (!Interaction.inGuild())
            {
                return Interaction.reply("You Can't use this Command in DM.")
            }

            const Webhook = new WebhookClient({ url: process.env.INTERACTION_EVENT_WEBHOOK })

            const Embed = new MessageEmbed()
                .setTitle(`New Interaction Used`)
                .addFields(
                    {
                        name: '**User:**',
                        value: '```' + Interaction.user.tag + '```'
                    },
                    {
                        name: '**ID:**',
                        value: '```' + Interaction.user.id + '```'
                    },
                    {
                        name: '**Server:**',
                        value: '```' + Interaction.guild.name  + '```'
                    },
                    {
                        name: '**Channel:**',
                        value: '```' + Interaction.channel.name + '```'
                    },
                    {
                        name: '**Command:**',
                        value: '```' + Interaction.commandName + '```'
                    }
                )
                .setFooter(
                    {
                        text: 'Paraffin Interaction-Handler System',
                        iconURL: process.env.FAVICON
                    })
                .setTimestamp()
                .setColor('#e92e2e');

            Webhook.send({ embeds: [Embed] });
        }
    };
