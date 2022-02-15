const { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js');

const Logger from '../../../Service/Logger.Service');
const ErrorService from '../../../Service/Error.Service');

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
                    .setCustomId('PAGE_PING_REFRESH')
                    .setEmoji('<:RepeatIcon:941290998171045928>')
                    .setStyle('DANGER')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: `Paraffin Tutorials discord bot & discord websocket ping`
                })
            .addFields(
                {
                    name: '<:RobotIcon:941207018209968168> Bot Client',
                    value: '```' + Interaction.client.ws.ping + 'ms' + '```',
                    inline: true,
                },
                {
                    name: '<:HddIcon:941209455452884993> Discord Websocket',
                    value: '```' + (Date.now() - Interaction.createdTimestamp) + 'ms' + '```',
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
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_PING_REFRESH')
            {
                await this.structure(Interaction);

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

            return await this.errorService.send(Interaction);
        }
    }
}

module.exports = StatsService;
