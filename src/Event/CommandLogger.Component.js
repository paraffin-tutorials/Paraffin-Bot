const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports =
    {
        name: 'interactionCreate',

        execute(interaction)
        {
            if(!interaction.isCommand()) return;
            // if(!interaction.inGuild()) return interaction.reply("You Can't use this Command in DM.")

            const Webhook = new WebhookClient({ url: process.env.INTERACTION_EVENT_WEBHOOK })

            const Embed = new MessageEmbed()
                .addFields(
                    { name: '**User:**', value: interaction.user.tag,   inline: true },
                    { name: '**ID:**', value: interaction.user.id,   inline: true },
                    { name: '**Server:**', value: interaction.guild.name,   inline: true },
                    { name: '**Channel:**', value: interaction.channel.name,   inline: true },
                    { name: '**Command:**', value: interaction.commandName, inline: true },
                )
                .setTimestamp()
                .setColor("#e92e2e");

            Webhook.send({ embeds: [Embed] });
        },
    };
