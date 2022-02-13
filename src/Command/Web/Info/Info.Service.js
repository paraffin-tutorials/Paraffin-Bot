const axios = require('axios');
const PrettyMilliseconds = require("pretty-ms");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class InfoService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async data(Interaction)
    {
        this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/information`);

        if (this.response.data?.status !== 'success')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Internal Api Error');
        }
    }

    async structure()
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('PAGE_WEB_INFO_REFRESH')
                    .setLabel('Refresh')
                    .setEmoji('<:RepeatIcon:941290998171045928>')
                    .setStyle('DANGER')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: 'Paraffin Tutorials Website Information & Status!'
                })
            .addFields(
                {
                    name: '<:PlugIcon:941695051791208478> Status',
                    value: '```' + (this.response.data.data.databaseStatus === 'connected' ? 'online' : 'offline') + '```',
                    inline: true,
                },
                {
                    name: '<:PlugIcon:941695051791208478> Database Status',
                    value: '```' + this.response.data.data.databaseStatus + '```',
                    inline: true,
                },
                {
                    name: '<:HourglassIcon:941207017526296606> Ping',
                    value: '```' + this.response.data.data.ping + 'ms' + '```',
                    inline: true,
                },
                {
                    name: '<:HardIcon:941205805800247296> Memory',
                    value: '```' + this.response.data.data.memoryUsage + '```',
                    inline: true,
                },
                {
                    name: '<:ClockIcon:941695051174645862> Uptime',
                    value: '```' + PrettyMilliseconds(this.response.data.data.uptime * 1000) + '```',
                    inline: true,
                },
                {
                    name: '<:GearIcon:941205804399341629> Version',
                    value: '```' + this.response.data.data.appVersion + '```',
                    inline: true,
                },
                {
                    name: '<:HddIcon:941209455452884993> Client Framework',
                    value: '```' + this.response.data.data.backend + '```',
                    inline: true,
                },
                {
                    name: '<:CpuIcon:940922798367440896> Server Framework',
                    value: '```' + this.response.data.data.frontend + '```',
                    inline: true,
                },
                {
                    name: '<:ServerIcon:941695050927198208> Database Technology',
                    value: '```' + this.response.data.data.database + '```',
                    inline: true,
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_WEB_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async buttonCollector(Interaction)
    {
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_WEB_INFO_REFRESH')
            {
                await this.data(Interaction);
                await this.structure();

                return await Event.update({ embeds: [ this.embed ], components: [ this.row ] });
            }
        });
    }

    async send(Interaction)
    {
        try
        {
            await this.data(Interaction);
            await this.structure();
            await this.buttonCollector(Interaction);

            if (!this.error)
            {
                return Interaction.editReply({ embeds: [ this.embed ], components :[ this.row ]});
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }
}

module.exports = InfoService;
