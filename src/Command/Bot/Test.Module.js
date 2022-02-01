const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton , MessageEmbed} = require('discord.js');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('test')
            .setDescription('test cmd'),

        async execute(Interaction)
        {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Test')
                        .setEmoji("😍")
                        .setCustomId('test')
                        .setStyle('DANGER'),

                    new MessageButton()
                        .setLabel('test')
                        .setEmoji("😐")
                        .setURL('google.com')
                        .setStyle('LINK'),

                );

            const embed = new MessageEmbed()
                .setDescription("TEST")
                .setThumbnail("../Asset/favicon.png")
                .setImage("../Asset/favicon.png")
                .setColor("RANDOM")

            return Interaction.reply({embeds: [embed] , components: [row]});
        },
    };


