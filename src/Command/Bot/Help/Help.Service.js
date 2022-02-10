const { MessageActionRow, MessageEmbed, MessageSelectMenu  } = require('discord.js');

class HelpService
{
    constructor(Type)
    {
        if (Type !== 'PAGE_ERROR')
        {
            const ErrorService = require('../../../Service/Error.Service');

            this.errorService = new ErrorService();
        }
    }

    async structure(Interaction, Type, Event)
    {
        this.helpRow = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(Interaction.id + '__HELP_MENU')
                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                    .addOptions(
                        [
                            {
                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                label: 'Service',
                                value: 'PAGE_1'
                            },
                            {
                                description: 'Website Services, Website Info, Website Stats',
                                label: 'Website',
                                value: 'PAGE_2'

                            },
                            {
                                description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                label: 'Bot',
                                value: 'PAGE_3'
                            }
                        ])
            );

        this.helpEmbed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON_LINK)
            .setAuthor(
                {
                    name: 'Paraffin Tutorials Bot Help Menu'
                })
            .setDescription(
                `**Hey There**

                     Welcome To Paraffin Tutorials Community
                     With this Menu you can switch between Bot Features to learn how to use Bot!
                    `)
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON_LINK
                })
            .setTimestamp();

        const Collector = Interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 240000  });

        Collector.on('collect', async (Event) =>
        {
            if (Event.customId === Interaction.id + '__HELP_MENU')
            {
                switch (Type)
                {
                    case 'PAGE_1':
                    {
                        this.helpRow = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(Interaction.id + '__HELP_MENU')
                                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                                    .addOptions(
                                        [
                                            {
                                                default: true,
                                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                                label: 'Service',
                                                value: 'PAGE_1'
                                            },
                                            {
                                                description: 'Website Services, Website Info, Website Stats',
                                                label: 'Website',
                                                value: 'PAGE_2'

                                            },
                                            {
                                                description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                                label: 'Bot',
                                                value: 'PAGE_3'
                                            }
                                        ])
                            );

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON_LINK)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Service-Help Menu'
                                })
                            .setDescription('With these commands you can access all features in our website')
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON_LINK
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                    case 'PAGE_2':
                    {
                        this.helpRow = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(Interaction.id + '__HELP_MENU')
                                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                                    .addOptions(
                                        [
                                            {
                                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                                label: 'Service',
                                                value: 'PAGE_1'
                                            },
                                            {
                                                default: true,
                                                description: 'Website Services, Website Info, Website Stats',
                                                label: 'Website',
                                                value: 'PAGE_2'

                                            },
                                            {
                                                description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                                label: 'Bot',
                                                value: 'PAGE_3'
                                            }
                                        ])
                            );

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON_LINK)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Website-Help Menu'
                                })
                            .setDescription('With these commands you can get all information about our website')
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON_LINK
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                    case 'PAGE_3':
                    {
                        this.helpRow = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(Interaction.id + '__HELP_MENU')
                                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                                    .addOptions(
                                        [
                                            {
                                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                                label: 'Service',
                                                value: 'PAGE_1'
                                            },
                                            {
                                                description: 'Website Services, Website Info, Website Stats',
                                                label: 'Website',
                                                value: 'PAGE_2'

                                            },
                                            {
                                                default: true,
                                                description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                                label: 'Bot',
                                                value: 'PAGE_3'
                                            }
                                        ])
                            );

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON_LINK)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Bot-Help Menu'
                                })
                            .setDescription('With these commands you can get all information about our bot')
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON_LINK
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                }
            }
        });

        if (Type === 'PAGE_ERROR')
        {
            return await Event.followUp({ embeds: [ this.helpEmbed ], components: [ this.helpRow ] });
        }
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);

            return await Interaction.reply({ embeds: [ this.helpEmbed ], components: [ this.helpRow ] });
        }
        catch (Error)
        {
            return this.errorService.send(Interaction);
        }
    }
}

module.exports = HelpService;
