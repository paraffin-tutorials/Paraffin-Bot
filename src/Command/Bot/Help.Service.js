const { MessageActionRow, MessageEmbed, MessageSelectMenu  } = require('discord.js');

class HelpService
{
    async Send(Interaction)
    {
        try
        {
            const HelpRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId(Interaction.id + '__HELP_MENU')
                        .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                        .addOptions(
                            [
                                {
                                    label: 'Service',
                                    description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                    value: 'PAGE_1'

                                },
                                {
                                    label: 'Website',
                                    description: 'Website Services, Website Info, Website Stats',
                                    value: 'PAGE_2'

                                },
                                {
                                    label: 'Bot',
                                    description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                    value: 'PAGE_3'
                                }
                            ])
                )

            const HelpEmbed = new MessageEmbed()
                .setAuthor(
                    {
                        name: 'Paraffin Tutorials Bot Help Menu'
                    })
                .setDescription(
                    `**Hey There**

                     Welcome To Paraffin Tutorials Community
                     With this Menu you can switch between Bot Features to learn how to use Bot!
                    `)
                .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
                .setFooter(
                    {
                        text: "Paraffin Bot-Commands Handler",
                        iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                    })
                .setColor('#e92e2e')
                .setTimestamp();

            await Interaction.reply({ embeds: [ HelpEmbed ], components: [ HelpRow ] });

            const Collector = Interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 120000  })

            Collector.on('collect', async (Event) =>
            {
                if (Event.customId === Interaction.id + '__HELP_MENU')
                {
                    if (Event.values[0] === 'PAGE_1')
                    {
                        const HelpEmbed = new MessageEmbed()
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Service-Help Menu'
                                })
                            .setDescription('With these commands you can access all features in our website')
                            .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
                            .setFooter(
                                {
                                    text: "Paraffin Bot-Commands Handler",
                                    iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                                })
                            .setColor('#e92e2e')
                            .setTimestamp();

                        await Event.deferUpdate();
                        await Event.followUp({ embeds: [ HelpEmbed ], ephemeral: true });
                    }
                    else if (Event.values[0] === 'PAGE_2')
                    {
                        const HelpEmbed = new MessageEmbed()
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Website-Help Menu'
                                })
                            .setDescription('With these commands you can get all information about our website')
                            .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
                            .setFooter(
                                {
                                    text: "Paraffin Bot-Commands Handler",
                                    iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                                })
                            .setColor('#e92e2e')
                            .setTimestamp();

                        await Event.deferUpdate();
                        await Event.followUp({ embeds: [ HelpEmbed ], ephemeral: true });
                    }
                    else if (Event.values[0] === 'PAGE_3')
                    {
                        const HelpEmbed = new MessageEmbed()
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Bot-Help Menu'
                                })
                            .setDescription('With these commands you can get all information about our bot')
                            .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
                            .setFooter(
                                {
                                    text: "Paraffin Bot-Commands Handler",
                                    iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                                })
                            .setColor('#e92e2e')
                            .setTimestamp();

                        await Event.deferUpdate();
                        await Event.followUp({ embeds: [ HelpEmbed ], ephemeral: true });
                    }
                }
            });
        }
        catch (Error)
        {
            return console.log(Error);
        }
    }
}

module.exports = HelpService;
