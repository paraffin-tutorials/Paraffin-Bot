const {MessageEmbed , MessageButton , MessageActionRow} = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('invite')
            .setDescription('Invite the Bot!'),

        async execute(Interaction)
        {
            const row = new MessageActionRow()
            .addComponents(
                    new MessageButton()
                    .setLabel('Full Perm')
                    .setEmoji("🟠")
                    .setURL('https://google.com')
                    .setStyle('LINK'),
                      )
                      .addComponents(
                        new MessageButton()
                        .setLabel('Standard')
                        .setEmoji("🟠")
                        .setURL('https://google.com')
                        .setStyle('LINK'),
                          )
                          .addComponents(
                            new MessageButton()
                            .setLabel('Zero perm')
                            .setEmoji("🟠")
                            .setURL('https://google.com')
                            .setStyle('LINK'),
                              );
const embed = new MessageEmbed()
.setColor("RED")
.setTimestamp()
.setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
.setFooter(
    {
        text: "Paraffin Bot Invite",
        iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
    })
.setDescription("**Invite Paraffin Bot With Bottom Buttons**")

            return Interaction.reply({ embeds: [embed] , components :[row]});
        },
    };
