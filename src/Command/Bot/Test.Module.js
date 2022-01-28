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

            return interaction.reply({embeds: [embed] , components: [row]});
        },
    };


