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
                                label: 'Api',
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
                    name: 'Paraffin Tutorials discord bot help menu'
                })
            .setDescription(
                `**Hey There**

                     Welcome to Paraffin Tutorials community
                     With this menu you can switch between discord bot features to learn how to use this discord bot!
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
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 240000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === Interaction.id + '_HELP_MENU')
            {
                switch (Event.values[0])
                {
                    case 'PAGE_HELP_MENU_1':
                    {
                        this.helpRow.components[0].setDisabled(true)
                        this.helpRow = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(Interaction.id + '_HELP_MENU')
                                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                                    .addOptions(
                                        [
                                            {
                                                default: true,
                                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users, Search Tutorials, Search Users',
                                                label: 'Api',
                                                value: 'PAGE_HELP_MENU_1'
                                            },
                                            {
                                                description: 'Website Info, Website Stats',
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

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials discord bot service help menu'
                                })
                            .setDescription('With these commands you can access all features in our website')
                            .addFields(
                                {
                                    name: '**<:DiceIcon:942427447083823145> Random:**',
                                    value: '``` /random type: <user || tutorial> ```'
                                },
                                {
                                    name: '**<:SearchIcon:942427448820236359> Search:**',
                                    value: '``` /search type: <user || tutorial> keyword: <search query> ```'
                                },
                                {
                                    name: '**<:PeopleIcon:940921189436641300> Users:**',
                                    value: '``` /users sort: <choice options> ```'
                                },
                                {
                                    name: '**<:BookIcon:940923075027939358> Tutorials:**',
                                    value: '``` /tutorials sort: <choice options> ```'
                                },
                                {
                                    name: '**<:PeopleIcon:940921189436641300> User:**',
                                    value: "``` /user name: <user's username> ```"
                                },
                                {
                                    name: '**<:BookIcon:940923075027939358> Tutorial:**',
                                    value: "``` /tutorial name: <tutorial's name> ```"
                                }
                            )
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
                                    .setCustomId(Interaction.id + '_HELP_MENU')
                                    .setPlaceholder('Paraffin Tutorials Bot Help Menu')
                                    .addOptions(
                                        [
                                            {
                                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                                label: 'Api',
                                                value: 'PAGE_HELP_MENU_1'
                                            },
                                            {
                                                default: true,
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

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials discord bot website help menu'
                                })
                            .setDescription('With these commands you can get all information about our website')
                            .addFields(
                                {
                                    name: '**<:GlobeIcon:942428317016014931> Information:**',
                                    value: '``` /web-info ```'
                                }
                            )
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
                                    .setCustomId(Interaction.id + '_HELP_MENU')
                                    .setPlaceholder('Paraffin Tutorials discord bot help menu')
                                    .addOptions(
                                        [
                                            {
                                                description: 'Tutorials Info, Users Info, Random Tutorials, Random Users',
                                                label: 'Api',
                                                value: 'PAGE_HELP_MENU_1'
                                            },
                                            {
                                                description: 'Website Services, Website Info, Website Stats',
                                                label: 'Website',
                                                value: 'PAGE_HELP_MENU_2'
                                            },
                                            {
                                                default: true,
                                                description: 'Bot Services, Invite Bot, Bot Info, Bot Stats, Report, Bot Ping, Bot Help',
                                                label: 'Bot',
                                                value: 'PAGE_HELP_MENU_3'
                                            }
                                        ])
                            );

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'Paraffin Tutorials discord bot bot help menu'
                                })
                            .setDescription('With these commands you can get all information about our bot')
                            .addFields(
                                {
                                    name: '**<:DiceIcon:942427447083823145> Help:**',
                                    value: '``` /help ```',
                                    inline: true
                                },
                                {
                                    name: '**<:SearchIcon:942427448820236359> Invite:**',
                                    value: '``` /invite ```',
                                    inline: true
                                },
                                {
                                    name: '**<:PeopleIcon:940921189436641300> Ping:**',
                                    value: '``` /ping```',
                                    inline: true
                                },
                                {
                                    name: '**<:PeopleIcon:940921189436641300> Stats:**',
                                    value: '``` /bot-stats ```',
                                    inline: true
                                },
                                {
                                    name: '**<:BookIcon:940923075027939358> Support:**',
                                    value: '``` /support ```',
                                    inline: true
                                },
                                {
                                    name: '**<:BookIcon:940923075027939358> Report:**',
                                    value: '``` /report type: <bug || idea> ```'
                                }
                            )
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
            return await this.errorService.send(Interaction);
        }
    }
}

module.exports = HelpService;
