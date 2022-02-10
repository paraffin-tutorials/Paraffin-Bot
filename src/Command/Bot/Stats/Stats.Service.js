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
                    .setLabel('Invite Bot')
                    .setEmoji('🟠')
                    .setURL('https://google.com')
                    .setStyle('LINK')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON_LINK)
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
                    iconURL: process.env.FAVICON_LINK
                })
            .setTimestamp();
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);

            if (!this.error)
            {
                return Interaction.reply({ embeds: [ this.embed ] , components :[ this.row ]});
            }
            else
            {
                return this.errorService.send(Interaction);
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
