const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports =
    {
        name: 'interactionCreate',

        execute(Interaction)
        {
            if(!Interaction.isCommand()) return;
            // if(!interaction.inGuild()) return interaction.reply("You Can't use this Command in DM.")

            const Webhook = new WebhookClient({ url: process.env.INTERACTION_EVENT_WEBHOOK })

            const Embed = new MessageEmbed()
                .setTitle(`New Interaction Used`)
                .addFields(
                    { name: '**User:**', value: Interaction.user.tag,   inline: true },
                    { name: '**ID:**', value: Interaction.user.id,   inline: true },
                    { name: '**Server:**', value: Interaction.guild.name,   inline: true },
                    { name: '**Channel:**', value: Interaction.channel.name,   inline: true },
                    { name: '**Command:**', value: Interaction.commandName, inline: true },
                )
                .setFooter('Paraffin Interaction handler system', 'https/paraffin-tutorials.ir/img/favicon.png')
                .setTimestamp()
                .setColor("#e92e2e");

            Webhook.send({ embeds: [Embed] });
        },
    };
