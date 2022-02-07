const {MessageEmbed , MessageButton , MessageActionRow} = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Stats of the Bot!'),

        async execute(Interaction , cliinet)
        {
            const row = new MessageActionRow()
            .addComponents(
                    new MessageButton()
                    .setLabel('Invite Bot')
                    .setEmoji("🟠")
                    .setURL('https://google.com')
                    .setStyle('LINK'),
                      );

                      const { version } = require("discord.js");
                      const Response = new MessageEmbed()
                      .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
                      .setFooter(
                          {
                              text: "Paraffin Bot Stats",
                              iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                          })
                      .setColor('#e92e2e')
                      .setTimestamp();
                      Response.addFields(
                          {
                            name: ":robot: Client",
                            value: `┕\`🟢 Online!\``,
                            inline: true,
                          },
                          {
                            name: "🛡 Servers",
                            value: `┕\`${Interaction.client.guilds.cache.size}\``,
                            inline: true,
                          },
                          {
                            name: "⌛ Ping",
                            value: `┕\`${Math.round(Interaction.client.ws.ping)}ms\``,
                            inline: true,
                          },
                         {
                              name: ":file_cabinet: Memory",
                              value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                                2
                              )}mb\``,
                              inline: true,
                            }
                        );
                      Response.addFields(
                          {
                            name: ":robot: Version",
                            value: `┕\`v${require("../../../package.json").version}\``,
                            inline: true,
                          },
                          {
                            name: ":blue_book: Discord.js",
                            value: `┕\`v${version}\``,
                            inline: true,
                          },
                          {
                            name: ":green_book: Node",
                            value: `┕\`${process.version}\``,
                            inline: true,
                          },
                         
                        );

                      await Interaction.reply({ embeds: [Response] , components :[row]});
        },
    };
