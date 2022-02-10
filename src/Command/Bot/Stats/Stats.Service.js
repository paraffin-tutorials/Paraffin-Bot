const { MessageEmbed, MessageActionRow, MessageButton, version } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class StatsService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async structure(Interaction)
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Refresh')
                    .setCustomId('PAGE_STATS_REFRESH')
                    .setEmoji('<:RepeatIcon:941290998171045928>')
                    .setStyle('DANGER')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: `Paraffin Tutorials discord-bot stats`
                })
            .addFields(
                {
                    name: '<:RobotIcon:941207018209968168> Client',
                    value: '```' + Interaction.client.presence.status + '```',
                    inline: true,
                },
                {
                    name: '<:HddIcon:941209455452884993> Servers',
                    value: '```' + Interaction.client.guilds.cache.size + '```',
                    inline: true,
                },
                {
                    name: '<:HourglassIcon:941207017526296606> Ping',
                    value: '\`\`\`' + Math.round(Interaction.client.ws.ping) + 'ms' + '```',
                    inline: true,
                },
                {
                    name: '<:HardIcon:941205805800247296> Memory',
                    value: '```' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'mb' + '```',
                    inline: true,
                }
            )
            .addFields(
                {
                    name: '<:Wrench2Icon:941209454286889030> Version',
                    value: '```' + 'v' + require('../../../../package.json').version + '```',
                    inline: true,
                },
                {
                    name: '<:WrenchIcon:941209455494840370> Discord.js',
                    value: '```' + 'v' + version + '```',
                    inline: true,
                },
                {
                    name: '<:GearIcon:941205804399341629> Node',
                    value: '```' + process.version + '```',
                    inline: true,
                },
                {
                    name: '<:CommandIcon:941207017471746079> Commands',
                    value: '```' + Interaction.client.CommandArray.length + '```',
                    inline: true,
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async buttonCollector(Interaction)
    {
        this.collector = Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_STATS_REFRESH')
            {
                this.embed = new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setThumbnail(process.env.FAVICON)
                    .setAuthor(
                        {
                            name: `Paraffin Tutorials discord-bot stats`
                        })
                    .addFields(
                        {
                            name: '<:RobotIcon:941207018209968168> Client',
                            value: '```' + Interaction.client.presence.status + '```',
                            inline: true,
                        },
                        {
                            name: '<:HddIcon:941209455452884993> Servers',
                            value: '```' + Interaction.client.guilds.cache.size + '```',
                            inline: true,
                        },
                        {
                            name: '<:HourglassIcon:941207017526296606> Ping',
                            value: '\`\`\`' + Math.round(Interaction.client.ws.ping) + 'ms' + '```',
                            inline: true,
                        },
                        {
                            name: '<:HardIcon:941205805800247296> Memory',
                            value: '```' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'mb' + '```',
                            inline: true,
                        }
                    )
                    .addFields(
                        {
                            name: '<:Wrench2Icon:941209454286889030> Version',
                            value: '```' + 'v' + require('../../../../package.json').version + '```',
                            inline: true,
                        },
                        {
                            name: '<:WrenchIcon:941209455494840370> Discord.js',
                            value: '```' + 'v' + version + '```',
                            inline: true,
                        },
                        {
                            name: '<:GearIcon:941205804399341629> Node',
                            value: '```' + process.version + '```',
                            inline: true,
                        },
                        {
                            name: '<:CommandIcon:941207017471746079> Commands',
                            value: '```' + Interaction.client.CommandArray.length + '```',
                            inline: true,
                        }
                    )
                    .setFooter(
                        {
                            text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON
                        })
                    .setTimestamp();

                return await Event.update({ embeds: [ this.embed ], components: [ this.row ] });
            }
        });
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);
            await this.buttonCollector(Interaction);

            if (!this.error)
            {
                return Interaction.reply({ embeds: [ this.embed ], components : [ this.row ] });
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return this.errorService.send(Interaction);
        }
    }
}

module.exports = StatsService;
