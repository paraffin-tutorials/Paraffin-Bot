const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton , MessageEmbed} = require('discord.js');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('testtt')
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
                        .setURL('https://google.com')
                        .setStyle('LINK'),

                );
                const row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Test')
                        .setEmoji("😍")
                        .setCustomId('hesamXD')
                        .setStyle('DANGER'),
                );

            const embed = new MessageEmbed()
                .setDescription("TEST")
                .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
                .setImage("https://paraffin-tutorials.ir/image/favicon.png")
                .setColor("RANDOM")

            return Interaction.reply({embeds: [embed] , components: [row , row2]});
        },
    };


