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
                    .setCustomId(Interaction.id + '_HELP_MENU')
                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                    .addOptions(
                        [
                            {
                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                label: 'Service',
                                value: 'PAGE_HELP_MENU_1'
                            },
                            {
                                description: 'Website Services, Website Info, Website Stats',
                                label: 'Website',
                                value: 'PAGE_HELP_MENU_2'

                            },
                            {
                                description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                label: 'Bot',
                                value: 'PAGE_HELP_MENU_3'
                            }
                        ])
            );

        this.helpEmbed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
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
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();

        if (Type === 'PAGE_ERROR')
        {
            await Event.update({ embeds: [ this.helpEmbed ], components: [ this.helpRow ] });

            return await this.menuCollector(Interaction);
        }
    }

    async menuCollector(Interaction)
    {
        this.collector = Interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 240000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === Interaction.id + '_HELP_MENU')
            {
                switch (Event.values[0])
                {
                    case 'PAGE_HELP_MENU_1':
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
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Service-Help Menu'
                                })
                            .setDescription('With these commands you can access all features in our website')
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                    case 'PAGE_HELP_MENU_2':
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
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Website-Help Menu'
                                })
                            .setDescription('With these commands you can get all information about our website')
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                    case 'PAGE_HELP_MENU_3':
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
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials Bot Bot-Help Menu'
                                })
                            .setDescription('With these commands you can get all information about our bot')
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                }
            }
        });
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);
            await this.menuCollector(Interaction);

            return await Interaction.reply({ embeds: [ this.helpEmbed ], components: [ this.helpRow ] });
        }
        catch (Error)
        {
            return this.errorService.send(Interaction);
        }
    }
}

module.exports = HelpService;
